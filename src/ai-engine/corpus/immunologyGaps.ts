import { KnowledgeItem } from '../../types';

// Batch 68 (immunology). Live misses on nexus-4b: "what is the complement
// system" answered about set theory; "how does the body fight a cold" answered
// about goosebumps and cold weather (misread "a cold" as "the cold"); "what is
// sepsis" was a raw web dump; "what is an antigen" said "marker molecules on
// your red blood cells" (that's only blood-group antigens); "what is
// immunodeficiency" only described HIV.
export const IMMUNOLOGY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-complement-system',
    title: 'What the Complement System Is (Immunology)',
    category: 'Immunology',
    keywords: [
      'what is the complement system', 'complement proteins immune', 'membrane attack complex', 'opsonization complement',
      'classical alternative lectin pathway', 'complement system vs set theory', 'C3 C5 complement cascade',
    ],
    content: `In immunology, the complement system is a group of about 30 or more proteins, made mostly by the liver and circulating in the blood, that "complement" (assist) antibodies and phagocytes in destroying microbes. It has nothing to do with the set-theory meaning of "complement." The proteins normally sit inactive and are triggered in a chain reaction by any of three pathways: the classical pathway (started by antibodies bound to a target), the lectin pathway (started by sugars on microbial surfaces), and the alternative pathway (spontaneous, amplified on foreign surfaces). Once activated, complement does three main jobs: opsonization — coating a microbe so phagocytes grab it more easily; chemotaxis — releasing fragments (anaphylatoxins like C5a) that recruit and activate immune cells and drive inflammation; and lysis — assembling the "membrane attack complex," a ring that punches a hole in the microbe's membrane and bursts it. Complement is a core part of innate immunity but bridges into adaptive immunity through the antibody-triggered pathway.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-body-fights-a-cold',
    title: 'How the Body Fights a Cold',
    category: 'Immunology',
    keywords: [
      'how does the body fight a cold', 'immune response to a cold virus', 'why do cold symptoms happen', 'interferon runny nose cold',
      'are cold symptoms the virus or the immune system', 'how long does it take to get over a cold', 'why do you keep catching colds',
    ],
    content: `A "cold" is a viral infection of the upper airway (most often a rhinovirus). The body fights it in two waves. First, innate immunity: infected cells detect the virus and release interferons that warn neighbouring cells and slow viral copying; inflammation widens blood vessels and brings in neutrophils and macrophages; extra mucus (runny, stuffy nose), sneezing and coughing physically flush and expel virus; and mild fever and fatigue make the body a worse host. Then, over a few days, adaptive immunity: killer T cells destroy infected cells and B cells produce antibodies specific to that virus, which clear it and provide lasting immunity to that exact strain. Most of what you feel during a cold — congestion, sore throat, aches — is the immune response itself, not damage by the virus, which is why symptoms can outlast the infection. Recovery usually takes 7–10 days. People keep catching colds because there are hundreds of distinct cold-causing viruses, so immunity to one does not protect against the next.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sepsis',
    title: 'What Sepsis Is',
    category: 'Immunology',
    keywords: [
      'what is sepsis', 'sepsis vs infection', 'septic shock', 'why is sepsis life threatening', 'sepsis symptoms and treatment',
      'dysregulated immune response infection', 'is sepsis blood poisoning',
    ],
    content: `Sepsis is life-threatening organ dysfunction caused by the body's own dysregulated, overwhelming response to an infection. It is not the infection itself and not simply "blood poisoning": an infection anywhere (lungs, urinary tract, abdomen, skin, a wound) can trigger it. The immune reaction spills out of control and becomes systemic — widespread inflammation, tiny blood clots forming throughout the circulation, blood vessels leaking fluid, and blood pressure falling. Organs (kidneys, liver, lungs, brain) start to fail from poor blood flow. "Septic shock" is the severe stage with dangerously low blood pressure that doesn't respond to fluids. Warning signs include confusion, fast breathing, rapid heartbeat, fever or abnormally low temperature, and clammy or mottled skin. It is a medical emergency: survival depends on treatment within hours — broad-spectrum antibiotics, large volumes of intravenous fluid, drugs to raise blood pressure, and support for failing organs. Mortality is high, especially once shock develops.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-antigen',
    title: 'What an Antigen Is',
    category: 'Immunology',
    keywords: [
      'what is an antigen', 'antigen vs antibody', 'what is an epitope', 'antigen definition immunology', 'self vs non-self antigen',
      'are antigens only on red blood cells', 'what makes something antigenic',
    ],
    content: `An antigen is any molecule that the immune system can recognise and mount a response against — most often a protein or a polysaccharide (sugar chain), though lipids and nucleic acids can also be antigenic. Antigens are found on the surfaces of bacteria, viruses, fungi and parasites, in bacterial toxins, on pollen and other allergens, on transplanted tissue, and on the body's own cells (blood-group molecules on red blood cells are just one example — "antigen" is not limited to red cells). The specific small region of the antigen that an antibody or T-cell receptor actually binds is called the epitope. The immune system is normally trained during development to ignore "self" antigens and react only to "non-self"; when that tolerance breaks down, the result is autoimmune disease. Vaccines work by presenting a harmless antigen so the immune system builds antibodies and memory cells against it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-immunodeficiency',
    title: 'What Immunodeficiency Is',
    category: 'Immunology',
    keywords: [
      'what is immunodeficiency', 'primary vs secondary immunodeficiency', 'causes of a weak immune system', 'SCID bubble boy',
      'acquired immunodeficiency causes', 'immunocompromised meaning', 'is immunodeficiency only hiv',
    ],
    content: `Immunodeficiency is any condition in which part of the immune system is absent or not working properly, so infections are more frequent, more severe, harder to clear, or caused by organisms that don't normally make healthy people sick (opportunistic infections). HIV is only one cause. There are two broad types. PRIMARY (inherited) immunodeficiencies are present from birth due to genetic defects; there are hundreds, ranging from mild (selective IgA deficiency) to fatal without treatment (severe combined immunodeficiency, SCID, the "bubble boy" disease). SECONDARY (acquired) immunodeficiencies are far more common and develop later from an outside cause: HIV infection, chemotherapy and radiation, immunosuppressant drugs (after a transplant or for autoimmune disease), corticosteroids, certain cancers (leukaemia, lymphoma, myeloma), severe malnutrition, diabetes, removal of the spleen, and normal aging. People with immunodeficiency are described as "immunocompromised" and need extra protection against infection.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-antibody-detail',
    title: 'What an Antibody Is',
    category: 'Immunology',
    keywords: [
      'what is an antibody', 'immunoglobulin y shaped protein', 'igg igm iga ige igd classes', 'how do antibodies neutralize pathogens',
      'antibody antigen binding site', 'what makes antibodies specific', 'opsonization by antibodies',
    ],
    content: `An antibody (immunoglobulin) is a Y-shaped protein made by plasma cells (activated B cells). The two tips of the Y form a binding site whose shape is specific to one particular antigen; the body can generate billions of different shapes by randomly shuffling gene segments (V(D)J recombination), so almost any invader matches some antibody. Once bound, antibodies work in several ways: neutralisation (blocking a virus or toxin from attaching to cells), opsonisation (coating a microbe so phagocytes engulf it), agglutination (clumping microbes together), and activating the complement system. There are five classes: IgG (most abundant in blood, crosses the placenta, long-term immunity), IgM (first produced in a new infection, large, pentameric), IgA (in mucus, saliva, breast milk, tears), IgE (allergic reactions and parasites), and IgD (a B-cell surface receptor, function less understood). After an infection, long-lived memory B cells let the body produce the right antibody far faster the next time.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bacteria-vs-viruses',
    title: 'The Difference Between Bacteria and Viruses',
    category: 'Immunology',
    keywords: [
      'what is the difference between bacteria and viruses', 'are viruses alive', 'why do antibiotics not work on viruses',
      'bacteria cell virus not cell', 'how do bacteria vs viruses reproduce', 'antivirals vs antibiotics',
    ],
    content: `Bacteria are living, single-celled organisms: they have their own cell membrane (and usually a cell wall), ribosomes, and metabolism, and most reproduce independently by dividing in two. They live nearly everywhere, and the large majority are harmless or beneficial (gut bacteria, soil bacteria); only some cause disease. Viruses are much smaller and are not cells and, by most definitions, not alive on their own: a virus is just a strand of genetic material (DNA or RNA) inside a protein coat, sometimes with a lipid envelope. A virus cannot do anything by itself — it must get inside a host cell and hijack that cell's machinery to make copies of itself, usually destroying the cell. This is why antibiotics — which attack bacterial structures like the cell wall or bacterial ribosomes — do nothing against viruses, which have none of those. Viral infections need antiviral drugs (which target specific viral steps), vaccines, or simply the immune system. It's also why a doctor won't prescribe antibiotics for a cold or the flu.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-fever-why',
    title: 'What a Fever Is and Why We Get One',
    category: 'Immunology',
    keywords: [
      'what is a fever and why do we get one', 'how does a fever help fight infection', 'hypothalamus thermostat pyrogen',
      'why do you shiver when your temperature rises', 'is a fever dangerous', 'why do you feel cold with a fever',
    ],
    content: `A fever is a temporary rise in body temperature above the normal ~37 °C, usually to 38 °C (100.4 °F) or higher, driven deliberately by the body rather than by overheating. During an infection, immune cells and microbes release "pyrogens" (such as certain cytokines and bacterial toxins) that act on the hypothalamus, the brain's thermostat, telling it to set the target temperature higher. The body then behaves as if it's cold to reach that new set point: blood vessels in the skin constrict, and you shiver — which is why the start of a fever feels like chills. The higher temperature is generally helpful: it slows the replication of many bacteria and viruses, speeds up immune cell activity, and makes some iron and nutrients less available to microbes. When the infection clears, the set point drops back and the body sheds heat by sweating. Most fevers are not dangerous and don't need to be forced down; medical attention is warranted for very high fever, fever in a young infant, or fever with confusion, stiff neck, difficulty breathing, or a non-blanching rash.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cytokine-storm',
    title: 'What a Cytokine Storm Is',
    category: 'Immunology',
    keywords: [
      'what is a cytokine storm', 'cytokine release syndrome', 'why did the 1918 flu kill young adults', 'hyperinflammation covid',
      'cytokine storm ards organ failure', 'immune overreaction cytokine storm',
    ],
    content: `A cytokine storm (also called cytokine release syndrome or hyperinflammation) is an excessive, self-amplifying release of cytokines — the signalling molecules immune cells use to talk to each other. Normally cytokines coordinate a measured response to infection; in a storm, activated immune cells release cytokines that activate still more immune cells, which release still more, in a runaway loop. The result is massive systemic inflammation: very high fever, leaky and dilated blood vessels, falling blood pressure, blood clotting abnormalities, fluid flooding the lungs (acute respiratory distress syndrome), and multi-organ failure. It can be triggered by severe infections (the 1918 influenza, severe COVID-19, some other viral and bacterial infections), by certain immunotherapies (CAR-T cell treatment), and in some genetic conditions. It is thought to be one reason the 1918 flu killed a striking number of healthy young adults, whose vigorous immune systems could mount the most violent overreaction. Treatment aims to dampen the immune response (corticosteroids, drugs blocking specific cytokines like IL-6) while supporting the failing organs.`,
    createdAt: Date.now(),
  },
];
