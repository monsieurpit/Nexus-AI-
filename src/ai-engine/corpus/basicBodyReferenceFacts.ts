import { KnowledgeItem } from '../../types';

export const BASIC_BODY_REFERENCE_FACTS_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-body-bone-count',
    title: 'How Many Bones Are in the Human Body?',
    category: 'human-biology',
    keywords: ['how many bones in the human body', 'human bone count', 'how many bones in a hand', 'how many bones in the skull', 'babies bones vs adults'],
    content: `An adult human body has **206 bones**. Interestingly, babies are actually born with more — around **270 bones** — many of which are made of soft, flexible cartilage rather than hard bone at birth. As a baby grows, many of these separate bones and cartilage pieces gradually fuse together into single, larger bones by adulthood (for example, the skull starts as several separate plates connected by soft, flexible joints called fontanelles or "soft spots," which close and fuse over the first couple of years of life; parts of the spine and pelvis fuse similarly over childhood and adolescence). Distribution in an adult: the hands alone contain 27 bones each (54 total for both hands, roughly a quarter of all bones in the body), the feet contain 26 bones each, and the skull has 22 bones (8 cranial + 14 facial). The smallest bone in the human body is the stapes, located in the middle ear, roughly the size of a grain of rice — the largest is the femur (thigh bone).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-body-heart-chambers-valves',
    title: 'How Many Chambers and Valves Does the Human Heart Have?',
    category: 'human-biology',
    keywords: ['how many chambers in the heart', 'heart chambers', 'how many valves in the heart', 'heart valves', 'atria ventricles'],
    content: `The human heart has **4 chambers**: two upper chambers called atria (left atrium and right atrium) and two lower chambers called ventricles (left ventricle and right ventricle). Deoxygenated blood returning from the body enters the right atrium, flows to the right ventricle, and gets pumped to the lungs to pick up oxygen; oxygenated blood returns to the left atrium, flows to the left ventricle, and gets pumped out to the rest of the body — the left ventricle has the thickest, most muscular walls since it has to generate enough pressure to push blood through the entire body. The heart also has **4 valves** that keep blood flowing in one direction and prevent backflow: the tricuspid valve and pulmonary valve on the right side, and the mitral valve and aortic valve on the left side. The "lub-dub" sound of a heartbeat heard through a stethoscope is literally the sound of these valves snapping shut in sequence.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-body-chromosomes-teeth-muscles',
    title: 'Human Chromosome, Teeth, and Muscle Counts',
    category: 'human-biology',
    keywords: ['how many chromosomes do humans have', 'human chromosome count', 'how many teeth does an adult have', 'adult teeth count', 'how many muscles in the human body'],
    content: `**Chromosomes**: Humans have **46 chromosomes** total, arranged in 23 pairs — one chromosome in each pair inherited from each biological parent. 22 of these pairs are called "autosomes" (non-sex chromosomes) and one pair determines biological sex (XX typically develops as female, XY typically develops as male). **Teeth**: A full set of adult (permanent) human teeth is **32 teeth** — 8 incisors, 4 canines, 8 premolars, and 12 molars (including the 4 "wisdom teeth," which many people have removed since modern jaws often don't have room for them). Children have a smaller set of 20 "baby teeth" (primary/deciduous teeth) that fall out and are replaced by the permanent set, usually starting around age 6 and finishing (aside from wisdom teeth) by the early teens. **Muscles**: The human body has roughly **600 skeletal muscles** (estimates commonly range from 600-840 depending on how you count small or connected muscle groups), making up about 40% of total body weight in an average adult. The smallest muscle in the body is the stapedius, in the middle ear; the largest is the gluteus maximus (buttocks).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-body-bmi-calculation',
    title: 'How to Calculate BMI (Body Mass Index)',
    category: 'human-biology',
    keywords: ['how to calculate bmi', 'bmi formula', 'body mass index calculation', 'what is a normal bmi'],
    content: `BMI (Body Mass Index) is calculated as: **weight in kilograms ÷ (height in meters)²**. For example, someone who weighs 70 kg and is 1.75 m tall: 70 ÷ (1.75 × 1.75) = 70 ÷ 3.0625 ≈ **22.9**. Using pounds and inches (US units), the formula is: (weight in pounds ÷ (height in inches)²) × 703. Standard BMI categories used by health organizations: below 18.5 = underweight, 18.5-24.9 = "normal"/healthy weight, 25-29.9 = overweight, 30+ = obese. It's important to understand BMI's real limitations, not just its formula: it doesn't distinguish muscle mass from fat mass (which is why very muscular athletes often register as "overweight" or "obese" by BMI despite having low body fat), doesn't account for where fat is distributed on the body (which matters more for health risk than total amount), and doesn't factor in age, sex, or bone density differences between individuals. It remains widely used as a fast, cheap population-level screening tool precisely because it only requires a scale and a tape measure, but health professionals generally treat it as one rough data point among several, not a definitive individual health verdict.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-body-target-heart-rate',
    title: 'How to Calculate Your Target Heart Rate for Exercise',
    category: 'human-biology',
    keywords: ['how to calculate target heart rate', 'max heart rate formula', 'target heart rate zone', '220 minus age'],
    content: `The most common quick estimate for maximum heart rate is: **220 − your age** (in beats per minute). For example, a 30-year-old's estimated max heart rate would be 220 − 30 = 190 bpm. This is a simplified population-average formula, not a precise individual measurement — actual max heart rate varies meaningfully between individuals of the same age, and more accurate formulas (like the Tanaka formula: 208 − 0.7 × age) exist and are considered somewhat more accurate by exercise scientists, though "220 minus age" remains the most widely taught and used shortcut. From your estimated max, target heart rate zones for exercise are usually expressed as a percentage range: moderate-intensity exercise is generally 50-70% of max heart rate, and vigorous-intensity exercise is roughly 70-85% of max heart rate. For the 30-year-old example above (max ≈190), a moderate-intensity target zone would be roughly 95-133 bpm, and vigorous would be roughly 133-162 bpm. These are general guidelines, not medical prescriptions — people with heart conditions or starting a new exercise program are generally advised to check with a doctor rather than rely solely on a generic age-based formula.`,
    createdAt: Date.now(),
  },
];
