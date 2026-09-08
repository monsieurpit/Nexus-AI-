import { KnowledgeItem } from '../../types';

// Batch 77 (neuroscience & the nervous system). nexus-4b misses: "what is a
// reflex arc" said the signal goes to the BRAIN and back (the whole point is
// that it routes through the spinal cord and bypasses the brain); "grey matter
// versus white matter", "what is myelin", and "what is the limbic system" were
// raw web dumps; "what is the hippocampus" said it is "linked to Broca's area
// for speech production" (it is a memory structure); "what causes a seizure"
// answered with seizure first aid instead.
export const NEUROSCIENCE_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-reflex-arc',
    title: 'What a Reflex Arc Is',
    category: 'Neuroscience',
    keywords: [
      'what is a reflex arc', 'does a reflex go through the brain', 'spinal reflex bypass brain', 'knee jerk reflex pathway',
      'sensory interneuron motor neuron reflex', 'why do you pull your hand off a hot stove before feeling it', 'monosynaptic reflex',
    ],
    content: `A reflex arc is the neural pathway that produces an automatic, involuntary response to a stimulus, and its defining feature is that it does NOT wait for the brain. The pathway: a receptor detects the stimulus (heat, a stretch); a sensory (afferent) neuron carries that signal to the spinal cord; within the spinal cord it connects either directly to a motor neuron (a "monosynaptic" reflex, like the knee-jerk) or through one or more interneurons; a motor (efferent) neuron then carries the command out to a muscle or gland, which responds. All of this happens in a fraction of a second. The signal is also passed up to the brain, but that arrives slightly later — which is why you jerk your hand off a hot stove first and consciously feel the pain a moment afterward. Routing simple protective responses through the spinal cord keeps them fast; the brain is informed but not in the loop for the decision.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-grey-vs-white-matter',
    title: 'Grey Matter versus White Matter',
    category: 'Neuroscience',
    keywords: [
      'what is grey matter versus white matter', 'grey matter neuron cell bodies', 'white matter myelinated axons',
      'why is white matter white', 'cortex grey matter', 'spinal cord grey and white matter arrangement',
    ],
    content: `Grey matter and white matter are the two main tissue types of the central nervous system, distinguished by what they contain. GREY MATTER is made up of neuron cell bodies, dendrites, and the synapses between them — it is where information is actually processed and integrated. It forms the wrinkled outer layer of the cerebrum (the cerebral cortex), the outer layer of the cerebellum, and clusters of deep nuclei. WHITE MATTER is made up of the myelinated axons that connect grey-matter regions to each other and to the rest of the body — it is the wiring, not the computing. It looks white because of the fatty myelin insulation wrapped around those axons. In the brain, grey matter is on the outside and white matter is deeper (with some deep grey nuclei); in the spinal cord the arrangement is reversed, with a butterfly-shaped core of grey matter surrounded by white matter tracts running up and down.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hippocampus',
    title: 'What the Hippocampus Does',
    category: 'Neuroscience',
    keywords: [
      'what is the hippocampus', 'hippocampus memory formation', 'is the hippocampus for speech', 'anterograde amnesia patient hm',
      'hippocampus spatial navigation place cells', 'hippocampus alzheimer', 'medial temporal lobe memory',
    ],
    content: `The hippocampus is a small, seahorse-shaped structure in the medial temporal lobe, one on each side of the brain, and part of the limbic system. Its central job is memory — specifically, converting new experiences into durable long-term "declarative" memories (facts and events) and consolidating them into the cortex over time. It is not involved in speech production; that is Broca's area, a separate region in the frontal lobe. The hippocampus is also essential for spatial navigation: it builds a "cognitive map" of the environment using specialised "place cells," work that won a Nobel Prize. Damage to both hippocampi causes anterograde amnesia — the inability to form new long-term memories while older memories and skills remain, as in the famous patient H.M. It is one of the few brain regions where new neurons are generated in adulthood, and it is among the first areas to deteriorate in Alzheimer's disease, which is why early symptoms are memory loss.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-myelin',
    title: 'What Myelin Is',
    category: 'Neuroscience',
    keywords: [
      'what is myelin', 'myelin sheath axon insulation', 'nodes of ranvier saltatory conduction', 'oligodendrocytes schwann cells',
      'why does myelin speed up nerve signals', 'demyelination multiple sclerosis', 'white matter myelin',
    ],
    content: `Myelin is a fatty (lipid-rich) substance that forms an insulating sheath wrapped in many layers around the axons of neurons, like the plastic coating on an electrical wire. It is produced by glial cells: oligodendrocytes in the brain and spinal cord (each wrapping segments of several axons), and Schwann cells in the peripheral nerves (one per segment). The sheath is not continuous — there are small bare gaps called nodes of Ranvier spaced along the axon. Because the insulated stretches don't leak current, the electrical signal effectively jumps from node to node ("saltatory conduction"), which makes conduction up to about 100 times faster than in an unmyelinated axon and much more energy-efficient. Myelinated axons in bulk form the brain's "white matter." When myelin is damaged (demyelination) — as in multiple sclerosis, where the immune system attacks it — signals slow down, become unreliable, or fail, causing weakness, numbness, vision problems and coordination loss.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-vagus-nerve',
    title: 'What the Vagus Nerve Is',
    category: 'Neuroscience',
    keywords: [
      'what is the vagus nerve', 'tenth cranial nerve vagus', 'vagus nerve parasympathetic heart digestion', 'vagal tone',
      'vagus nerve afferent sensory fibers gut brain', 'vagus nerve stimulation epilepsy depression', 'why is it called vagus',
    ],
    content: `The vagus nerve is the tenth cranial nerve and the longest nerve of the autonomic nervous system — its name means "wandering," because it travels from the brainstem down through the neck and chest into the abdomen, branching to the larynx, heart, lungs, stomach and most of the intestines. It is the principal nerve of the parasympathetic ("rest and digest") system: it slows the heart rate, lowers blood pressure, stimulates digestive secretions and gut movement, and controls the vocal cords and swallowing. Importantly, about 80% of its fibres run the other way — they are sensory (afferent), carrying constant information from the internal organs up to the brain about heart rhythm, lung stretch, stomach fullness, and inflammation, a major channel of the "gut–brain axis." "Vagal tone" is a measure of parasympathetic activity, often estimated from heart-rate variability. Electrical vagus nerve stimulation via an implanted device is an approved treatment for hard-to-control epilepsy and depression.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-limbic-system',
    title: 'What the Limbic System Is',
    category: 'Neuroscience',
    keywords: [
      'what is the limbic system', 'emotional brain structures', 'amygdala hippocampus hypothalamus limbic', 'cingulate gyrus limbic system',
      'limbic system emotion memory motivation', 'where is the limbic system located', 'papez circuit',
    ],
    content: `The limbic system is a group of interconnected structures sitting on the inner edge of the cerebrum, wrapped around the top of the brainstem, that together handle emotion, motivation, memory, and some hormonal and autonomic control. It is sometimes loosely called the "emotional brain." Its core components: the amygdala (detecting threat and assigning emotional significance, driving fear and the fight-or-flight response); the hippocampus (forming new long-term memories); the hypothalamus (basic drives — hunger, thirst, temperature, sex — plus hormone release and autonomic control); the cingulate gyrus (linking emotion to behaviour, pain, attention); and parts of the thalamus. These regions are heavily interconnected (the "Papez circuit") and tie emotional states to memories, which is why emotionally charged events are remembered vividly. The limbic system is central to the stress response, reward and addiction, mood disorders, and PTSD. (It is a functional grouping; neuroscientists debate its exact boundaries.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-causes-a-seizure',
    title: 'What Causes a Seizure',
    category: 'Neuroscience',
    keywords: [
      'what causes a seizure', 'abnormal electrical activity brain seizure', 'epilepsy vs provoked seizure', 'febrile seizure children',
      'seizure triggers low blood sugar alcohol withdrawal', 'tonic-clonic absence seizure', 'what is status epilepticus',
    ],
    content: `A seizure is a sudden episode of abnormal, excessive, and synchronised electrical activity in a group of brain neurons that normally fire in a controlled, staggered way. When this hypersynchronous firing stays local, the person may have altered sensation, a strange smell or taste, twitching in one limb, or a brief lapse of awareness (a "focal" or "absence" seizure); when it spreads across both hemispheres it produces a generalised tonic-clonic seizure with loss of consciousness, stiffening and rhythmic jerking. Causes fall into two groups. EPILEPSY is a tendency toward recurrent unprovoked seizures, arising from genetic factors, developmental brain differences, or scarring from a past stroke, tumour, infection or head injury. PROVOKED seizures are one-off events triggered by a temporary insult: high fever in young children (febrile seizures), very low blood sugar or sodium, alcohol or benzodiazepine withdrawal, severe sleep deprivation, certain drugs or drug toxicity, brain infection (meningitis, encephalitis), or eclampsia in pregnancy. A seizure lasting more than five minutes (status epilepticus) is a medical emergency.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-nervous-system-overview',
    title: 'What the Nervous System Is',
    category: 'Neuroscience',
    keywords: [
      'what is the nervous system', 'central vs peripheral nervous system', 'somatic vs autonomic nervous system',
      'sympathetic parasympathetic enteric', 'how is the nervous system organized', 'what does the nervous system do',
    ],
    content: `The nervous system is the body's rapid communication and control network — it senses what is happening inside and outside the body, processes that information, and coordinates responses. It has two main divisions. The CENTRAL nervous system (CNS) is the brain and spinal cord; it integrates incoming information and issues commands. The PERIPHERAL nervous system (PNS) is all the nerves branching out from the CNS to the rest of the body, and it splits into: the SOMATIC nervous system, which carries sensation from the skin, muscles and joints inward and drives voluntary movement of skeletal muscle outward; and the AUTONOMIC nervous system, which runs involuntary functions. The autonomic system itself has three parts: the SYMPATHETIC branch ("fight or flight," speeds the heart, dilates pupils, diverts blood to muscles), the PARASYMPATHETIC branch ("rest and digest," largely via the vagus nerve, slows the heart and promotes digestion), and the ENTERIC nervous system, a large network in the gut wall that can operate on its own. The whole system is built from neurons that signal via electrical action potentials and chemical neurotransmitters, supported by far more numerous glial cells.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-serotonin',
    title: 'What Serotonin Does',
    category: 'Neuroscience',
    keywords: [
      'what does serotonin do', 'serotonin mood sleep appetite', 'serotonin in the gut', 'ssri how serotonin works',
      'serotonin made from tryptophan', 'is serotonin the happiness chemical', 'serotonin and digestion',
    ],
    content: `Serotonin (5-HT) is a signalling molecule the body makes from the amino acid tryptophan. In the brain it is involved in regulating mood, anxiety, sleep and the sleep-wake cycle (it is a precursor of melatonin), appetite and satiety, impulse control, and body temperature — but it is an oversimplification to call it "the happiness chemical," since its role is more about modulating and stabilising these systems than producing pleasure. Antidepressants called SSRIs work by blocking serotonin's reabsorption into neurons, raising its level in the synapse. Strikingly, about 90% of the body's serotonin is not in the brain at all but in the gut, where it regulates intestinal movement and secretion; blood platelets also store it and release it to help clotting and to constrict blood vessels. Excess serotonin, usually from combining serotonergic drugs, causes a dangerous condition called serotonin syndrome (agitation, high temperature, rapid heart rate, tremor).`,
    createdAt: Date.now(),
  },
];
