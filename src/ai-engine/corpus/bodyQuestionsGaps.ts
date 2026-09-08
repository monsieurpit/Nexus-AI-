import { KnowledgeItem } from '../../types';

// Common "why does the body do X" questions that fell through to web search and got garbage
// (the sneeze query pasted a Wikipedia article about a pizza meme because the source blog was
// called "The Sneeze"). Short, direct, keyword-dense.
export const BODY_QUESTIONS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-why-sneeze',
    title: 'Why We Sneeze',
    category: 'Human Body',
    keywords: ['why do we sneeze', 'what causes sneezing', 'why does sneezing happen', 'sneeze reflex', 'why do i sneeze in sunlight', 'photic sneeze reflex'],
    content: `A sneeze is a fast, involuntary burst of air from the nose and mouth that clears irritants out of the nasal passages. It's triggered when the lining of the nose is irritated by things like dust, pollen, pepper, a cold or allergy, a sudden temperature change, or bright light. Nerve endings in the nose send a signal to the "sneeze centre" in the brainstem, which fires off a coordinated sequence: a deep breath in, the throat closes, chest and abdominal muscles contract hard, then the air is released explosively (up to ~150 km/h) to blow the irritant out. About 1 in 4 people have the "photic sneeze reflex" — sneezing when they suddenly look at a bright light — an inherited quirk where the pupil-constriction signal seems to cross wires with the sneeze signal. You can't keep your eyes open during a sneeze (the reflex closes them), but sneezing will not make your eyes pop out.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-why-fingerprints',
    title: 'Why We Have Fingerprints',
    category: 'Human Body',
    keywords: ['why do we have fingerprints', 'what are fingerprints for', 'purpose of fingerprints', 'why do humans have fingerprints', 'are fingerprints unique', 'do twins have the same fingerprints'],
    content: `Fingerprints are the raised friction ridges of skin on the fingertips (and palms and soles). They form before birth, between about weeks 10 and 24 of pregnancy, from the way the skin layers grow and buckle — which is why even identical twins, who share DNA, have different fingerprints, and why yours are unique. Their function is still debated, but the leading ideas are: improving grip on smooth or wet objects by channelling away water and increasing friction in some conditions, and boosting the sense of touch — the ridges amplify tiny vibrations as your finger moves across a surface, which the touch receptors under the skin can detect, helping you feel fine texture. Fingerprints regrow in the same pattern if the skin is only superficially damaged, because the pattern is set in the deeper (dermal) layer. They became a forensic identification tool in the late 1800s because they are both unique and (mostly) permanent.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-why-blush-laugh-cry',
    title: 'Why We Blush, Cry, Laugh, and Itch',
    category: 'Human Body',
    keywords: [
      'why do we blush', 'what causes blushing', 'why do we cry', 'why do we cry when sad', 'why do we laugh',
      'what makes us laugh', 'why do we itch', 'what causes itching', 'why do we get emotional tears',
    ],
    content: `Blushing: strong emotion (embarrassment, shame, being the centre of attention) triggers a stress response that widens the small blood vessels in the face, so more blood shows through the thin facial skin. It's thought to be a genuine social signal that says "I know I broke a norm" and tends to make others more forgiving. Crying: humans are the only animal that sheds emotional tears. Emotional tears contain more stress hormones and painkilling chemicals than ordinary tears, so crying may physically release stress; it also strongly signals distress and pulls others toward comforting you. Laughing: originally an "it's okay, this is play, not a threat" signal in social apes; in humans it's mostly social (people laugh far more in company than alone) and is triggered by surprise, a broken expectation delivered safely, or tickling. Itching: a specific set of nerve fibres detects light contact, chemicals (like histamine released in an allergic reaction or an insect bite), or dry/irritated skin, and produces the urge to scratch — which evolved to remove insects, parasites and irritants from the skin. Scratching briefly overrides the itch signal with a mild pain signal, which is why it feels good but can make the itch worse afterward.`,
    createdAt: Date.now(),
  },
];
