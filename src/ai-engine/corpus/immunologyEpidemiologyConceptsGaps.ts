import { KnowledgeItem } from '../../types';

/**
 * IMMUNOLOGY_EPIDEMIOLOGY_CONCEPTS_GAPS — batch 230 corrections.
 * Content follows mainstream clinical / public-health consensus. Errors:
 * "retrovirus = DNA instead of RNA", "acute disease = sudden flare of a
 * chronic one", latent-period and incubation-period half-swapped, "type 2
 * diabetes treated with ACE inhibitors and beta-blockers", "systolic vs
 * diastolic dysfunction" answered about blood-pressure numbers, plus web dumps
 * / tangents for vector/reservoir (word embeddings), antiseptic/disinfectant,
 * sterile/clean technique (honeybees) and artery/arteriole.
 */
export const IMMUNOLOGY_EPIDEMIOLOGY_CONCEPTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-immepi-virus-vs-retrovirus',
    title: 'Virus vs retrovirus',
    category: 'health',
    keywords: [
      'difference between a virus and a retrovirus', 'retrovirus has an RNA genome', 'reverse transcriptase',
      'RNA copied into DNA', 'integrates into the host genome', 'HIV', 'not DNA instead of RNA', 'provirus',
    ],
    content: `A virus is a tiny infectious particle — genetic material (DNA or RNA) inside a protein coat — that cannot reproduce on its own and must hijack a living cell's machinery to make copies of itself. Viruses are grouped by what genome they carry and how they replicate.

A retrovirus is one specific class: it carries an RNA genome, but instead of using that RNA directly, it brings its own enzyme, REVERSE TRANSCRIPTASE, which copies the viral RNA into DNA (the "retro" — backwards — step, since the normal flow is DNA to RNA). That viral DNA is then spliced permanently into the host cell's own chromosomes (becoming a "provirus"), so every time the infected cell divides, the viral genes are copied too, and the cell may produce new virus for the rest of its life. This is why retroviral infections are so hard to clear.

So a retrovirus is NOT "a virus with DNA instead of RNA" — its genome is RNA; what makes it a retrovirus is the reverse-transcription step and genome integration. The best-known human retrovirus is HIV; HTLV is another. Reverse transcriptase is the target of many HIV drugs, and it is also a key tool in molecular biology.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-immepi-acute-vs-chronic-disease',
    title: 'Acute vs chronic disease',
    category: 'health',
    keywords: [
      'difference between acute and chronic disease', 'rapid onset short duration', 'long-lasting persistent',
      'more than three months', 'appendicitis flu fracture versus diabetes hypertension arthritis', 'acute exacerbation',
      'not a flare of a chronic condition',
    ],
    content: `An ACUTE disease or condition has a RAPID onset and a SHORT course — it comes on quickly and either resolves (with or without treatment), becomes chronic, or is fatal, usually within days to a few weeks. Examples: influenza, a common cold, appendicitis, a heart attack, a broken bone, a urinary tract infection, food poisoning.

A CHRONIC disease is LONG-LASTING — persisting for months or years (a common cutoff is more than three months), often for life, and typically progressing slowly and managed rather than cured. Examples: type 2 diabetes, hypertension, asthma, COPD, osteoarthritis, chronic kidney disease, heart failure, most cancers once established.

The two describe TIME COURSE, not severity — an acute illness (a massive heart attack) can be far more dangerous than a chronic one (mild well-controlled hypertension), and vice versa.

Note the term "acute exacerbation" (or "acute-on-chronic"): a sudden worsening OF a chronic disease — a COPD flare-up, a sickle-cell crisis, acute-on-chronic kidney failure. That is one situation where acute and chronic overlap, but it is not the definition of "acute disease". "Subacute" describes an intermediate course (weeks).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-immepi-pathogen-vs-parasite',
    title: 'Pathogen vs parasite',
    category: 'health',
    keywords: [
      'difference between a pathogen and a parasite', 'pathogen any disease-causing agent', 'parasite lives on or in a host at its expense',
      'a parasite can be a pathogen', 'bacteria viruses fungi protozoa helminths', 'ectoparasite endoparasite',
      'commensal versus parasitic',
    ],
    content: `"Pathogen" and "parasite" are not opposites; they classify organisms on different axes and overlap heavily.

A pathogen is ANY agent capable of causing DISEASE in a host. The category is defined by the OUTCOME (it makes you sick) and includes bacteria, viruses, fungi, protozoa, helminths (parasitic worms), and prions.

A parasite is an organism that lives ON (ectoparasite: lice, ticks, fleas) or IN (endoparasite: tapeworms, roundworms, malaria protozoa, Giardia) another organism (the host), taking nourishment or shelter from it at the host's expense. The category is defined by the LIFESTYLE / RELATIONSHIP (living off a host), not necessarily by causing severe disease — some parasites cause little harm, others are deadly.

The overlap: many parasites ARE pathogens (malaria, hookworm, schistosomiasis are parasitic diseases). But not all pathogens are parasites in the biological sense — viruses are obligate intracellular agents but are usually classed separately, and bacteria and fungi are pathogens without being "parasites" in the classic parasitology sense. And not all parasites are pathogens — a well-adapted parasite may be nearly harmless.

Related terms: a "commensal" lives on a host with no harm; a "mutualist" benefits the host; a "parasite" harms it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-immepi-latent-vs-incubation-period',
    title: 'Latent period vs incubation period',
    category: 'health',
    keywords: [
      'difference between an incubation period and a latent period', 'incubation infection to symptom onset',
      'latent infection to becoming infectious', 'pre-symptomatic transmission', 'COVID infectious before symptoms',
      'infectious period', 'epidemiology definitions',
    ],
    content: `Both are intervals starting from the moment of infection, but they end at different events.

The INCUBATION PERIOD runs from infection to the ONSET OF SYMPTOMS (the person feels or looks ill). It is what a patient usually means by "how long before I got sick".

The LATENT PERIOD runs from infection to the point where the person BECOMES INFECTIOUS (able to transmit the pathogen to others). It matters for modelling how an epidemic spreads.

The relationship between the two determines a disease's transmission dynamics:
- If the latent period is LONGER than the incubation period, people show symptoms BEFORE they can infect others — they can be identified and isolated in time (this was roughly true of SARS in 2003, which was easier to contain).
- If the latent period is SHORTER than the incubation period, people are infectious BEFORE they feel sick ("pre-symptomatic transmission") — much harder to control, as with COVID-19 and measles.

After the latent period comes the "infectious period", during which the person can spread the disease (which may or may not line up with when they have symptoms).

So: incubation ends when symptoms start; latency ends when you become contagious. The two are NOT the same and the gap between them is a key epidemiological feature.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-immepi-vector-vs-reservoir',
    title: 'Vector vs reservoir (disease transmission)',
    category: 'health',
    keywords: [
      'difference between a vector and a reservoir of disease', 'reservoir where a pathogen normally lives and multiplies',
      'vector a living organism that carries the pathogen between hosts', 'mosquito tick as vectors', 'rodents birds bats as reservoirs',
      'zoonosis', 'not word embeddings vectors',
    ],
    content: `In infectious-disease epidemiology (not linear-algebra "vectors" in machine learning):

A RESERVOIR is where a pathogen normally lives, multiplies and persists over the long term — its "home base" in nature. A reservoir can be a species of animal (rodents for hantavirus, bats for many coronaviruses and rabies, birds for West Nile and avian flu, deer and mice for Lyme), a group of humans, or an environmental source (soil for tetanus and anthrax spores, water for cholera and Legionella). The pathogen can survive indefinitely in its reservoir, often without causing serious disease there, and human outbreaks flare when contact with the reservoir increases. A disease that jumps from an animal reservoir to humans is a "zoonosis".

A VECTOR is a LIVING organism (usually an arthropod) that carries a pathogen from one host to another but is not the reservoir itself — a transmission vehicle. Mosquitoes are vectors for malaria, dengue, Zika, West Nile and yellow fever; ticks for Lyme disease and Rocky Mountain spotted fever; fleas for plague; sandflies for leishmaniasis; the tsetse fly for sleeping sickness. A "biological vector" is one in which the pathogen also develops or multiplies (a mosquito with malaria); a "mechanical vector" just carries it on its body (a housefly moving bacteria to food).

Short version: the reservoir is where the pathogen LIVES; the vector is what MOVES it to a new host.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-immepi-antiseptic-vs-disinfectant',
    title: 'Antiseptic vs disinfectant (vs sanitiser)',
    category: 'health',
    keywords: [
      'difference between antiseptic and disinfectant', 'antiseptic applied to living tissue skin and wounds',
      'disinfectant used on inanimate surfaces and instruments', 'both kill or inhibit microbes', 'sanitiser reduces to a safe level',
      'chlorhexidine iodine alcohol', 'bleach quaternary ammonium',
    ],
    content: `Both destroy or inhibit microorganisms, and some of the same chemicals appear in both categories — the difference is WHERE they are used and at what strength.

An ANTISEPTIC is applied to LIVING TISSUE — skin, wounds, mucous membranes — to prevent infection. It must kill or inhibit germs without seriously damaging human cells, so it is milder. Examples: alcohol-based hand rubs, povidone-iodine and chlorhexidine (surgical skin prep), hydrogen peroxide, and the antiseptic mouthwashes and wound washes sold for home use.

A DISINFECTANT is applied to INANIMATE (non-living) surfaces and objects — floors, countertops, toilets, medical instruments — to reduce or eliminate germs. Because it does not have to spare living tissue, it can be harsher and more effective. Examples: household bleach (sodium hypochlorite), quaternary ammonium compounds ("quats"), hydrogen peroxide at higher concentrations, phenolics. Disinfection does not necessarily kill bacterial spores; STERILISATION (heat, autoclave, strong chemicals) kills everything including spores.

A "sanitiser" is a third term: it reduces microbes to a level considered safe by public-health standards, without necessarily killing most of them — the word is used for both food-contact surfaces and "hand sanitiser".

Short version: antiseptic = on you (skin/wounds); disinfectant = on things (surfaces/instruments); sanitiser = reduce to a safe level; sterilant = kill absolutely everything.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-immepi-sterile-vs-clean-technique',
    title: 'Sterile technique vs clean (aseptic) technique',
    category: 'health',
    keywords: [
      'difference between sterile and clean technique', 'sterile field no microorganisms surgery central lines',
      'clean aseptic technique reduce and prevent contamination', 'non-sterile gloves hand hygiene', 'medical asepsis versus surgical asepsis',
      'dressing changes catheter care',
    ],
    content: `These are two levels of infection control used by nurses and clinicians during procedures. (Nothing to do with honeybees.)

CLEAN technique (also "medical asepsis" or "clean/aseptic non-touch technique") aims to REDUCE the number of microorganisms and PREVENT their spread — it does not require an absolutely microbe-free field. It involves thorough hand hygiene, non-sterile (clean) gloves, a clean work surface, using clean supplies, and not touching the "key parts" (the bits that will contact the patient) with anything unclean. Used for: most simple dressing changes, giving injections, inserting a peripheral IV, urinary catheter care in the community, and handling wounds that are not deep or sterile sites.

STERILE technique (also "surgical asepsis") aims for the COMPLETE ABSENCE of microorganisms in the working area. It requires a sterile field created with sterile drapes, sterile gloves (and often gown, mask and cap), sterilised instruments and supplies, and strict rules (only sterile touches sterile; a 2.5 cm border of the field is considered non-sterile; anything below waist level or out of sight is contaminated). Used for: surgery, inserting a central venous catheter or urinary catheter in hospital, lumbar puncture, and dressing changes on major surgical or burn wounds.

Short version: clean technique keeps microbe numbers low and avoids introducing new contamination; sterile technique demands a truly germ-free field for invasive procedures where any organism could cause a serious infection.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-immepi-systolic-vs-diastolic-dysfunction',
    title: 'Systolic vs diastolic heart dysfunction (HFrEF vs HFpEF)',
    category: 'health',
    keywords: [
      'difference between systolic and diastolic dysfunction', 'systolic dysfunction weak contraction reduced ejection fraction',
      'diastolic dysfunction stiff ventricle poor filling preserved ejection fraction', 'HFrEF HFpEF heart failure',
      'not the top and bottom blood pressure numbers', 'ejection fraction',
    ],
    content: `These describe two ways the heart's left ventricle can fail. They are NOT about the top (systolic) and bottom (diastolic) numbers of a blood-pressure reading.

SYSTOLIC dysfunction means the ventricle cannot CONTRACT and pump forcefully enough. The muscle is weakened (after a heart attack, from a cardiomyopathy, from long-standing high blood pressure or valve disease), so it ejects a smaller fraction of the blood it holds. This is measured by a REDUCED ejection fraction (EF below ~40%), and the condition is called "heart failure with reduced ejection fraction" (HFrEF). Treatment has strong evidence: ACE inhibitors / ARBs / ARNI, beta-blockers, mineralocorticoid antagonists, and SGLT2 inhibitors all improve survival.

DIASTOLIC dysfunction means the ventricle cannot RELAX and FILL properly between beats. The muscle is stiff and thickened (from hypertension, aging, diabetes, obesity), so filling pressures rise and blood backs up into the lungs, even though the pumping (ejection fraction) is normal or near-normal. This is "heart failure with preserved ejection fraction" (HFpEF), EF above ~50%. It is harder to treat: manage blood pressure, fluid, and comorbidities; SGLT2 inhibitors now have evidence here too.

Short version: systolic dysfunction = weak squeeze, low EF (HFrEF); diastolic dysfunction = stiff, poor fill, normal EF (HFpEF).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-immepi-t1d-vs-t2d-treatment',
    title: 'Type 1 vs type 2 diabetes: treatment',
    category: 'health',
    keywords: [
      'difference between type 1 and type 2 diabetes for treatment', 'type 1 needs insulin from diagnosis',
      'autoimmune no insulin production', 'type 2 lifestyle then metformin GLP-1 SGLT2 sulfonylurea', 'insulin resistance',
      'not ACE inhibitors or beta-blockers', 'continuous glucose monitoring',
    ],
    content: `Type 1 diabetes is an autoimmune destruction of the insulin-producing beta cells, so the body makes little or no insulin. Treatment is INSULIN from diagnosis, for life — multiple daily injections or an insulin pump, matched to carbohydrate intake and activity, guided by fingerstick or continuous glucose monitoring. Diet and exercise matter for control but cannot replace insulin. There is no oral pill that works for type 1.

Type 2 diabetes is mainly insulin RESISTANCE (the body's cells respond poorly to insulin) plus a gradual decline in insulin production. Treatment is a stepped approach:
1. Lifestyle: weight loss, diet, physical activity — can substantially improve or even put early type 2 into remission.
2. Metformin is usually the first-line drug.
3. Add other agents based on the person's heart/kidney risk and weight: GLP-1 receptor agonists (also cause weight loss) and SGLT2 inhibitors (also protect the heart and kidneys) are now favoured; sulfonylureas, DPP-4 inhibitors and pioglitazone are alternatives.
4. Insulin is added later if these are not enough — many, but not all, people with type 2 eventually need it.

ACE inhibitors and beta-blockers are NOT diabetes drugs — they treat blood pressure and heart disease, which are common in diabetics, so a person with type 2 may take them too, but they do nothing for blood sugar.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-immepi-artery-vs-arteriole',
    title: 'Artery vs arteriole',
    category: 'health',
    keywords: [
      'difference between an artery and an arteriole', 'large elastic and muscular conducting vessels',
      'small terminal branches that control resistance', 'arterioles regulate blood flow and blood pressure',
      'the resistance vessels', 'vasoconstriction vasodilation', 'artery to arteriole to capillary',
    ],
    content: `Both carry blood AWAY from the heart, but they differ in size and job.

Arteries are the large and medium vessels closest to the heart. The largest ("elastic" or conducting arteries, like the aorta and its main branches) have thick walls rich in elastic tissue; they stretch when the heart ejects blood and recoil between beats, smoothing the pulsing flow into a steadier stream and helping maintain pressure. Medium ("muscular" or distributing arteries) carry blood to organs and limbs. Their diameter changes relatively little moment to moment.

Arterioles are the smallest arterial branches (roughly 10-100 micrometres across), the final vessels before the capillaries. Their walls are mostly smooth muscle, and that muscle is under constant control by the autonomic nervous system, local chemicals and hormones. By constricting (narrowing) or dilating (widening), arterioles regulate:
- how much blood flows into each capillary bed (directing blood to where it is needed — muscles during exercise, skin to lose heat, gut after a meal), and
- the total peripheral RESISTANCE, which — with cardiac output — sets the arterial blood pressure.

For this reason arterioles are called the "resistance vessels" and are the main site where blood pressure is adjusted. The full sequence is: heart -> artery -> arteriole -> capillary (exchange) -> venule -> vein -> heart.`,
    createdAt: Date.now(),
  },
];
