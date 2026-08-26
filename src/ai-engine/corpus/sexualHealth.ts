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
];
