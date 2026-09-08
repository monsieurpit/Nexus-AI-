import { KnowledgeItem } from '../../types';

// Batch 53 (medications & drug classes) gap-fills. General information about how
// drug classes work — NOT medical advice; dosing and use are decisions for a
// doctor or pharmacist. Live misses on nexus-4b: "what do antidepressants do"
// -> a discontinuation-syndrome web dump; "what is a diuretic" -> answered
// about caffeine; "brand name vs generic drug" -> a branding/logo web dump;
// "vaccine adjuvant" -> "especially with live-attenuated shots like MMR" (wrong,
// adjuvants go in inactivated/subunit vaccines); "why finish a course of
// antibiotics" -> a rant about catching bronchitis at a Barca match.
export const MEDICATIONS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-antidepressants',
    title: 'What Antidepressants Do',
    category: 'Medications',
    keywords: [
      'what do antidepressants do', 'how do antidepressants work', 'what is an ssri', 'do antidepressants change brain chemistry',
      'how long do antidepressants take to work', 'are antidepressants addictive', 'types of antidepressants',
    ],
    content: `Antidepressants are medications used mainly for moderate-to-severe depression, and also for anxiety disorders, OCD, PTSD, chronic pain and some other conditions. The main classes are SSRIs (selective serotonin reuptake inhibitors — fluoxetine/Prozac, sertraline/Zoloft, escitalopram), which are usually first choice; SNRIs (venlafaxine, duloxetine); older tricyclics (amitriptyline) and MAOIs, which work well but have more side effects and interactions. Most of them increase the amount of the neurotransmitters serotonin and/or noradrenaline available between brain cells, but the full explanation of how they lift mood is still not settled — the simple "correcting a chemical imbalance" story is now seen as incomplete, and part of the effect may involve promoting the growth of new neural connections. They typically take 2–6 weeks to take effect, are taken daily for months or longer, and are NOT addictive in the way opioids are — but stopping suddenly can cause an unpleasant "discontinuation syndrome" (dizziness, "brain zaps", flu-like feelings), so they're tapered down gradually under medical guidance.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-a-diuretic',
    title: 'What a Diuretic Is',
    category: 'Medications',
    keywords: [
      'what is a diuretic', 'what does a water pill do', 'diuretic for blood pressure', 'furosemide loop diuretic',
      'why do diuretics make you pee', 'thiazide diuretic', 'is coffee a diuretic',
    ],
    content: `A diuretic ("water pill") is a medication that makes the kidneys pass more sodium (and with it, more water) into the urine, reducing the volume of fluid in the blood and tissues. Doctors use them for: high blood pressure (less fluid volume means less pressure on artery walls); heart failure and kidney/liver disease, where fluid backs up and swells the legs, abdomen or lungs (oedema); and some other conditions. The main types are thiazides (hydrochlorothiazide — mild, common for blood pressure), loop diuretics (furosemide/Lasix — strong, fast, for fluid overload), and potassium-sparing diuretics (spironolactone). Side effects come from losing too much fluid or the wrong balance of salts — dehydration, low potassium or sodium, dizziness, and increased urination (which is why they're taken in the morning). Caffeine and alcohol have a mild diuretic effect but are not medications and don't meaningfully dehydrate you at normal intakes.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-brand-vs-generic-drug',
    title: 'Brand-Name vs Generic Drugs',
    category: 'Medications',
    keywords: [
      'what is the difference between a brand name and a generic drug', 'brand vs generic medication', 'are generic drugs as good as brand name',
      'why are generic drugs cheaper', 'what is bioequivalence', 'why do generics look different', 'drug patent expiry generic',
    ],
    content: `When a company develops a new drug it gets a patent (about 20 years, minus development time) and sells it under a brand name at a high price to recoup research costs. When the patent expires, other manufacturers can make a "generic" version. A generic contains the exact same active ingredient, in the same strength and dose form, taken the same way, and to be approved it must be shown to be "bioequivalent" — it delivers the drug into the bloodstream at essentially the same rate and amount (regulators allow only a small margin). It's typically 30–85% cheaper because there's no research or big marketing budget to pay back, and competition drives prices down further. Generics can differ in name, and in the inactive ingredients — the colour, shape, fillers, coatings and flavourings — which is why the pill looks different; occasionally that matters for someone with a specific allergy, or for a few "narrow therapeutic index" drugs where doctors prefer to keep patients on one version. Otherwise generics are considered just as safe and effective.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-vaccine-adjuvant',
    title: 'What a Vaccine Adjuvant Is',
    category: 'Medications',
    keywords: [
      'what is a vaccine adjuvant', 'what does an adjuvant do in a vaccine', 'aluminum salts vaccine adjuvant',
      'which vaccines have adjuvants', 'do live vaccines have adjuvants', 'why do some vaccines need an adjuvant',
    ],
    content: `An adjuvant is a substance added to some vaccines to make the immune system respond more strongly and for longer to the vaccine's antigen (the piece of the germ the vaccine contains). It works by creating a small, controlled local irritation and drawing immune cells to the injection site, so the body "pays attention" and forms better, longer-lasting immunity — and it lets manufacturers use less antigen per dose. The oldest and most common adjuvants are aluminium salts (alum), used for about a century in vaccines like tetanus, diphtheria, hepatitis A and B, and HPV; newer ones include oil-in-water emulsions (MF59, AS03) and combinations in the shingles (Shingrix) and some COVID vaccines. Importantly, adjuvants are used in INACTIVATED (killed) and subunit/protein vaccines, which on their own provoke a weak response. LIVE-attenuated vaccines (MMR, chickenpox, oral polio, yellow fever) do NOT contain adjuvants — a weakened but replicating virus already triggers a full immune response by itself. mRNA vaccines also don't use a traditional added adjuvant (the lipid particle plays a similar role).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-finish-antibiotics',
    title: 'Why You Are Told to Finish a Course of Antibiotics',
    category: 'Medications',
    keywords: [
      'why do you need to finish a course of antibiotics', 'should you stop antibiotics when you feel better',
      'do antibiotics cause resistance if you stop early', 'how long should you take antibiotics', 'antibiotic course length',
    ],
    content: `The traditional advice is to finish the full prescribed course even after you feel better, for two reasons: to make sure the infection is fully cleared so it doesn't relapse, and — the classic argument — so that no partly-resistant bacteria are left alive to multiply. That second point is now debated: some researchers argue that longer-than-necessary antibiotic exposure actually gives resistance more chances to develop, and that for several common infections short courses work just as well. The current expert position is that "always finish the course" is an oversimplification — the right length depends on the infection, and it's set by evidence for each condition. The practical takeaway hasn't really changed for patients: take antibiotics exactly as your doctor prescribes, for the length they specify, and don't stop early on your own or save leftovers for next time. Never take antibiotics for a cold, flu or most sore throats and coughs — they're viral, and antibiotics do nothing but breed resistance and cause side effects.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tolerance-vs-dependence',
    title: 'Drug Tolerance vs Dependence vs Addiction',
    category: 'Medications',
    keywords: [
      'what is drug tolerance versus dependence', 'tolerance vs dependence vs addiction', 'what is physical dependence',
      'is dependence the same as addiction', 'what is withdrawal', 'why do you need higher doses over time',
    ],
    content: `These three often get muddled but are distinct. TOLERANCE is when the body adapts to a drug so that the same dose produces a smaller effect over time, and a higher dose is needed to get the original result — it happens with opioids, alcohol, caffeine, some anxiety and sleep medications, and others. DEPENDENCE (physical dependence) is when the body has adapted to a drug's presence so much that stopping it suddenly triggers withdrawal symptoms (which vary by drug — from restlessness and nausea to, for alcohol and benzodiazepines, dangerous seizures). Dependence can develop from taking a medication exactly as prescribed — for example some blood-pressure or antidepressant drugs cause withdrawal effects — and by itself it is NOT the same as addiction; it just means the drug should be tapered rather than stopped abruptly. ADDICTION (substance use disorder) is a behavioural/brain condition: compulsive drug-seeking and use that continues despite clear harm, with loss of control, cravings and neglect of other parts of life. A person can be dependent without being addicted, and, less commonly, show addictive behaviour without much physical dependence.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-aspirin-other-uses',
    title: 'What Aspirin Does Besides Pain Relief',
    category: 'Medications',
    keywords: [
      'what does aspirin do besides pain relief', 'low dose aspirin heart attack', 'why does aspirin thin the blood',
      'should i take aspirin every day', 'aspirin for stroke prevention', 'aspirin during a heart attack', 'aspirin and colon cancer',
    ],
    content: `Besides relieving pain, fever and inflammation (like other NSAIDs, by blocking COX enzymes and prostaglandins), aspirin has a special effect on blood platelets: it permanently disables an enzyme they need to clump together, and because platelets can't make new enzyme, one dose keeps that platelet "switched off" for its whole ~7–10-day life. So aspirin makes blood less likely to form clots. That's why: a LOW daily dose (75–100 mg) is used long-term to help prevent heart attacks and strokes in people who have already had one or are at high risk (it's no longer routinely recommended for healthy people, because the bleeding risk can outweigh the benefit); a full 300 mg tablet, chewed, is given immediately when someone is having a suspected heart attack; and long-term aspirin use is linked to a lower risk of colorectal cancer. The trade-off is increased bleeding — from the stomach lining (it can cause ulcers and gastrointestinal bleeds) and elsewhere — which is why people are usually told to STOP aspirin for a period before planned surgery, not take it beforehand.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-antacid-vs-ppi',
    title: 'Antacid vs Proton Pump Inhibitor (and H2 Blocker)',
    category: 'Medications',
    keywords: [
      'what is an antacid versus a proton pump inhibitor', 'antacid vs ppi', 'how do tums work vs omeprazole',
      'what is an h2 blocker', 'fast acting vs long lasting heartburn medicine', 'when to use antacid vs ppi',
    ],
    content: `These treat heartburn and reflux in different ways. ANTACIDS (Tums, Rennie, Rolaids, Maalox, Gaviscon) are simple bases — calcium carbonate, magnesium or aluminium hydroxide — that chemically NEUTRALISE the acid already sitting in your stomach. They work within minutes but only last an hour or two, so they're for occasional, mild heartburn. H2 BLOCKERS (famotidine/Pepcid) and PROTON PUMP INHIBITORS (omeprazole, esomeprazole/Nexium, lansoprazole) instead REDUCE how much acid the stomach makes — H2 blockers partly, PPIs strongly and for many hours by shutting down the "proton pumps" in the stomach lining. They take longer to kick in (a PPI reaches full effect over a few days) but give lasting control, so they're used for frequent heartburn, GERD, and healing ulcers. PPIs are meant for defined courses, not indefinite daily use, because long-term use is linked to lower magnesium and B12, more gut infections and possibly bone issues. Antacids and acid-reducers can even be used together — an antacid for immediate relief while a PPI builds up.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-how-anesthesia-works',
    title: 'How Anesthesia Works',
    category: 'Medications',
    keywords: [
      'how does anesthesia work', 'general vs local anesthesia', 'what is local anesthetic', 'how does general anesthesia work',
      'what is a nerve block', 'do we know how anesthesia works', 'why dont you remember surgery',
    ],
    content: `LOCAL anesthetics (lidocaine, bupivacaine) work in a clear way: they block the sodium channels that nerve fibres use to fire electrical signals, so pain messages from that specific area can't travel to the brain. You stay fully awake; you may still feel pressure, but not pain. A "nerve block" or "regional" anesthetic (like an epidural) does the same thing on a bigger nerve, numbing a whole limb or region. GENERAL anesthesia is different and more mysterious: it uses a combination of drugs (inhaled gases like sevoflurane, and IV drugs like propofol) to produce unconsciousness, no memory of the event (amnesia), no movement, and a blunted stress/pain response — acting on the brain and spinal cord, largely by boosting the calming neurotransmitter GABA and blocking the excitatory one (glutamate/NMDA). Despite 175 years of use, the exact way general anesthetics switch off consciousness is still not fully understood. Because these drugs also depress breathing and blood pressure, an anesthesiologist continuously monitors and supports the patient throughout.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-chemotherapy',
    title: 'What Chemotherapy Is',
    category: 'Medications',
    keywords: [
      'what is chemotherapy', 'how does chemo work', 'why does chemo cause hair loss', 'chemo vs radiation vs immunotherapy',
      'is chemo a cure', 'chemotherapy side effects', 'adjuvant chemotherapy',
    ],
    content: `Chemotherapy is the use of drugs that kill cancer cells or stop them dividing, given as pills or (more often) into a vein. Most chemo drugs target cells that are dividing rapidly — which cancer cells do — but they can't fully tell cancer from the body's own fast-dividing healthy cells, so the classic side effects come from damage to hair follicles (hair loss), the gut lining (nausea, mouth sores, diarrhoea) and the bone marrow (low blood counts → fatigue, infections, bruising); these usually recover after treatment ends. Chemotherapy is a distinct treatment, separate from surgery, radiation therapy and immunotherapy, though several are often combined in one plan. It's used in different roles: to cure some cancers outright (many leukaemias, lymphomas, testicular cancer), to shrink a tumour before surgery ("neoadjuvant"), to mop up stray cells after surgery to prevent return ("adjuvant"), or to control an incurable cancer and relieve symptoms ("palliative"). It is not just a "last resort."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sedative-vs-hypnotic',
    title: 'Sedative vs Hypnotic',
    category: 'Medications',
    keywords: [
      'what is the difference between a sedative and a hypnotic', 'sedative vs hypnotic', 'what is a sedative-hypnotic',
      'do benzodiazepines calm you or make you sleep', 'what is an anxiolytic', 'tranquilizer meaning',
    ],
    content: `Both are central-nervous-system depressants that slow brain activity, and the difference is mostly one of degree and intended use. A SEDATIVE (or "tranquilliser," or "anxiolytic" when used for anxiety) calms a person down — reducing tension, agitation and excitement while they stay awake. A HYPNOTIC (a "sleeping pill," "soporific") is used at a stronger effect to bring on and maintain sleep for insomnia. Very often it's the SAME drug at a different dose: many benzodiazepines (diazepam, lorazepam) and "Z-drugs" (zolpidem/Ambien, zopiclone) act as sedatives at a low dose and hypnotics at a higher one, which is why the whole class is called "sedative-hypnotics." Others in the family include barbiturates (now rare), some antihistamines (diphenhydramine), and, in effect, alcohol. Risks across the group: next-day grogginess, impaired coordination and memory, tolerance and dependence with regular use, and dangerous, potentially fatal breathing suppression if combined with alcohol or opioids.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ibuprofen-acetaminophen',
    title: 'Ibuprofen vs Acetaminophen (Paracetamol) — Practical Differences',
    category: 'Medications',
    keywords: [
      'what is the difference between ibuprofen and acetaminophen', 'ibuprofen vs paracetamol', 'advil vs tylenol',
      'which is safer ibuprofen or acetaminophen', 'can you take ibuprofen and acetaminophen together', 'acetaminophen liver damage',
    ],
    content: `Both lower pain and fever, but they differ. IBUPROFEN (Advil, Motrin, Nurofen) is an NSAID: it blocks COX enzymes throughout the body, so it also reduces INFLAMMATION and is better for sprains, strains, dental and menstrual pain, and arthritis. Its downsides: it can irritate the stomach lining and cause ulcers or bleeding (take it with food), it can stress the kidneys and is avoided in kidney disease and dehydration, it can raise blood pressure and cardiovascular risk with heavy long-term use, and it's generally avoided in the third trimester of pregnancy. ACETAMINOPHEN / PARACETAMOL (Tylenol, Panadol) works mainly in the brain to reduce pain and fever, with little effect on inflammation. It's gentle on the stomach and kidneys and is the preferred choice in pregnancy — but its danger is the liver: exceeding the daily maximum (around 3–4 g for an adult), or taking it while drinking heavily, can cause severe liver damage, and it's a common cause of accidental overdose because it's hidden in many combination cold and pain products. The two can be taken together or alternated for stronger relief since they work differently; two different NSAIDs should not be combined.`,
    createdAt: Date.now(),
  },
];
