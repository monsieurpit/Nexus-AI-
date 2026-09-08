import { KnowledgeItem } from '../../types';

// Batch 118 (human reproduction & development) — very weak area, standard
// educational biology. Errors and web dumps on nexus-4b: "identical vs
// fraternal twins" was BACKWARDS ("fraternal twins split from a single egg");
// "three trimesters" was a non-answer about seahorses and kangaroos; "role of
// the placenta" opened with Discord permission bits; "what causes a period"
// said estrogen rising causes it and that the lining sheds at menopause;
// "miscarriage" returned a list of miscarriage-of-justice court cases;
// "embryo vs fetus", "zygote blastocyst embryo", and "IVF vs IUI" were web
// dumps; "menstrual cycle phases" rambled about the phases of the moon.
export const HUMAN_REPRODUCTION_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-identical-vs-fraternal-twins',
    title: 'Identical vs Fraternal Twins',
    category: 'Human Biology',
    keywords: [
      'what is the difference between identical and fraternal twins', 'identical monozygotic twins one egg fertilized by one sperm that then splits into two embryos share nearly 100 percent of their dna always the same sex',
      'fraternal dizygotic twins two separate eggs released in the same cycle each fertilized by a different sperm as genetically alike as ordinary siblings about 50 percent can be different sexes',
      'identical twins are not caused by heredity fraternal twinning runs in families and rises with maternal age and fertility treatment',
    ],
    content: `IDENTICAL (monozygotic) twins come from a SINGLE egg fertilized by a SINGLE sperm. The resulting embryo splits in two within the first two weeks, producing two individuals with essentially the same DNA — so identical twins are always the same sex and look strikingly alike (small differences arise later from the environment and random mutation). Monozygotic twinning happens at a roughly constant rate everywhere (~1 in 250 births) and is not inherited. FRATERNAL (dizygotic) twins come from TWO separate eggs, released in the same cycle, each fertilized by a different sperm — essentially two pregnancies at once. They share about 50% of their variable DNA, exactly like any pair of siblings, can be different sexes, and need not resemble each other. Fraternal twinning does run in families (on the mother's side, via a tendency to release more than one egg), and becomes much more common with older maternal age and with fertility treatments that stimulate the ovaries. (It is the reverse of the common mistake: it is the IDENTICAL twins that come from one egg splitting, not the fraternal.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-menstrual-cycle-phases',
    title: 'The Phases of the Menstrual Cycle',
    category: 'Human Biology',
    keywords: [
      'what happens during the menstrual cycle and what are its phases', 'menstrual phase days 1 to 5 the uterine lining sheds as a period because no pregnancy occurred and progesterone dropped',
      'follicular phase fsh stimulates ovarian follicles to grow producing rising estrogen which rebuilds and thickens the uterine lining', 'ovulation around day 14 an estrogen peak triggers an lh surge and the dominant follicle releases its egg into the fallopian tube',
      'luteal phase the empty follicle becomes the corpus luteum which makes progesterone to maintain the lining if no pregnancy it degenerates after about 12 days progesterone falls and the lining sheds',
    ],
    content: `The menstrual cycle averages about 28 days (normal range ~21-35) and has four phases, driven by hormones from the pituitary and ovaries. (1) MENSTRUAL PHASE (roughly days 1-5): the uterine lining (endometrium) is shed as a period, because the previous cycle produced no pregnancy and progesterone support collapsed. (2) FOLLICULAR PHASE (days ~1-13, overlapping menstruation): FSH from the pituitary stimulates a batch of fluid-filled ovarian follicles to grow; they secrete rising estrogen, which rebuilds and thickens the endometrium and makes cervical mucus thin and slippery. (3) OVULATION (around day 14): estrogen from the now-mature dominant follicle climbs past a threshold, flipping its feedback effect to positive and triggering a sharp surge of LH from the pituitary; ~24-36 hours later the follicle ruptures and releases its egg into the fallopian tube, where it is viable for ~12-24 hours. (4) LUTEAL PHASE (days ~15-28): the collapsed follicle becomes the corpus luteum, which secretes progesterone (plus some estrogen) to hold and mature the lining for a possible implantation. This phase is a fairly fixed ~14 days: if no pregnancy signal (hCG) arrives, the corpus luteum degenerates, progesterone and estrogen plunge, and the lining is shed — day 1 of the next cycle.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-causes-a-period',
    title: 'What Causes a Period (Why the Uterine Lining Sheds)',
    category: 'Human Biology',
    keywords: [
      'what causes a period and why does the uterine lining shed', 'a period is caused by the drop in progesterone and estrogen when the corpus luteum degenerates about 14 days after ovulation because no pregnancy occurred',
      'the withdrawal of hormonal support makes the spiral arteries in the endometrium constrict the tissue dies and detaches and the lining is shed with some blood', 'it is not caused by estrogen rising and it is not what happens at menopause',
      'hormonal contraception stops periods by keeping progesterone steady so there is no withdrawal or a pill free week creates a scheduled withdrawal bleed',
    ],
    content: `A period is a withdrawal bleed. After ovulation the corpus luteum in the ovary produces progesterone (and estrogen), and these hormones maintain the thick, blood-rich uterine lining. If the egg is not fertilized and no embryo implants, no hCG signal reaches the corpus luteum, so after about 12-14 days it degenerates and stops producing hormones. The sudden fall in progesterone and estrogen is the trigger: without hormonal support, the spiral arteries feeding the endometrium clamp shut, the outer two-thirds of the lining is starved of blood and dies, and it detaches and passes out through the cervix and vagina over several days, mixed with a relatively small amount of blood (typically 30-60 mL total). This is completely different from what happens at menopause — at menopause the ovaries run out of follicles, so ovulation and the whole cycle stop and periods end for good. (It is also not caused by estrogen "rising"; rising estrogen in the follicular phase builds the lining up.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-fsh-lh-feedback-loop',
    title: 'The FSH/LH Hormone Feedback Loop of the Menstrual Cycle',
    category: 'Human Biology',
    keywords: [
      'what is the menstrual cycle hormone feedback loop with fsh and lh', 'hypothalamus pulses gnrh pituitary releases fsh and lh fsh stimulates ovarian follicles to grow and make estrogen',
      'early low to moderate estrogen exerts negative feedback suppressing fsh and lh so only the dominant follicle survives', 'when estrogen from the mature follicle rises high and stays high for about two days the feedback flips to positive triggering a massive lh surge and ovulation',
      'after ovulation the corpus luteum makes progesterone and estrogen which resume negative feedback keeping fsh and lh low through the luteal phase then it dies and fsh rises again',
    ],
    content: `The cycle is run by a feedback loop between the brain and the ovaries. The hypothalamus releases pulses of GnRH, which makes the pituitary secrete two gonadotropins: FSH (follicle-stimulating hormone) and LH (luteinizing hormone). FSH drives a group of ovarian follicles to grow, and as they grow they produce estrogen. Here is the key twist: at low-to-moderate levels, estrogen exerts NEGATIVE feedback — it tells the pituitary to cut back FSH and LH. Falling FSH means only the single most developed ("dominant") follicle keeps growing while the others wither. But once the dominant follicle is mature, the estrogen it pours out becomes very high and stays high for about two days, and this flips the feedback to POSITIVE: the pituitary responds with a huge, brief LH surge (and a smaller FSH surge), which is what triggers ovulation. After the egg is released, the ruptured follicle becomes the corpus luteum and secretes progesterone plus estrogen; together these restore strong negative feedback, so FSH and LH stay low for the ~14-day luteal phase (preventing a second ovulation). When the corpus luteum dies, progesterone and estrogen drop, negative feedback is released, FSH climbs, and the next crop of follicles begins.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-three-trimesters',
    title: 'The Three Trimesters of Pregnancy',
    category: 'Human Biology',
    keywords: [
      'what are the three trimesters of pregnancy and what develops in each', 'pregnancy about 40 weeks counted from the first day of the last period divided into three roughly 13 week trimesters',
      'first trimester weeks 1 to 12 implantation all major organs and body systems form organogenesis most vulnerable heart starts beating highest miscarriage risk morning sickness peaks',
      'second trimester weeks 13 to 27 rapid growth movements felt around 18 to 22 weeks hearing sleep wake cycles fingerprints viability around 23 to 24 weeks with intensive care',
      'third trimester weeks 28 to 40 major weight gain rapid brain growth lungs mature with surfactant fetus settles head down',
    ],
    content: `A full-term pregnancy lasts about 40 weeks, counted (by medical convention) from the first day of the last menstrual period — so "weeks 1 and 2" are before conception even happens. It is split into three roughly 13-week trimesters. FIRST TRIMESTER (weeks 1-12): fertilization, the journey down the tube, implantation, and then organogenesis — every major organ and body system is laid down, the heart begins beating around week 5-6, limbs and facial features form, and by the end the embryo (now called a fetus) is recognizably human and about 6 cm long. This is the most vulnerable period for the developing baby and carries the highest miscarriage risk; the mother often has nausea ("morning sickness") and fatigue as hCG peaks. SECOND TRIMESTER (weeks 13-27): a phase of rapid growth and refinement — the fetus becomes active (the mother usually feels the first movements around 18-22 weeks), develops hearing, sleep-wake cycles, taste buds, fingerprints, and fine hair (lanugo); many women feel their best now. Survival outside the womb becomes possible, with intensive neonatal care, around 23-24 weeks. THIRD TRIMESTER (weeks 28-40): mostly weight gain and maturation — the brain grows and folds rapidly, the lungs finish developing and start making surfactant (needed to breathe air), fat is laid down, and the fetus normally turns head-down in preparation for birth; the mother carries more weight and often feels breathless and uncomfortable.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-placenta-role',
    title: 'The Role of the Placenta',
    category: 'Human Biology',
    keywords: [
      'what is the role of the placenta', 'a temporary organ formed from both fetal and maternal tissue attached to the uterine wall connected to the fetus by the umbilical cord',
      'gas exchange oxygen in carbon dioxide out nutrient transfer glucose amino acids fats vitamins waste removal urea to the mothers kidneys', 'endocrine organ produces hcg then large amounts of progesterone and estrogen plus hpl passes maternal antibodies igg for passive immunity',
      'a partial barrier maternal and fetal blood never mix but alcohol nicotine many drugs and some viruses cross delivered as the afterbirth in the third stage of labor',
    ],
    content: `The placenta is a temporary organ, built from a mixture of tissue from the embryo and from the mother, that develops on the wall of the uterus and connects to the fetus through the umbilical cord (two arteries and one vein). Maternal and fetal blood flow close together but never actually mix; exchange happens across a thin membrane. Its jobs: (1) GAS EXCHANGE — it takes oxygen from the mother's blood into the fetal blood and passes carbon dioxide back, doing the work the fetus's fluid-filled lungs cannot. (2) NUTRITION — it transfers glucose, amino acids, fatty acids, vitamins, minerals, and water to the fetus. (3) WASTE REMOVAL — fetal urea and other wastes cross to the mother, whose kidneys and liver dispose of them. (4) HORMONE PRODUCTION — it is a major endocrine gland: it makes hCG early on (which keeps the corpus luteum going), then takes over producing the large amounts of progesterone and estrogen that sustain the pregnancy, plus human placental lactogen. (5) IMMUNITY — it ferries the mother's antibodies (IgG) to the fetus, giving the newborn passive immunity for the first months of life. (6) PROTECTION — it filters out many pathogens and large or harmful molecules, though it is not a perfect barrier: alcohol, nicotine, many drugs and medications, and some infections (rubella, Zika, toxoplasmosis, syphilis) do cross. It is delivered a few minutes after the baby, as the "afterbirth," in the third stage of labor.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-embryo-vs-fetus',
    title: 'Embryo vs Fetus (and Zygote, Blastocyst)',
    category: 'Human Biology',
    keywords: [
      'what is the difference between an embryo and a fetus what is a zygote blastocyst embryo', 'zygote the single cell formed at fertilization full 46 chromosomes undergoes cleavage rapid divisions with no growth to a morula solid ball',
      'blastocyst by about day 5 a hollow fluid filled sphere outer trophoblast becomes placenta inner cell mass becomes the embryo', 'embryo weeks about 3 to 8 after implantation when the germ layers and all major organs and the body plan form',
      'fetus from week 9 until birth growth and maturation of structures that already exist rather than forming new ones',
    ],
    content: `The developing human is given different names at different stages. ZYGOTE: the single cell created the moment a sperm fuses with an egg, carrying a complete set of 46 chromosomes. Over the next few days it divides repeatedly without getting any bigger ("cleavage"), forming a 2-cell, 4-cell, 8-cell stage and then a solid ball called a MORULA (~day 3-4). BLASTOCYST: by about day 5 it has hollowed out into a fluid-filled sphere of ~100-200 cells with two distinct parts — an outer shell (the trophoblast, which will become the placenta and membranes) and an inner clump (the inner cell mass, which will become the baby itself). The blastocyst implants in the uterine lining around days 6-10. EMBRYO: from roughly week 3 through the end of week 8, when the three germ layers form and every major organ and the entire body plan are established (organogenesis) — this is the period of greatest sensitivity to harm. FETUS: from week 9 until birth. During the fetal period the structures that already exist grow larger and mature (the lungs learn to make surfactant, the brain folds, fat is deposited); relatively little that is genuinely new is built. The switch from "embryo" to "fetus" is essentially the point at which the organism is fully organized and recognizably human.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-implantation-pregnancy-begins',
    title: 'Implantation and When Pregnancy Begins',
    category: 'Human Biology',
    keywords: [
      'what is implantation and when does pregnancy officially begin', 'after fertilization in the fallopian tube the zygote divides as it travels down over about 5 days becoming a blastocyst which hatches from its shell and implants into the uterine lining around days 6 to 10 after fertilization',
      'the invading trophoblast starts producing hcg which keeps the corpus luteum alive and is what pregnancy tests detect', 'clinically pregnancy is dated from the first day of the last menstrual period so week 4 is around a missed period',
      'the medical consensus treats pregnancy as established at implantation some views place it at fertilization',
    ],
    content: `After an egg is fertilized in the fallopian tube, the resulting zygote divides as it is swept toward the uterus over about five days, arriving as a blastocyst. The blastocyst "hatches" out of the glycoprotein shell (zona pellucida) that surrounded the egg, and its outer cells (trophoblast) burrow into the prepared uterine lining — IMPLANTATION — around 6 to 10 days after fertilization. Only about half of fertilized eggs implant successfully. Once embedded, the trophoblast starts secreting human chorionic gonadotropin (hCG), which signals the ovary's corpus luteum to keep making progesterone so the lining is not shed; hCG is also what home and blood pregnancy tests detect. "When pregnancy begins" is defined differently by different frameworks: obstetric dating counts from the first day of the last menstrual period (so a pregnancy is already "4 weeks" along at the time of the first missed period, and "2 weeks" at conception); the mainstream medical and legal definition — and the way tests and hormone changes work — treats a pregnancy as established at implantation; some religious and philosophical positions place the beginning at fertilization.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-estrogen-progesterone-function',
    title: 'The Functions of Estrogen and Progesterone',
    category: 'Human Biology',
    keywords: [
      'what is the function of estrogen and progesterone', 'estrogen mainly estradiol from ovarian follicles grows the uterine lining in the first half of the cycle causes the lh surge develops female secondary sex characteristics at puberty maintains bone density affects skin cholesterol raises hdl mood vaginal tissue',
      'progesterone from the corpus luteum then the placenta pro gestation stabilizes and makes secretory the uterine lining prevents further ovulation and uterine contractions thickens cervical mucus raises basal body temperature about 0.3 celsius after ovulation prepares the breasts',
      'progesterone withdrawal triggers menstruation and also labor',
    ],
    content: `ESTROGEN (chiefly estradiol, produced by the growing ovarian follicles, and in pregnancy by the placenta) is the "building" hormone of the first half of the cycle: it stimulates the uterine lining to proliferate and thicken, makes cervical mucus thin and sperm-friendly, and, when it peaks, triggers the ovulatory LH surge. Beyond the cycle it drives female puberty (breast development, hip widening, the pubertal growth spurt and then the closing of the growth plates), maintains bone density, keeps vaginal and urethral tissues healthy, tends to raise HDL ("good") cholesterol, and influences skin and mood. PROGESTERONE (from the corpus luteum after ovulation, later from the placenta) is the "pro-gestation" hormone: it converts the estrogen-thickened lining into a nutrient-secreting bed ready for an embryo to implant, suppresses further ovulation and calms uterine muscle so contractions don't expel a pregnancy, thickens cervical mucus into a plug, raises the resting body temperature by about 0.3°C (the basis of fertility charting), and readies the breast tissue for milk production. A sharp drop in progesterone is the trigger for both menstruation (each cycle) and the onset of labor (at term).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-stages-of-childbirth',
    title: 'The Stages of Labor and Childbirth',
    category: 'Human Biology',
    keywords: [
      'what happens during labor and the stages of childbirth', 'first stage labor and cervical dilation regular contractions efface and dilate the cervix from 0 to 10 cm latent 0 to 6 cm slow active 6 to 10 cm about 1 cm per hour transition 8 to 10 cm most intense the longest stage hours',
      'second stage pushing and birth from full dilation until the baby is delivered the baby descends and rotates the head crowns minutes to a couple of hours', 'third stage delivery of the placenta the afterbirth 5 to 30 minutes after the baby',
      'sometimes a fourth stage the first one to two hours after when the uterus clamps down to control bleeding',
    ],
    content: `Labor has three (sometimes counted as four) stages. FIRST STAGE — labor and cervical dilation: regular uterine contractions progressively thin ("efface") and open ("dilate") the cervix from closed to 10 cm. It is subdivided into the latent/early phase (0-6 cm, contractions mild and irregular, often many hours), the active phase (6-10 cm, contractions strong, regular, and painful, cervix opening roughly 1 cm/hour), and transition (8-10 cm, the shortest but most intense part). This is by far the longest stage — commonly 8-18 hours for a first baby, less for later ones. SECOND STAGE — pushing and birth: begins at full (10 cm) dilation and ends when the baby is born. Driven by contractions and the mother's bearing-down effort, the baby's head flexes, descends through the pelvis, rotates, "crowns" at the vaginal opening, and then the head is delivered followed by the shoulders and body. This lasts from a few minutes to a couple of hours. THIRD STAGE — delivery of the placenta ("afterbirth"): 5-30 minutes after the baby, gentle contractions detach the placenta from the uterine wall and it is delivered. FOURTH STAGE (recovery): the first 1-2 hours afterward, during which the uterus contracts firmly to close off the blood vessels where the placenta was attached, controlling bleeding, and mother and baby bond and begin feeding.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-miscarriage',
    title: 'What a Miscarriage Is and How Common It Is',
    category: 'Human Biology',
    keywords: [
      'what is a miscarriage and how common is it', 'a miscarriage medically spontaneous abortion is the loss of a pregnancy before about 20 to 24 weeks after that it is a stillbirth',
      'very common about 10 to 20 percent of recognized pregnancies including very early losses before a missed period the true rate is 30 to 40 percent', 'the great majority of first trimester miscarriages are caused by random chromosomal abnormalities in the embryo not by anything the woman did not stress exercise sex or lifting risk rises sharply with maternal age',
      'signs vaginal bleeding and cramping though early bleeding does not always mean miscarriage recurrent miscarriage three or more affects about 1 percent',
    ],
    content: `A miscarriage — the medical term is "spontaneous abortion" — is the loss of a pregnancy before the fetus could survive outside the womb, conventionally set at 20-24 weeks; a loss after that point is a stillbirth. It is one of the most common pregnancy outcomes: roughly 10-20% of clinically recognized pregnancies end in miscarriage, and when very early losses (before a period is even missed) are counted, the true figure is closer to 30-40%. The overwhelming majority of first-trimester miscarriages are caused by a random chromosomal error in the embryo — an extra or missing chromosome that makes development impossible — that arose by chance during egg or sperm formation or fertilization. Crucially, they are almost never caused by anything the pregnant person did: not stress, not exercise, not sex, not lifting, not a fall of the stairs, not working, not a stressful day. The main risk factor the individual cannot change is maternal age (the miscarriage rate rises from ~10% in the 20s to ~50% by 45), and some medical conditions and uterine abnormalities raise risk. Typical signs are vaginal bleeding and cramping, though light bleeding in early pregnancy is common and does not always mean a miscarriage is happening. Recurrent miscarriage (three or more) affects about 1% of couples and warrants investigation. (A "miscarriage of justice" is an unrelated legal term for a wrongful conviction.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ivf-vs-iui',
    title: 'IVF vs IUI',
    category: 'Human Biology',
    keywords: [
      'what is the difference between ivf and iui', 'iui intrauterine insemination washed concentrated sperm placed directly into the uterus with a thin catheter around ovulation fertilization still happens inside the body less invasive much cheaper lower success per cycle 10 to 20 percent',
      'ivf in vitro fertilization ovaries stimulated with injectable hormones to make many eggs eggs retrieved surgically combined with sperm in the lab or icsi a single sperm injected into each egg grown to embryos transferred into the uterus extras frozen higher success per cycle 30 to 50 percent much more expensive and invasive',
      'iui for mild male factor cervical issues unexplained infertility donor sperm ivf for blocked tubes severe male factor failed iui older patients genetic testing of embryos',
    ],
    content: `Both are fertility treatments, but they differ enormously in intensity, cost, and success rate. IUI (intrauterine insemination) is the simpler one: around the time of ovulation (which may be natural or lightly boosted with oral or low-dose injectable drugs), a sample of sperm is "washed" and concentrated in the lab and then placed directly into the uterus through a thin, flexible catheter passed through the cervix — a quick, near-painless office procedure. Fertilization still happens naturally inside the fallopian tube. It costs relatively little, is minimally invasive, and has a success rate of roughly 10-20% per cycle. It is used for mild male-factor infertility, cervical mucus problems, unexplained infertility, ovulation issues, and for single women or same-sex female couples using donor sperm. IVF (in vitro fertilization) is far more involved: the ovaries are stimulated for ~10-14 days with daily hormone injections to grow many eggs at once; the eggs are retrieved surgically with a needle guided through the vaginal wall under sedation; they are combined with sperm in a dish (or, in ICSI, a single sperm is injected into each egg); the resulting embryos are grown for 3-5 days; and one (or two) is transferred into the uterus, with any extras frozen. Success is higher — around 30-50% per transfer, strongly dependent on age — but it is expensive, physically demanding, and carries more risk. It is used for blocked or absent fallopian tubes, severe male-factor infertility, failed IUI, older patients, genetic disorders (embryos can be tested before transfer), and fertility preservation.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-twins-sharing-placenta',
    title: 'What Determines Whether Twins Share a Placenta',
    category: 'Human Biology',
    keywords: [
      'what determines whether twins share a placenta', 'it depends on when a monozygotic identical embryo splits split at days 1 to 3 two separate placentas and two sacs dichorionic diamniotic about 30 percent of identical twins',
      'split at days 4 to 8 shared placenta two amniotic sacs monochorionic diamniotic about 70 percent risk of twin to twin transfusion syndrome', 'split at days 8 to 13 shared placenta and shared sac monochorionic monoamniotic rare high risk of cord entanglement split after day 13 conjoined twins',
      'fraternal dizygotic twins are two separate embryos so always have two placentas which can fuse and look like one and two sacs',
    ],
    content: `For FRATERNAL (dizygotic) twins the answer is simple: they are two separate embryos from two separate eggs, so they always have their own placenta and their own amniotic sac (two placentas lying next to each other can fuse and superficially look like one on an ultrasound). For IDENTICAL (monozygotic) twins it depends entirely on how many days after fertilization the single embryo splits: split at days 1-3, before the outer placenta-forming layer has specialized, and each twin builds its own placenta and sac (dichorionic-diamniotic — about 30% of identical twins, and indistinguishable from fraternal on a scan); split at days 4-8 and they share one placenta but have separate sacs (monochorionic-diamniotic — the most common, ~70%, and the type that carries a risk of twin-to-twin transfusion syndrome, where blood-vessel connections in the shared placenta let one twin receive more blood than the other); split at days 8-13 and they share both the placenta and a single sac (monochorionic-monoamniotic — rare, ~1%, with a high risk of the two umbilical cords becoming entangled); and a split after about day 13 is incomplete and produces conjoined twins. This is why doctors want to establish "chorionicity" early in a twin pregnancy — it determines how closely the pregnancy must be monitored.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dna-from-each-parent',
    title: 'How a Baby Gets Half Its DNA from Each Parent',
    category: 'Human Biology',
    keywords: [
      'how does a baby get half its dna from each parent', 'gametes egg and sperm are made by meiosis which halves the chromosome number from 46 to 23 and shuffles the parental copies independent assortment and swaps segments between the pair crossing over recombination',
      'so every egg and sperm is genetically unique fertilization restores 46 twenty three from each parent', 'a child gets one copy of each of the 23 chromosomes from the mother via the egg and one from the father via the sperm',
      'siblings share about 50 percent of their variable dna on average but it can range roughly 40 to 60 percent',
    ],
    content: `Body cells carry 46 chromosomes — 23 that came originally from your mother and 23 from your father. But eggs and sperm ("gametes") carry only 23. They are made by a special two-step cell division called MEIOSIS, which does two things: it halves the chromosome number (so a sperm or egg gets just one copy of each of the 23 chromosome types, chosen at random from the person's maternal or paternal version — "independent assortment"), and before it does, it lets each pair of chromosomes physically swap matching segments with each other ("crossing over" or recombination), so the chromosome that ends up in a gamete is a patchwork of that person's own two parental copies. The result is that every egg and every sperm carries a genetically unique combination. At fertilization, the 23 chromosomes in the egg join the 23 in the sperm, restoring the full set of 46 — half the child's DNA from the mother, half from the father, but reshuffled so the child is not identical to either. This is also why full siblings share on average 50% of their variable DNA but the actual figure varies (roughly 40-60%), and why one sibling can inherit a genetic condition while another does not.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-fertility-age-egg-count',
    title: 'How Fertility and Egg Count Change with Age',
    category: 'Human Biology',
    keywords: [
      'how do fertility and egg count change with age in women', 'a female fetus has about 6 to 7 million eggs at 20 weeks gestation 1 to 2 million at birth 300000 to 400000 at puberty 25000 at age 37 about 1000 at menopause the pool only ever declines and cannot be replenished',
      'both quantity ovarian reserve measured by amh and antral follicle count and quality correct chromosome segregation in the eggs final division fall with age', 'fertility declines gradually from the early 30s faster after 35 and sharply after 40',
      'the age related risk of down syndrome rises from about 1 in 1500 at 25 to about 1 in 100 at 40 male fertility also declines with age but far more gradually',
    ],
    content: `Unlike sperm, which men produce fresh throughout life, a female is born with her entire lifetime supply of eggs and makes no new ones. The pool peaks before birth — about 6-7 million immature eggs at around 20 weeks of gestation — then falls steeply: roughly 1-2 million at birth, 300,000-400,000 at puberty, about 25,000 by age 37, and near zero at menopause. Most are simply lost to a continuous background process of degeneration, not to ovulation (only ~400 are ever ovulated). Two things decline with age: QUANTITY, called ovarian reserve, which clinicians estimate from the AMH hormone level and an ultrasound antral-follicle count; and QUALITY, meaning the egg's ability to divide with the chromosomes separating correctly. Egg quality is the bigger factor in age-related infertility and in miscarriage. In practical terms, monthly fertility is fairly stable through the 20s, declines gently from about 30-32, more noticeably after 35, and sharply after 40, with natural conception becoming rare in the mid-40s. The chance that a pregnancy has a chromosomal abnormality such as Down syndrome rises with maternal age — from roughly 1 in 1,500 at age 25 to about 1 in 100 at 40. Male fertility also decreases with age (sperm quality and DNA integrity fall, and paternal age is linked to a small increase in some conditions) but the change is much more gradual.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-breast-milk-production',
    title: 'How Breast Milk Production Works',
    category: 'Human Biology',
    keywords: [
      'how does breast milk production work', 'during pregnancy high estrogen and progesterone grow the milk making glands but high progesterone blocks actual milk secretion',
      'after birth the placenta is gone progesterone crashes and prolactin can act milk comes in about two to four days postpartum colostrum a concentrated antibody rich fluid is produced first', 'two reflexes prolactin triggered by suckling governs milk production supply follows demand oxytocin triggered by suckling and by hearing the baby cry causes let down squeezing milk out',
      'the more the baby feeds the more milk is made removing milk is the signal to make more',
    ],
    content: `Milk production is set up during pregnancy but held in check until birth. The high estrogen and progesterone of pregnancy cause the milk-producing glands (alveoli) and ducts to grow and branch, while the placenta's high progesterone specifically BLOCKS the glands from actually secreting milk. When the baby and placenta are delivered, progesterone crashes within a day or two, releasing that brake, and the hormone prolactin — which has been rising throughout pregnancy — can now do its job. For the first 2-4 days the breasts produce colostrum, a small volume of thick, yellowish, extremely antibody- and protein-rich fluid; then the mature milk "comes in," often with noticeable fullness. Ongoing lactation runs on two reflexes, both triggered by the baby suckling: (1) suckling sends nerve signals to the pituitary to release PROLACTIN, which drives the alveoli to synthesize more milk — so production is demand-driven, "supply follows demand," and the emptier the breast, the faster it refills; (2) suckling (and even just hearing or thinking about the baby) also releases OXYTOCIN, which contracts tiny muscle cells around the alveoli and squeezes milk down the ducts — the "let-down" reflex. If milk is not removed, a local feedback protein signals the gland to slow production, which is how supply adjusts down at weaning.`,
    createdAt: Date.now(),
  },
];
