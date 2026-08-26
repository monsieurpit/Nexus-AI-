import { KnowledgeItem } from '../../types';

export const SEXUAL_HEALTH_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-sexualhealth-contraception-basics',
    title: 'Contraception Basics: How the Common Methods Actually Work',
    category: 'Health & Medicine',
    keywords: [
      'birth control', 'contraception', 'condoms effectiveness', 'the pill', 'iud', 'plan b',
      'morning after pill', 'contraception basics', 'how effective is birth control',
    ],
    content: `Condoms (external/male and internal/female) are the only common contraceptive method that also reduces STI transmission risk, since they form a physical barrier — with typical use (accounting for real-world inconsistent/incorrect use) they're roughly 87% effective at preventing pregnancy over a year, versus about 98% with perfect use every time. Hormonal methods (the pill, the patch, the vaginal ring) prevent pregnancy mainly by stopping ovulation, and are highly effective with perfect use (over 99%) but drop to around 91-93% typical-use effectiveness since they require daily/weekly/monthly consistency — missing pills is the most common real-world failure point. IUDs (intrauterine devices, hormonal or copper) and implants are "long-acting reversible contraceptives" (LARCs) — over 99% effective, because once placed by a provider there's no daily user action required, removing the human-error factor that lowers typical-use rates for the pill. Emergency contraception ("Plan B"/the morning-after pill) works primarily by delaying or preventing ovulation — it is NOT the same as a medication abortion pill and does not end an existing pregnancy — and is most effective the sooner it's taken after unprotected sex, with reduced effectiveness the longer you wait (generally within 72-120 hours depending on the specific product). No method except abstinence is 100% effective, and combining methods (e.g., condoms plus a hormonal method) stacks their protection and is commonly recommended when both pregnancy prevention and STI protection matter. Effectiveness rates and availability vary by product and country — this is general information, not medical advice for a specific situation.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-sexualhealth-sti-basics',
    title: 'STI Basics: Testing, Common Infections, and Why Screening Matters',
    category: 'Health & Medicine',
    keywords: [
      'sti testing', 'std testing', 'chlamydia', 'gonorrhea', 'herpes', 'hpv', 'hiv testing',
      'how often should i get tested', 'sti symptoms', 'sexual health testing',
    ],
    content: `Many STIs are frequently asymptomatic, especially early on — chlamydia and gonorrhea in particular often cause no noticeable symptoms, which is exactly why routine screening (not just testing when symptoms appear) matters for anyone sexually active with new or multiple partners; general guidance from health organizations like the CDC commonly recommends annual testing for sexually active people under 25, or more frequently with new partners, though exact recommendations vary by individual risk factors and should come from a real provider. Chlamydia and gonorrhea are both bacterial and curable with antibiotics if caught. HPV (human papillomavirus) is extremely common — most sexually active people will contract some strain in their lifetime — most infections clear on their own, but certain high-risk strains are linked to cervical and other cancers, which is why the HPV vaccine (recommended before or during early sexual activity, though it can still provide protection later) and routine cervical screening (Pap smears) matter. Herpes (HSV-1, commonly oral; HSV-2, commonly genital, though either type can occur in either location) is a lifelong viral infection managed with antiviral medication to reduce outbreaks and transmission risk, not curable, but very manageable and not inherently dangerous to long-term health. HIV testing is a standard part of comprehensive STI screening — modern antiretroviral treatment allows people living with HIV to live long, healthy lives and, with sustained undetectable viral load, does not transmit the virus to partners (the "Undetectable = Untransmittable"/U=U consensus, well-supported by large clinical studies). Getting tested regularly and talking about testing status with partners is normal, responsible practice, not something to be embarrassed about.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-sexualhealth-consent-communication',
    title: 'Consent and Communication: The Actual Basics',
    category: 'Health & Medicine',
    keywords: [
      'what is consent', 'enthusiastic consent', 'how to talk about boundaries', 'consent basics',
      'sexual communication', 'safe words', 'checking in during sex',
    ],
    content: `Consent is an ongoing, freely-given, specific agreement — not a one-time checkbox. It can be withdrawn at any point, even mid-activity, and a "yes" to one thing isn't a "yes" to everything else. It can't be freely given under pressure, manipulation, or when someone is incapacitated (heavily intoxicated, asleep, etc.) regardless of what they might have agreed to earlier while sober. "Enthusiastic consent" (looking for an active, willing "yes" rather than just the absence of a "no") is widely taught as the healthier standard over a purely "no means no" framework, since silence, freezing, or not resisting isn't the same as agreement. Practically, checking in doesn't have to be clinical or awkward — a simple "is this good?" or "you good?" normalizes ongoing communication rather than assuming. Discussing boundaries, preferences, and any limits BEFORE things get physical (not mid-activity) tends to lead to better experiences for everyone involved and avoids miscommunication in the moment. A "safe word" (a plain, unambiguous word unrelated to normal activity, used especially in contexts where "no" or "stop" might otherwise be part of the scene) is a common practical tool for instantly and unambiguously communicating a desire to pause or stop. None of this requires being unromantic or clinical — good communication is consistently reported as making experiences better, not more awkward, once people get past the initial discomfort of talking about it directly.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-sexualhealth-common-myths',
    title: 'Common Sex Myths, Debunked',
    category: 'Health & Medicine',
    keywords: [
      'sex myths', 'can you get pregnant on your period', 'pull out method effectiveness', 'sex myths debunked',
      'douching myth', 'virginity myth',
    ],
    content: `You CAN get pregnant during your period, though it's less likely — sperm can survive in the reproductive tract for up to 5 days, and cycle length/ovulation timing varies enough between people (and month to month) that "safe" days aren't as safe as commonly assumed. The "pull out method" (withdrawal) is a real contraceptive method but a poor one on its own — typical-use effectiveness is only around 78%, both because pre-ejaculate can contain sperm and because it requires precise timing/self-control under pressure. Douching (rinsing the vagina with water or a cleaning product) is not medically necessary and can actually disrupt the vagina's natural, self-cleaning bacterial balance, increasing infection risk — major health organizations generally advise against it. "Virginity" isn't a coherent medical concept — there's no reliable physical test for it, the hymen varies hugely between individuals and can stretch or wear from many non-sexual activities, and "losing it" is a social/personal construct, not a biological marker. Penis size has a well-documented weak correlation with partner sexual satisfaction in actual research — communication, comfort, and technique are consistently rated as more important factors. Libido (sex drive) naturally fluctuates for everyone due to stress, health, hormones, medication, and relationship dynamics — a temporary change isn't automatically a sign something is deeply wrong, though a sustained, distressing change is worth discussing with a doctor.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-sexualhealth-pregnancy-family-planning',
    title: 'Pregnancy and Family Planning Basics',
    category: 'Health & Medicine',
    keywords: [
      'signs of pregnancy', 'pregnancy test accuracy', 'when to take a pregnancy test', 'family planning',
      'ovulation basics', 'fertility window', 'pregnancy basics', 'how to get pregnant', 'trying to conceive',
      'how to conceive', 'tips to get pregnant',
    ],
    content: `A typical menstrual cycle is about 28 days (though a normal range is roughly 21-35 days and varies person to person), with ovulation — the release of an egg, and the point of peak fertility — usually occurring around 12-14 days before the NEXT period starts, not a fixed "day 14" for everyone, which is why cycle-tracking for either conception or avoidance requires knowing your own actual cycle length rather than a generic number. The fertile window is roughly 5-6 days per cycle (the days leading up to and including ovulation, since sperm can survive several days waiting for an egg), which is also why "safe day" calculations are less reliable than commonly assumed. For people actively trying to conceive, the most consistently cited practical guidance is having unprotected sex every 1-2 days throughout the fertile window (not just on one guessed "peak" day) — this keeps sperm consistently present so an egg is likely to encounter them whenever ovulation actually happens, since ovulation timing can shift slightly cycle to cycle. Ovulation predictor kits (which detect the LH hormone surge that precedes ovulation by about 24-36 hours) and basal body temperature tracking (a slight rise after ovulation has already happened) are common tools for narrowing down the fertile window more precisely than calendar math alone. General fertility basics that help conception odds: maintaining a healthy weight, not smoking, limiting alcohol, and starting a prenatal vitamin with folic acid before conception (folic acid specifically reduces the risk of certain birth defects and needs to be on board early, before many people even know they're pregnant). Most healthy couples under 35 conceive within about a year of regularly trying; it's generally recommended to see a doctor about fertility evaluation after 12 months of trying without success (or 6 months if the person trying to carry is over 35), not as a sign anything is necessarily wrong, just because time-to-conceive varies normally and a checkup helps identify any addressable factor early. Home pregnancy tests detect hCG (a hormone produced after a fertilized egg implants) in urine, and are generally most accurate starting from the first day of a missed period — testing too early can produce a false negative even in a real pregnancy, since hCG needs time to build up to detectable levels. Early pregnancy symptoms (missed period, nausea, breast tenderness, fatigue) overlap heavily with normal PMS symptoms, which is why a missed period plus a positive test — not symptoms alone — is the reliable signal. "Family planning" broadly covers the full range of choices around if/when to have children, including contraception, fertility awareness, and reproductive healthcare access — it's a normal, practical part of relationship planning to discuss with a partner, not just a medical topic.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-sexualhealth-orientation-identity',
    title: 'Sexual Orientation and Gender Identity: The Actual Basics',
    category: 'Health & Medicine',
    keywords: [
      'sexual orientation basics', 'what does lgbtq mean', 'gender identity vs sexual orientation',
      'coming out', 'bisexual pansexual difference', 'nonbinary basics', 'lgbtq basics',
    ],
    content: `Sexual orientation (who you're romantically/sexually attracted to) and gender identity (your own internal sense of being male, female, both, neither, or something else) are separate concepts, commonly confused but independent — a transgender person can be straight, gay, bisexual, or any other orientation, exactly like a cisgender (non-transgender) person can. LGBTQ+ is a common umbrella abbreviation: lesbian, gay, bisexual, transgender, queer/questioning, with the + covering other identities (intersex, asexual, pansexual, and more) not spelled out in the acronym itself. Bisexual (attraction to more than one gender) and pansexual (attraction regardless of gender) are related but distinct self-identified labels — many people use them somewhat interchangeably, and the "correct" one for any individual is simply whichever they identify with, not a rule imposed from outside. Nonbinary describes a gender identity outside the male/female binary — some nonbinary people use they/them pronouns, others use different pronouns entirely, and asking someone's pronouns (rather than assuming) is now widely normalized, low-stakes basic etiquette, not an imposition. "Coming out" (disclosing one's orientation or gender identity to others) is a personal, often ongoing process rather than a single one-time event — different people are "out" to different degrees in different parts of their life (family vs. work vs. friends), and that's a normal, common pattern, not something to be treated as inconsistent or dishonest. None of these are new or rare — LGBTQ+ people and these vocabulary terms exist across every culture and era of recorded history, even when terminology and social visibility have varied.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-sexualhealth-arousal-anatomy',
    title: 'Arousal and Anatomy Basics: How the Body Actually Responds',
    category: 'Health & Medicine',
    keywords: [
      'arousal basics', 'how does arousal work', 'clitoris anatomy', 'erection process', 'arousal non-concordance',
      'sexual response cycle', 'anatomy basics sex',
    ],
    content: `The clitoris is a far larger internal structure than the small external tip most people picture — the visible glans is just the outermost part of a structure that extends internally along both sides of the vaginal opening, and it's the single most nerve-dense structure involved in sexual pleasure (widely cited estimates put it around 8,000+ nerve endings, though exact figures vary by study), which is a big part of why direct external stimulation matters so much for many people with vulvas, not something secondary to penetration. Erections happen when arousal signals trigger increased blood flow into the penis's spongy erectile tissue while restricting outflow, temporarily engorging it — this is a vascular/neurological process, which is why stress, certain medications, alcohol, and cardiovascular health all measurably affect it, not just "being in the mood." The traditional sexual response cycle (excitement, plateau, orgasm, resolution) is a useful rough map but not a strict, identical sequence everyone follows — modern sex research emphasizes "arousal non-concordance," the well-documented finding that physical signs of arousal (like lubrication or erection) don't always match subjective, felt desire, and vice versa — meaning physical response alone isn't a reliable indicator of enthusiasm or consent, communication still matters regardless of what the body is visibly doing. Arousal also isn't binary or instant for most people — "responsive desire" (arousal that builds once activity has already started, rather than a spontaneous urge beforehand) is a completely normal, common pattern, especially reported in longer-term relationships, not a sign anything is wrong.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-sexualhealth-masturbation-facts',
    title: 'Masturbation: Facts, Health Effects, and Common Myths',
    category: 'Health & Medicine',
    keywords: [
      'masturbation facts', 'is masturbation healthy', 'masturbation myths', 'how often is normal masturbation',
      'masturbation benefits', 'nofap facts',
    ],
    content: `Masturbation is a normal, common, medically unremarkable behavior across genders and ages — surveys consistently find a large majority of people masturbate at some point in their lives, and frequency varies enormously between individuals with no single "normal" number; it only becomes a genuine concern if it's causing real distress, interfering with daily responsibilities, or replacing desired connection with a partner against one's own wishes, not simply because of a specific frequency. Commonly cited (and generally well-supported) effects include stress relief and improved mood (via endorphin and oxytocin release), better understanding of one's own body and what feels good (which research links to better communication and satisfaction with partners), and easier sleep onset for many people due to post-orgasm relaxation. Persistent myths worth debunking: it does not cause blindness, infertility, stunted growth, or "using up" a fixed lifetime supply of arousal or fertility — none of these have any basis in actual physiology. "NoFap"/abstinence movements make various claims (increased testosterone, confidence, motivation) that are largely not supported by controlled research beyond typical placebo/lifestyle-change effects — some people do report subjective benefits from the broader lifestyle changes often bundled with it (better sleep habits, less time on porn sites), but the abstinence itself isn't shown to cause the physiological changes often claimed. It's a private, personal topic with a lot of unnecessary shame attached historically, despite being medically unremarkable.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-sexualhealth-dysfunction-basics',
    title: 'Sexual Dysfunction Basics: When It\'s Common vs. When to See a Doctor',
    category: 'Health & Medicine',
    keywords: [
      'erectile dysfunction causes', 'painful sex causes', 'mismatched libido', 'premature ejaculation',
      'vaginismus basics', 'low libido causes', 'sexual dysfunction basics',
    ],
    content: `Erectile dysfunction (ED) becomes more common with age but is NOT an inevitable or purely age-related issue — common causes span the physical (cardiovascular disease, diabetes, low testosterone, certain medications, smoking, alcohol) and the psychological (stress, anxiety — including performance anxiety about ED itself, which can become a self-reinforcing cycle — depression, relationship issues), and since ED can be an early warning sign of cardiovascular disease specifically (poor blood flow affects the penis before it shows up as more serious cardiac symptoms in some cases), persistent ED is genuinely worth mentioning to a doctor rather than just working around it. Painful sex (dyspareunia) has many possible causes — insufficient arousal/lubrication, certain infections, endometriosis, vaginismus (involuntary tightening of vaginal muscles, often linked to anxiety or past pain, which is a real, treatable medical condition, not something "in your head" to just push through), and others — and is a legitimate reason to see a doctor rather than something to just tolerate as normal. Mismatched libido between partners is extremely common (some studies suggest it affects a majority of long-term couples at some point) and isn't automatically a sign of relationship trouble — it's generally more productive to treat it as a logistics/communication problem to solve together (scheduling, understanding each partner's arousal patterns) than as a verdict on attraction or love. Premature ejaculation is common and has several effective treatment approaches (behavioral techniques, topical treatments, medication) — like ED, it's a medical topic worth discussing with a doctor rather than a private shame to just live with.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-sexualhealth-kink-bdsm-basics',
    title: 'Kink and BDSM Basics: Safety and Consent Frameworks',
    category: 'Health & Medicine',
    keywords: [
      'bdsm basics', 'what is ssc', 'what is rack', 'aftercare bdsm', 'kink negotiation', 'safe word basics',
      'bdsm safety', 'kink basics',
    ],
    content: `BDSM is an umbrella term (bondage/discipline, dominance/submission, sadism/masochism) covering a wide range of consensual power-exchange and sensation-focused activities — like any sexual interest, engaging in it (or not) is a personal choice, and the "consensual" part is doing a lot of load-bearing work in every serious discussion of the topic. Two commonly cited safety frameworks: "SSC" (Safe, Sane, Consensual) and "RACK" (Risk-Aware Consensual Kink) — RACK is more explicit that some activities carry inherent risk that can be managed and consented to but never fully eliminated, which many practitioners consider a more honest framing than "safe" implying zero risk. Negotiation — explicitly discussing limits, interests, and boundaries BEFORE any activity, not assuming or guessing — is considered a non-negotiable basic across responsible kink communities, same underlying principle as general consent discussed elsewhere, just more detailed given the wider range of activities involved. A safe word (a plain word unrelated to the activity, since "no" or "stop" might be part of a scene) instantly and unambiguously communicates a desire to pause or stop, and its use should always be respected immediately and without argument, full stop. "Aftercare" (checking in, physical and emotional comfort — could be as simple as cuddling and talking, or more specific to what a person needs) after an intense scene is widely considered a standard, important practice, since intense activities can trigger a real emotional/physiological comedown ("drop") afterward. None of this requires any specific interest in kink to know — it's baseline safety literacy for anyone who might encounter the topic, including just to recognize genuinely unsafe practices (ignoring a safe word, no negotiation at all) as real red flags, not "just how it's done."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-sexualhealth-body-image-confidence',
    title: 'Body Image and Sexual Confidence',
    category: 'Health & Medicine',
    keywords: [
      'body image and sex', 'sexual confidence', 'insecure about body during sex', 'performance anxiety',
      'body image basics', 'how to feel more confident naked',
    ],
    content: `Body image concerns during sex are extremely common and not a sign of a "broken" relationship to intimacy — research on sexual satisfaction consistently finds that self-consciousness about appearance measurably reduces both arousal and enjoyment (it's genuinely distracting, pulling mental focus away from actual sensation and connection), which is part of why body-image work is now a standard component of sex therapy, not a separate, unrelated issue. Partners' actual perceptions are very often more forgiving/positive than the anxious person assumes — a well-documented pattern in relationship research is that people are typically far more critical of their own appearance than their partner is, and communicating insecurities directly to a trusted partner (rather than assuming they're silently judging) often reduces anxiety more than trying to fix the perceived flaw itself. Performance anxiety (worrying about "doing it right," lasting long enough, or physically responding as expected) is genuinely common across genders and directly interferes with arousal by activating a stress response that competes with the body's ability to relax into arousal — the same underlying "worrying about it makes it worse" mechanism that fuels a lot of situational ED and difficulty reaching orgasm. Practical, broadly-supported approaches: shifting focus from "performing correctly" to shared sensation and pleasure, open communication about insecurities rather than silent self-monitoring during sex, and recognizing that comparison to pornography or media is comparing reality to an edited, unrepresentative product, not a realistic benchmark.`,
    createdAt: Date.now(),
  },
];
