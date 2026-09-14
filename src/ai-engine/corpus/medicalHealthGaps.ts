import { KnowledgeItem } from '../../types';

// Batch 282 corpus fixes — medical/health/psychology topics. 7/25 misses. A real factual error
// (shark teeth described as cartilage — shark SKELETONS are cartilage, but teeth are a hard,
// mineralized dentin/enameloid material, not soft cartilage at all) plus several complete dodges
// where only one side of the comparison ever got defined (vaccine without ever explaining
// "antibody"; optometrist/ophthalmologist and paramedic/EMT both answered with trivia dumps that
// never actually contrasted the two terms; NP vs PA answered about physicians vs NP instead of the
// actually-asked NP vs PA).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'health',
  keywords,
  content,
  createdAt: now,
});

export const MEDICAL_HEALTH_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-med-shark-tooth-vs-human-tooth-correction',
    'Shark tooth vs human tooth (correcting a cartilage error)',
    ['shark tooth', 'human tooth', 'difference shark tooth human tooth', 'are shark teeth cartilage'],
    "Correcting a common mix-up: shark teeth are NOT cartilage — a shark's SKELETON is made of cartilage (which is why shark teeth are often the only part of a shark that fossilizes, since cartilage rarely does), but the teeth themselves are made of a hard, mineralized dentin core covered in an enamel-like substance called enameloid, similar in hardness to human tooth enamel. The real differences: shark teeth are triangular, serrated, and designed purely for cutting/tearing (they're also constantly replaced throughout a shark's life — sharks can go through tens of thousands of teeth), while human teeth come in different specialized shapes (incisors, canines, molars) for cutting, tearing, AND grinding food, and humans only get two sets in a lifetime (baby teeth, then permanent adult teeth) rather than continuous replacement.",
  ),
  k(
    'kb-gap-med-vaccine-vs-antibody',
    'Vaccine vs antibody',
    ['vaccine', 'antibody', 'difference vaccine antibody'],
    "A vaccine is a substance given to TRAIN your immune system to recognize a specific virus or bacteria (using a weakened, inactivated, or partial version of it, or genetic instructions for making a piece of it) — it teaches your body what to look out for, before you ever get sick from the real thing. An antibody is a Y-shaped protein your immune system actually PRODUCES in response to a threat — either after getting a vaccine, or after fighting off a real infection — that specifically recognizes and attaches to that particular virus or bacteria to help neutralize it and flag it for destruction by other immune cells. In short: a vaccine is the training tool/trigger; an antibody is the actual defensive protein your body manufactures as a result of that training (or a real infection) to fight off the specific threat.",
  ),
  k(
    'kb-gap-med-optometrist-vs-ophthalmologist',
    'Optometrist vs ophthalmologist',
    ['optometrist', 'ophthalmologist', 'difference optometrist ophthalmologist'],
    "An optometrist is a doctor of optometry (OD) — trained to perform routine eye exams, test vision, prescribe glasses and contact lenses, and detect common eye conditions, but they are NOT medical doctors and generally cannot perform eye surgery. An ophthalmologist is a full medical doctor (MD or DO) who specializes in eye care — they can do everything an optometrist does, PLUS diagnose and treat complex eye diseases, prescribe a much wider range of medications, and perform eye surgery (like cataract removal or LASIK). The simplest way to remember it: an optometrist handles routine vision care and basic eye exams; an ophthalmologist is a surgeon and medical specialist for more serious eye diseases and conditions requiring surgery or advanced medical treatment.",
  ),
  k(
    'kb-gap-med-paramedic-vs-emt',
    'Paramedic vs EMT',
    ['paramedic', 'emt', 'emergency medical technician', 'difference paramedic emt'],
    "An EMT (Emergency Medical Technician) has a shorter training program (often just a few months) and provides basic life support — things like CPR, controlling bleeding, splinting, administering oxygen, and basic first aid, but with a limited scope of medications and procedures they're allowed to perform. A paramedic has significantly more extensive training (often a year or more, sometimes an associate's degree) and provides ADVANCED life support — paramedics can administer a much wider range of medications, start IVs, perform advanced airway procedures (like intubation), read EKGs, and provide more complex emergency medical interventions in the field. In short: every paramedic could work as an EMT, but not every EMT has the advanced training to work as a paramedic — a paramedic is essentially an EMT with significantly more advanced medical training and a much broader scope of practice.",
  ),
  k(
    'kb-gap-med-np-vs-pa',
    'Nurse practitioner vs physician assistant',
    ['nurse practitioner', 'physician assistant', 'difference np pa'],
    "A nurse practitioner (NP) is an advanced practice registered nurse — they start their training within the NURSING field (typically a BSN, clinical nursing experience, then a master's or doctoral degree in nursing), and their approach tends to be rooted in nursing's more holistic, patient-centered care model. A physician assistant (PA) trains within a MEDICAL, physician-modeled education program (a master's-level PA program closely mirroring medical school's structure, though shorter), and their training and approach are modeled more directly on the physician/medical model. Both NPs and PAs can diagnose conditions, prescribe medications, and treat patients, often working closely with or under physician supervision (exact rules vary by state/country) — the core difference is which educational track and professional philosophy they come from: nursing-based and more autonomous by training (NP) versus medicine-based and physician-collaborative by training (PA), not a difference in what they're allowed to actually do day-to-day, which is quite similar between the two.",
  ),
  k(
    'kb-gap-med-ocd-vs-perfectionist',
    'OCD vs being a perfectionist',
    ['ocd', 'perfectionist', 'perfectionism', 'difference ocd perfectionist'],
    "OCD (Obsessive-Compulsive Disorder) involves unwanted, intrusive thoughts (obsessions) that cause significant anxiety or distress, which the person then tries to relieve through repetitive behaviors or mental rituals (compulsions) — like washing hands repeatedly due to a fear of contamination, or checking locks over and over due to an intrusive fear of a break-in. These behaviors are often illogical even to the person doing them, and not doing them causes real, disruptive anxiety. Being a perfectionist is a personality trait, not a mental health disorder — a perfectionist holds very high personal standards and wants things done correctly or excellently, which can cause stress, but it isn't driven by irrational, intrusive fears, and a perfectionist can usually still function normally and let go of imperfection when necessary, even if it's uncomfortable. The key difference: OCD involves genuinely irrational, anxiety-driven obsessions and compulsions that significantly disrupt daily life, while perfectionism is a high-standards personality trait that, while sometimes stressful, doesn't involve the same irrational fear-driven rituals.",
  ),
  k(
    'kb-gap-med-autism-vs-social-anxiety',
    'Autism vs social anxiety',
    ['autism', 'social anxiety', 'difference autism social anxiety'],
    "Autism is a neurodevelopmental condition present from early childhood — it involves differences in how someone processes social communication (like reading facial expressions, understanding unspoken social cues, or engaging in typical back-and-forth conversation), often alongside repetitive behaviors, intense specific interests, and a preference for routine and predictability. These traits are lifelong and rooted in how the brain develops, not caused by fear of judgment. Social anxiety (social anxiety disorder) is a specific type of anxiety disorder centered on an intense FEAR of being judged, embarrassed, or negatively evaluated by others in social situations — someone with social anxiety typically understands social cues just fine, they're simply afraid of how others will perceive them, which can cause them to avoid social situations altogether. The key difference: autism involves genuine differences in how social information is processed and communicated (not fear-based), while social anxiety involves normal social understanding paired with an intense fear of judgment or embarrassment in social settings. The two CAN co-occur in the same person, but they are distinct conditions with different underlying causes.",
  ),
];
