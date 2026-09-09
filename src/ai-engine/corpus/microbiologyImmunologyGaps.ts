import { KnowledgeItem } from '../../types';

// Batch 142 (microbiology / immunology / infectious disease) — mostly OK on
// nexus-4b, but with several failures: "how does PCR testing work" was
// answered as forensic STR DNA fingerprinting (capillary electrophoresis,
// repeat counts); "what is the incubation period" was defined as "how long
// you are infectious after exposure"; "broad vs narrow spectrum antibiotic"
// as "the wavelengths they target"; "virus vs bacterium vs fungus" never
// mentioned fungi at all. Raw web dumps for herd immunity, sensitivity vs
// specificity, and prions.
export const MICROBIOLOGY_IMMUNOLOGY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-micro-vbf',
    title: 'Virus vs Bacterium vs Fungus',
    category: 'Microbiology',
    keywords: [
      'what is the difference between a virus a bacterium and a fungus',
      'a virus is not a cell it is a strand of genetic material dna or rna in a protein coat 20 to 300 nanometres it cannot metabolise or reproduce on its own it must hijack a living cell fought with antivirals and vaccines',
      'a bacterium is a single celled prokaryote no nucleus about 1 to 10 micrometres it lives and divides on its own most are harmless or helpful some cause disease treated with antibiotics',
      'a fungus is a eukaryote it has a true nucleus and organelles like our own cells with a chitin cell wall it can be single celled yeast or multicellular mould or mushroom it absorbs nutrients externally medical fungi cause thrush candida athletes foot ringworm and aspergillus treated with antifungals not antibiotics',
    ],
    content: `Three different kinds of thing, at three different scales. A VIRUS is not a living cell at all — it is a package of genetic material (DNA or RNA) inside a protein shell (capsid), sometimes with a lipid envelope, roughly 20–300 nanometres across (far smaller than a cell). It has no metabolism and cannot reproduce by itself; it is an obligate intracellular parasite that must invade a host cell and take over its machinery to make copies of itself, usually killing or damaging the cell. Fought with antiviral drugs and prevented with vaccines; antibiotics do nothing to it. A BACTERIUM is a single-celled PROKARYOTE — a cell with no nucleus and no membrane-bound organelles, its DNA loose in the cytoplasm — typically 1–10 micrometres, with a peptidoglycan cell wall. Bacteria live, feed, and divide on their own (in the environment or on/in a host); the vast majority are harmless or beneficial (gut flora, soil nitrogen fixers), and only some cause disease. Treated with antibiotics, which attack bacterial structures (cell wall, ribosomes, DNA gyrase) that human and viral entities lack. A FUNGUS is a EUKARYOTE — its cells have a true nucleus and organelles, much like animal and plant cells — with a cell wall of chitin. Fungi can be single-celled (yeasts, e.g. Candida, Saccharomyces) or multicellular filamentous organisms (moulds, mushrooms) made of thread-like "hyphae"; they feed by secreting enzymes and absorbing the digested nutrients. Medically important fungi cause thrush/candidiasis, athlete's foot and ringworm (dermatophytes), and serious lung and blood infections (Aspergillus, Cryptococcus) especially in immunocompromised people. Treated with antifungal drugs (azoles, echinocandins, amphotericin), which are harder to design and often more toxic than antibiotics precisely because fungal cells are so similar to ours.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-micro-herd-immunity',
    title: 'Herd Immunity',
    category: 'Immunology',
    keywords: [
      'what is herd immunity threshold',
      'herd immunity is the indirect protection of a whole population that occurs when a large enough fraction of it is immune through vaccination or past infection so that each infected person on average passes the disease to fewer than one other and a sustained outbreak cannot get going',
      'the herd immunity threshold is roughly 1 minus 1 over r0 a disease with r0 of 15 like measles needs about 94 percent immunity influenza with r0 near 1 3 needs only about 25 percent',
      'it protects people who cannot be vaccinated newborns the immunocompromised the elderly it is undermined when immunity wanes when a new more transmissible variant raises r0 when contacts are not evenly mixed and when vaccination coverage drops in pockets',
    ],
    content: `Herd immunity (community immunity) is the indirect protection that a population gains when a sufficiently large proportion of its members are immune — through vaccination or recovery from infection — that an infectious agent can no longer spread in a sustained way. Once enough people are immune, an infected person, on average, transmits to fewer than one susceptible person, so each chain of transmission dies out and even the non-immune are effectively shielded because the pathogen keeps hitting dead ends. The HERD IMMUNITY THRESHOLD — the fraction that must be immune — is approximately 1 − 1/R₀, where R₀ is the disease's basic reproduction number: measles (R₀ ≈ 12–18) needs roughly 92–95% immunity, polio ~80–86%, seasonal influenza (R₀ ≈ 1.3) only ~20–30%. Herd immunity is what protects those who cannot be vaccinated or don't respond well: newborns too young for a vaccine, people on chemotherapy or immunosuppressants, some elderly people, those with certain allergies. It is fragile: it fails locally when vaccination rates fall in a community (measles outbreaks in under-vaccinated pockets), and the simple formula overestimates it because immunity is imperfect and wanes over time, people don't mix evenly (clustered susceptibles sustain transmission below the "average" threshold), and a more transmissible variant raises R₀ and pushes the threshold up — which is part of why COVID-19 never reached durable herd immunity.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-micro-incubation',
    title: 'Incubation Period (vs Latent and Infectious Periods)',
    category: 'Infectious Disease',
    keywords: [
      'what is the incubation period of a disease',
      'the incubation period is the time between being infected exposed to a pathogen and the first appearance of signs or symptoms of the disease it is not the same as how long you are contagious',
      'the latent period is the time from infection to becoming infectious able to transmit and the infectious period is the length of time you can pass it on for some diseases especially covid 19 and influenza you become infectious before symptoms start pre symptomatic transmission so the latent period is shorter than the incubation period',
      'quarantine length is chosen to cover most of the incubation period so that anyone who is going to develop the disease does so before being released typical incubation periods flu 1 to 4 days covid 2 to 14 measles 10 to 14 rabies weeks to months',
    ],
    content: `The INCUBATION PERIOD is the interval between the moment a person becomes infected (exposed to and successfully invaded by a pathogen) and the moment the first signs or symptoms of the illness appear. It is NOT the same as how long a person is contagious. Three related timescales are easy to confuse: (1) INCUBATION PERIOD — infection → symptom onset. (2) LATENT PERIOD — infection → becoming infectious (able to shed enough pathogen to transmit). (3) INFECTIOUS (communicable) PERIOD — the window during which the person can transmit. For classic diseases like measles the latent period roughly matches the incubation period (you get sick around the time you become infectious). But for influenza and, notably, COVID-19, the LATENT period is SHORTER than the incubation period — people become infectious a day or two before they feel ill — which produces "pre-symptomatic transmission" and makes symptom-based screening leaky. Typical incubation periods: influenza 1–4 days, common cold 1–3 days, SARS-CoV-2 originally 2–14 days (Omicron ~3), norovirus 12–48 hours, measles 10–14 days, chickenpox 10–21 days, hepatitis A 2–6 weeks, rabies typically 1–3 months (occasionally years), HIV to AIDS years. Quarantine durations are set to span most of the incubation period so that anyone incubating the disease will develop it (and be detected) before release; isolation is for people already known to be infected/infectious.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-micro-dna-rna-virus',
    title: 'DNA Viruses vs RNA Viruses',
    category: 'Virology',
    keywords: [
      'what is the difference between a dna and an rna virus',
      'the difference is which nucleic acid carries the viral genome and it has big consequences for how fast the virus mutates',
      'dna viruses herpes chickenpox smallpox hpv hepatitis b adenovirus copy their genome with a dna polymerase that proofreads and corrects errors so they mutate slowly are genetically stable and often set up long term latent infections',
      'rna viruses influenza coronaviruses hiv measles rabies ebola hepatitis c polio norovirus copy their genome with an rna dependent rna polymerase that has no proofreading so they make many errors mutate fast exist as a swarm of variants quasispecies drift antigenically evade immunity and develop drug resistance quickly which is why flu vaccines are reformulated yearly retroviruses like hiv are rna viruses that reverse transcribe into dna and splice into the host genome and most emerging pandemic viruses are rna viruses',
    ],
    content: `Viruses are classified first by whether their genome is DNA or RNA (and whether it is single- or double-stranded, and its "sense"). The practical importance is REPLICATION FIDELITY. DNA VIRUSES — herpes simplex, varicella-zoster (chickenpox/shingles), Epstein-Barr, cytomegalovirus, smallpox and other poxviruses, human papillomavirus, adenovirus, hepatitis B (a partial exception, it uses reverse transcription) — copy their genomes using DNA polymerases (host or viral) that have "proofreading" activity to catch and correct mismatched bases. So DNA viruses mutate slowly, are genetically stable, and many of them establish lifelong LATENT infections that reactivate later (cold sores, shingles). RNA VIRUSES — influenza, coronaviruses (SARS-CoV-2, MERS, common-cold coronaviruses), HIV, measles, mumps, rabies, Ebola, hepatitis C, poliovirus, rhinovirus, norovirus, dengue, Zika — replicate with an RNA-dependent RNA polymerase that has essentially NO proofreading, giving an error rate roughly 1,000–100,000 times higher. Consequences: RNA viruses mutate fast, so any infected host carries a "quasispecies" swarm of slightly different variants; they undergo rapid "antigenic drift" that lets them evade prior immunity (why influenza vaccines are reformulated every year and why new SARS-CoV-2 variants keep appearing); and they develop resistance to antiviral drugs quickly (why HIV needs three-drug combination therapy). RETROVIRUSES (HIV, HTLV) are RNA viruses that carry reverse transcriptase, convert their RNA into DNA, and integrate that DNA permanently into the host cell's chromosomes. The great majority of newly emerging and pandemic-capable viruses are RNA viruses, largely because their high mutation rate helps them jump species.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-micro-pcr',
    title: 'How PCR Testing Works (for Infections)',
    category: 'Microbiology',
    keywords: [
      'how does pcr testing work polymerase chain reaction covid rt pcr',
      'pcr detects a pathogen by finding and massively copying a short stretch of its genetic sequence a sample swab is taken the nucleic acid is extracted if the target is an rna virus it is first copied into dna by reverse transcriptase rt pcr this is not forensic str dna fingerprinting',
      'then the reaction is thermally cycled about 35 to 45 times each cycle heat to about 95 degrees to split the double strand denature cool to about 55 to 60 so short primers matched to the pathogen sequence stick anneal warm to about 72 so a heat stable taq polymerase copies the target extend each cycle doubles the target so the amount grows exponentially',
      'in real time quantitative pcr a fluorescent probe glows as copies accumulate the cycle number at which the glow crosses a threshold the ct or cq value is lower when more pathogen was present a positive result means the specific target sequence is present pcr is extremely sensitive and specific but can stay positive after the person is no longer infectious because it detects leftover fragments',
    ],
    content: `PCR (polymerase chain reaction) diagnostic testing detects a pathogen by finding, and then copying billions of times, a short signature stretch of its DNA or RNA. Steps: (1) a sample is collected (nasopharyngeal or throat swab, saliva, blood, stool). (2) The nucleic acid is extracted and purified. (3) If the target is an RNA virus (SARS-CoV-2, influenza, HIV, hepatitis C), the RNA is first converted to complementary DNA (cDNA) by the enzyme reverse transcriptase — this is "RT-PCR." (4) The PCR reaction is run through repeated temperature cycles (typically 35–45), each cycle having three steps: DENATURE (~95 °C, the double-stranded DNA splits into single strands), ANNEAL (~55–60 °C, two short synthetic "primers" designed to exactly match sequences flanking the target region bind to their spots), and EXTEND (~72 °C, a heat-stable DNA polymerase — Taq, from a hot-spring bacterium — builds a new complementary strand from each primer). Every cycle roughly doubles the number of target copies, so the amount grows exponentially: 40 cycles from a single molecule is ~10¹². (5) In "real-time" / quantitative PCR (qPCR), a fluorescent probe or dye emits light as copies accumulate; the cycle number at which the fluorescence crosses a set threshold — the Ct or Cq value — is recorded, and a LOW Ct means a LARGE amount of target was present in the original sample (high pathogen load). A result is reported positive only if the specific target sequence is amplified; PCR is both highly sensitive (detects tiny amounts) and highly specific (the primers won't match unrelated organisms). Limitation: it detects nucleic acid, not viable pathogen, so it can remain positive for days or weeks after a person has stopped being infectious. (This is unrelated to forensic STR "DNA fingerprinting," which uses PCR to size variable repeat regions of the human genome.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-micro-sens-spec',
    title: 'Sensitivity and Specificity of a Test',
    category: 'Diagnostics',
    keywords: [
      'what is the difference between sensitivity and specificity of a diagnostic test',
      'sensitivity is the proportion of people who really do have the disease that the test correctly identifies as positive the true positive rate a very sensitive test has few false negatives so a negative result is good for ruling the disease out snout',
      'specificity is the proportion of people who really do not have the disease that the test correctly clears as negative the true negative rate a very specific test has few false positives so a positive result is good for ruling the disease in spin',
      'there is usually a trade off set by where you put the test cutoff shown by the roc curve screening tests favour high sensitivity confirmatory tests favour high specificity note that the chance a positive result is actually correct the positive predictive value also depends heavily on how common the disease is in the population tested',
    ],
    content: `Sensitivity and specificity describe how well a diagnostic test separates people who have a condition from people who don't. SENSITIVITY (true positive rate) = among everyone who TRULY HAS the disease, the fraction the test correctly calls positive. Sensitivity = TP / (TP + FN). A test with 99% sensitivity misses only 1% of true cases (few false negatives), so a NEGATIVE result from a highly sensitive test is strong evidence the person does NOT have the disease — the mnemonic is "SnNout" (Sensitive test, Negative result, rules Out). SPECIFICITY (true negative rate) = among everyone who TRULY DOES NOT have the disease, the fraction the test correctly clears as negative. Specificity = TN / (TN + FP). A test with 99% specificity wrongly flags only 1% of healthy people (few false positives), so a POSITIVE result from a highly specific test is strong evidence the person DOES have it — "SpPin" (Specific test, Positive result, rules In). There is normally a TRADE-OFF governed by where the test's cutoff/threshold is set: loosen it to catch more true cases and you also catch more false positives (higher sensitivity, lower specificity), and vice versa — the ROC curve plots this. Practical use: SCREENING tests are tuned for high sensitivity (don't miss anyone; follow up positives with a better test), while CONFIRMATORY tests are tuned for high specificity. Crucially, sensitivity and specificity are properties of the test, but the chance that a POSITIVE result is actually right — the positive predictive value (PPV) — also depends heavily on how common the disease is in the tested population: when a disease is rare, even a very good test produces mostly false positives (the base-rate effect).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-micro-false-pos-neg',
    title: 'False Positive and False Negative (in Medical Testing)',
    category: 'Diagnostics',
    keywords: [
      'what is a false positive and a false negative medical test',
      'a false positive is when a test says you have a condition or infection that you actually do not have it causes unnecessary worry follow up tests and sometimes unnecessary treatment and it is common when a disease is rare because most positives from any imperfect test are then false',
      'a false negative is when a test says you are clear when you actually do have the condition it gives false reassurance delays diagnosis and treatment and in an infection lets someone keep spreading it',
      'no test is perfect the balance between the two is set by the test cutoff and by choosing a more sensitive test to minimise false negatives or a more specific test to minimise false positives',
    ],
    content: `In diagnostic testing, a FALSE POSITIVE is a result that says a person HAS a disease, condition, or infection when in fact they do NOT. Consequences: needless anxiety, further (sometimes invasive or risky) confirmatory tests, occasionally unnecessary treatment or surgery, and, for screening programmes, "overdiagnosis." False positives are especially frequent when the condition is RARE in the tested group — because even a test that is 99% specific will wrongly flag 1 in 100 healthy people, and if only 1 in 1,000 people actually have the disease, most of the positive results will be false (the base-rate fallacy). A FALSE NEGATIVE is a result that says a person is CLEAR when in fact they DO have the disease. Consequences: false reassurance, a missed or delayed diagnosis and delayed treatment (which can be life-threatening for cancers), and — for an infectious disease — a person who believes they are safe continuing to spread it. False negatives are worse when a test is done too early (before enough pathogen or antibody has built up), with a poor sample, or with an insensitive test. No test is perfect, so every test has some rate of both errors; which one you accept more of is a deliberate choice, made by moving the test's decision threshold and by picking a more sensitive test (fewer false negatives) or a more specific test (fewer false positives) for the situation. (In statistics these correspond to Type I error — false positive — and Type II error — false negative.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-micro-symptom-sign',
    title: 'Symptom vs Sign',
    category: 'Medicine',
    keywords: [
      'what is the difference between a symptom and a sign in medicine',
      'a symptom is subjective it is what the patient feels and reports and that an examiner cannot directly see pain nausea fatigue dizziness itch numbness breathlessness a sense of the heart racing',
      'a sign is objective it is what a clinician can observe measure or elicit on examination or in a test fever a rash swelling jaundice a heart murmur high blood pressure an enlarged liver an abnormal reflex',
      'some findings are both a visible tremor a patient feels and an examiner sees asymptomatic means having the disease but no symptoms the collection of signs and symptoms that tend to occur together is a syndrome',
    ],
    content: `In clinical medicine, a SYMPTOM is SUBJECTIVE — it is something the patient personally experiences and describes, and which a doctor cannot perceive directly: pain, headache, nausea, fatigue, dizziness, itching, numbness or tingling, shortness of breath, a racing or "skipping" heartbeat, low mood, blurred vision, ringing in the ears. Symptoms are gathered by taking the "history" (asking the patient). A SIGN is OBJECTIVE — it is something a clinician can see, hear, feel, measure, or provoke during a physical examination or with an instrument or test: fever (measured temperature), a rash, swelling, pallor or jaundice, a palpable enlarged spleen, a heart murmur or crackles in the lungs (heard through a stethoscope), high blood pressure, an abnormal reflex, a limp, weight loss recorded over visits, an abnormal blood result. Signs are gathered by examination and investigation. Some findings are both a symptom and a sign — a visible tremor is felt by the patient and observed by the examiner; a cough is heard by both. "Asymptomatic" (or "subclinical") means a person has a disease or infection but no symptoms — common in early hypertension, early diabetes, and pre-symptomatic COVID. A recognised cluster of signs and symptoms that occur together is a "syndrome"; a "prodrome" is the vague early symptoms before a disease declares itself; the "chief complaint" is the main symptom that brought the patient in.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-micro-spectrum',
    title: 'Broad-Spectrum vs Narrow-Spectrum Antibiotics',
    category: 'Microbiology',
    keywords: [
      'what is the difference between a broad spectrum and narrow spectrum antibiotic',
      'the spectrum of an antibiotic is the range of bacterial types it is effective against it has nothing to do with light wavelengths',
      'a narrow spectrum antibiotic such as penicillin g or vancomycin acts against only a limited group of bacteria for example mainly gram positive organisms a broad spectrum antibiotic such as a tetracycline a carbapenem a fluoroquinolone or amoxicillin clavulanate acts against a wide range including both gram positive and gram negative bacteria',
      'broad spectrum drugs are used empirically when the pathogen is not yet known or the patient is severely ill but they do more collateral damage to the normal microbiome causing c difficile and thrush and drive resistance across many species so best practice is to de escalate to a narrow spectrum agent once cultures identify the bug',
    ],
    content: `The "spectrum" of an antibiotic is the range of bacterial species and groups it is effective against — nothing to do with light wavelengths. A NARROW-SPECTRUM antibiotic is active against only a limited set of bacteria — for example, penicillin G and benzylpenicillin (mainly streptococci and some other Gram-positives), vancomycin (Gram-positives, used for MRSA and C. diff), metronidazole (anaerobes and some protozoa), or isoniazid (essentially only Mycobacterium tuberculosis). A BROAD-SPECTRUM antibiotic is active against a wide range, typically including both Gram-positive and Gram-negative bacteria — for example, the tetracyclines (doxycycline), amoxicillin-clavulanate (co-amoxiclav), the carbapenems (meropenem), the fluoroquinolones (ciprofloxacin), and third-generation cephalosporins. Broad-spectrum drugs are valuable for EMPIRIC therapy — starting treatment before the causative organism is identified, or when a patient is critically ill and there's no time to wait, or for a polymicrobial infection. But they carry real costs: they wipe out large parts of the patient's normal protective microbiome (leading to Clostridioides difficile colitis, oral and vaginal thrush), they select for resistance across many bacterial species at once (not just the pathogen), and they are more likely to have off-target effects. So antibiotic stewardship guidelines say: use the narrowest effective agent whenever possible, and "de-escalate" — switch from the broad-spectrum empiric drug to a targeted narrow-spectrum one — as soon as culture and sensitivity results tell you exactly what you're treating.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-micro-prion',
    title: 'What a Prion Is',
    category: 'Microbiology',
    keywords: [
      'what is a prion transmissible spongiform encephalopathy',
      'a prion is an infectious agent made only of protein with no dna or rna at all it is a misfolded version of a normal cellular protein prp that is found mostly on nerve cells',
      'the misfolded prion protein acts as a template forcing nearby normal copies of the same protein to refold into the abnormal shape a chain reaction the abnormal protein is resistant to normal breakdown and to heat and to disinfection and it aggregates into plaques that riddle the brain with microscopic holes spongiform degeneration',
      'prion diseases are untreatable and always fatal examples creutzfeldt jakob disease in humans variant cjd from eating bse infected beef mad cow disease kuru scrapie in sheep chronic wasting disease in deer standard sterilisation does not destroy prions',
    ],
    content: `A prion ("proteinaceous infectious particle") is an infectious agent that consists of PROTEIN ALONE — it contains no DNA or RNA, which is why its existence was considered impossible when Stanley Prusiner proposed it (he won the 1997 Nobel Prize for it). A prion is a MISFOLDED form of a normal protein called PrP (the prion protein), which is made by our own cells and sits mostly on the surface of neurons; its normal function is still not fully understood. The disease-causing form, PrP^Sc, has the same amino-acid sequence but a different three-dimensional fold, rich in beta-sheet. It is infectious because it acts as a TEMPLATE: when a misfolded prion contacts a normally folded PrP molecule, it forces that molecule to refold into the abnormal shape, which then converts the next one — an exponential chain reaction. The misfolded protein resists the cell's normal protein-degradation machinery, resists heat, radiation, formalin, alcohol, and standard autoclaving, and accumulates as insoluble aggregates and amyloid plaques that progressively destroy brain tissue, leaving it full of microscopic vacuoles ("spongiform" — sponge-like — degeneration). Prion diseases (transmissible spongiform encephalopathies) are rare, have long incubation periods (years to decades), and are progressive, incurable, and invariably fatal. Human forms: Creutzfeldt–Jakob disease (mostly sporadic, some inherited), variant CJD (acquired by eating beef from cattle with BSE / "mad cow disease"), kuru (spread historically by ritual cannibalism in Papua New Guinea), fatal familial insomnia, Gerstmann–Sträussler–Scheinker syndrome. Animal forms: scrapie (sheep), BSE (cattle), chronic wasting disease (deer, elk — spreading in North America). Because ordinary sterilisation fails, contaminated surgical instruments are incinerated or treated with special protocols.`,
    createdAt: Date.now(),
  },
];
