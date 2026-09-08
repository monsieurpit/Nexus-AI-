import { KnowledgeItem } from '../../types';

// Batch 112 (sleep & circadian science) — a genuinely thin area, no dedicated
// sleep corpus. Web dumps and errors on nexus-4b: "why do we get sleepy in the
// afternoon" returned a bio of the actor Charles Durning plus an A-Z list of
// jazz standards; "sleep debt", "best nap length" and "ideal bedroom
// environment" were raw web dumps; "sleep apnea" said the first-line treatment
// is CBT-I (that is for insomnia); "what happens in the brain during a dream"
// claimed the visual cortex flips the retinal image; "sleep cycle vs a full
// night" said a night is "eight or nine cycles" (it is 4-6).
export const SLEEP_CIRCADIAN_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-sleep-debt',
    title: 'What Sleep Debt Is and Whether You Can Catch Up',
    category: 'Sleep Science',
    keywords: [
      'what is sleep debt and can you catch up on sleep', 'sleep debt the cumulative shortfall between the sleep you need and the sleep you get builds night after night',
      'impairs attention mood memory immune function metabolism often without you noticing the decline', 'a small acute debt can be partly repaid with one or two long nights',
      'chronic long term debt is not fully reversed by a weekend lie-in which also causes social jet lag', 'some cognitive deficits persist',
    ],
    content: `Sleep debt is the running total of how much less sleep you have had than your body needs. If you need 8 hours and get 6, you accumulate 2 hours of debt that night, and it compounds across a week. The effects — slower reaction time, worse attention and working memory, low mood and irritability, impaired glucose handling, weakened immune response, more hunger — build up steadily, and a well-documented catch is that people adapt to feeling this way and stop noticing how impaired they are, even as objective performance keeps dropping. Recovery is partial. A small, recent debt (a couple of bad nights) can be largely repaid with one or two nights of extra sleep. But chronic, weeks-long sleep restriction is not fully undone by sleeping in on the weekend: some measures of alertness recover while others (like sustained attention and metabolic markers) do not, and the weekend lie-in itself shifts your body clock later, producing "social jet lag" that makes Monday harder. The reliable fix is consistently getting enough sleep, not repayment after the fact.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-afternoon-sleepiness',
    title: 'Why We Get Sleepy in the Afternoon',
    category: 'Sleep Science',
    keywords: [
      'why do we get sleepy in the afternoon', 'post lunch dip the circadian alertness signal has a natural mid afternoon trough roughly 1 to 4 pm', 'a smaller echo of the nighttime dip built into the circadian rhythm present even if you skip lunch',
      'accumulated adenosine sleep pressure since morning adds to it', 'a heavy high carb lunch and a warm room amplify it', 'siesta cultures reflect this normal biological rhythm',
    ],
    content: `The mid-afternoon slump ("post-lunch dip") is mostly a built-in feature of the circadian rhythm, not just a reaction to eating. The body's circadian alertness signal is not flat across the day: it has a large trough in the early hours of the morning and a second, smaller trough in the early-to-mid afternoon, roughly between 1 and 4 pm. This dip shows up in reaction-time and alertness studies even when people skip lunch entirely, so lunch is not the primary cause. On top of that circadian dip sits the sleep pressure ("Process S") that has been building from the adenosine your brain has accumulated since you woke up — by early afternoon there is a fair amount of it. A large, carbohydrate-heavy meal and a warm environment can deepen the feeling. Because it is a normal biological rhythm, many cultures historically built a siesta around it; a short nap or a walk and some bright light are the usual countermeasures. (It has nothing to do with the actor Charles Durning or a list of jazz standards.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sleep-apnea-detail',
    title: 'What Sleep Apnea Is',
    category: 'Sleep Science',
    keywords: [
      'what is sleep apnea', 'obstructive sleep apnea the throat muscles relax and repeatedly block the airway during sleep brief awakenings loud snoring gasping drops in blood oxygen',
      'central sleep apnea the brain fails to signal the breathing muscles', 'consequences daytime sleepiness morning headaches high blood pressure heart disease stroke risk',
      'diagnosed by a sleep study polysomnography treated with cpac continuous positive airway pressure weight loss oral appliances surgery', 'cpap not cbt-i',
    ],
    content: `Sleep apnea is a disorder in which breathing repeatedly stops and restarts during sleep. In OBSTRUCTIVE sleep apnea (by far the most common form), the muscles of the throat and tongue relax during sleep and collapse the airway; the sleeper struggles to breathe against the blockage, blood oxygen falls, and the brain briefly wakes just enough to reopen the airway — often with a loud snort or gasp — then the person falls back asleep, usually with no memory of it, dozens or even hundreds of times a night. In CENTRAL sleep apnea, the airway is open but the brain intermittently fails to send the signal to breathe. Signs include loud chronic snoring, witnessed pauses in breathing, gasping awake, un-refreshing sleep, severe daytime sleepiness, and morning headaches. Untreated, it raises the risk of high blood pressure, heart attack, heart failure, atrial fibrillation, stroke, type 2 diabetes, and car accidents. It is diagnosed with a sleep study (polysomnography or a home test) and treated with CPAP — a mask that delivers pressurized air to splint the airway open — plus weight loss, sleeping on the side, avoiding alcohol and sedatives, dental appliances, or surgery. (CBT-I is the first-line treatment for insomnia, a different condition, not for apnea.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-brain-during-dream',
    title: 'What Happens in the Brain During a Dream',
    category: 'Sleep Science',
    keywords: [
      'what happens in the brain during a dream', 'during rem dreams the brain is highly active visual association cortex motor cortex limbic emotional areas amygdala and hippocampus fire strongly',
      'the dorsolateral prefrontal cortex logic self monitoring working memory is downregulated why dreams are vivid and emotional but bizarre and uncritically accepted', 'acetylcholine high noradrenaline and serotonin low pgo waves',
      'spinal motor neurons inhibited rem atonia so you do not act it out', 'dreams occur in nrem too but are less vivid',
    ],
    content: `Dreaming is not the brain switching off — during REM sleep it is nearly as active as waking, but the pattern of activity is very different. The visual association areas, the motor cortex, and especially the limbic system — the amygdala (emotion, fear), the hippocampus (memory), and the anterior cingulate — fire strongly, which is why dreams are visually rich and emotionally charged. Meanwhile the dorsolateral prefrontal cortex, which handles logic, working memory, planning and self-monitoring, is turned down. That combination explains the classic features of dreams: vivid and story-like, but bizarre, discontinuous, and accepted without question while they happen. The neurochemistry flips too: acetylcholine is high while the alerting chemicals noradrenaline and serotonin drop to their lowest levels. The brainstem fires bursts called PGO waves, the eyes dart around (the "rapid eye movement"), and — crucially — the spinal motor neurons are actively inhibited (REM atonia), paralysing the body so the dreamer does not physically act out the dream. Dreaming also occurs in non-REM sleep, but those dreams tend to be more thought-like and less vivid.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-best-nap-length',
    title: 'The Best Length for a Nap',
    category: 'Sleep Science',
    keywords: [
      'what is the best length for a nap', 'ten to twenty minute power nap ideal for a quick alertness boost stay in light n1 n2 and wake without grogginess',
      'avoid thirty to sixty minutes you enter deep n3 and wake with sleep inertia', 'a full ninety minute nap completes a whole cycle ends in light sleep wake refreshed and get some rem',
      'nap early to mid afternoon so it does not eat into night sleep', 'coffee nap caffeine then a twenty minute nap',
    ],
    content: `Nap length matters more than most people realise, because it determines which sleep stage you wake up from. A 10-to-20-minute nap (a "power nap") is best for a quick lift in alertness and mood: you stay in the light stages (N1 and N2), so you wake up sharp with no grogginess, and the benefit lasts a couple of hours. Napping for 30 to 60 minutes is the worst window — long enough to sink into deep slow-wave sleep (N3) but not long enough to finish the cycle, so you wake mid-N3 with heavy "sleep inertia" (fog, clumsiness, disorientation) that can last 15-30 minutes. A full ~90-minute nap completes an entire cycle and returns you to light sleep before you wake, so you feel refreshed and also get some REM (helpful for creativity and emotional processing) — worth it only if you have the time. Nap in the early-to-mid afternoon, not late, so it does not reduce your sleep pressure for the night. The "coffee nap" trick — drink a coffee, then nap 20 minutes — works because caffeine takes about 20 minutes to act, so it kicks in just as you wake.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ideal-sleep-environment',
    title: 'The Ideal Bedroom Temperature and Environment for Sleep',
    category: 'Sleep Science',
    keywords: [
      'what is the ideal bedroom temperature and environment for sleep', 'cool bedroom around 18 celsius 65 fahrenheit range 16 to 20 core body temperature must drop about 1 degree to initiate and maintain sleep',
      'dark blackout curtains cover leds even dim light disrupts melatonin and sleep depth', 'quiet or steady white noise sudden noises cause micro arousals', 'reserve the bed for sleep and sex stimulus control good ventilation lower co2',
    ],
    content: `The evidence points to a bedroom that is COOL, DARK, and QUIET. Cool: aim for roughly 18°C (65°F), with a comfortable range of about 16-20°C. Falling and staying asleep requires your core body temperature to drop by about 1°C, which the body does by sending blood to the skin of the hands and feet to shed heat; a warm room fights that process, which is also why a warm bath or warm socks an hour before bed helps (they trigger the same heat-dumping response afterward). Dark: use blackout curtains and cover or remove glowing electronics — even fairly dim light in the room suppresses melatonin, lightens sleep, and can shift your clock. Quiet: steady, low background sound (a fan or white noise) is fine and can mask disturbances, but sudden or variable noises cause brief "micro-arousals" that fragment sleep even if you do not fully wake. Also useful: fresh air / lower CO2 from a cracked window or ventilation, a comfortable mattress and pillow, and reserving the bed only for sleep and sex so your brain associates it with sleeping ("stimulus control").`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sleep-cycle-vs-night',
    title: 'A Sleep Cycle vs a Full Night of Sleep',
    category: 'Sleep Science',
    keywords: [
      'what is the difference between a sleep cycle and a full night of sleep', 'one sleep cycle is about 90 minutes progressing n1 n2 n3 back to n2 then rem', 'a full night is 4 to 6 cycles not 8 or 9',
      'early cycles are heavy on deep slow wave sleep n3 later cycles have longer rem periods and little or no n3', 'waking naturally at the end of a cycle in light sleep feels better than an alarm mid deep sleep',
    ],
    content: `A single SLEEP CYCLE lasts roughly 90 minutes (anywhere from about 70 to 120) and moves through the stages in order: light N1, then N2, down into deep slow-wave N3, back up to N2, and finally a REM period, before the next cycle begins. A FULL NIGHT of sleep is a series of 4 to 6 such cycles (for a 7-9 hour night) — not 8 or 9. The cycles are not identical: the first two or three are dominated by deep N3 sleep and have short REM periods, while the last two or three contain little or no N3 and much longer REM periods (which is why long, vivid dreams and remembering them are more common toward morning, and why cutting a night short costs you disproportionately more REM). Because you pass through light sleep at the end of each cycle, waking naturally then — or timing an alarm to land near a 90-minute multiple — feels much less jarring than an alarm going off in the middle of deep N3.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-rbd-vs-sleep-paralysis',
    title: 'REM Sleep Behavior Disorder vs Sleep Paralysis',
    category: 'Sleep Science',
    keywords: [
      'what is rem sleep behavior disorder and sleep paralysis', 'rem sleep behavior disorder rbd the rem muscle atonia fails so the person physically acts out dreams punching kicking talking shouting',
      'rbd is often an early warning sign prodrome of parkinsons disease or lewy body dementia', 'sleep paralysis the rem atonia persists into wakefulness conscious but unable to move often with vivid hallucinations',
      'they are opposite malfunctions of the same rem paralysis system', 'sleep paralysis is common and usually harmless triggered by sleep deprivation irregular schedule sleeping on your back',
    ],
    content: `Both involve the muscle paralysis (atonia) that normally accompanies REM sleep, but they are opposite failures of it. In REM SLEEP BEHAVIOR DISORDER (RBD), the atonia does not switch on properly during REM, so the sleeper physically acts out their dreams — punching, kicking, leaping out of bed, shouting or talking, sometimes injuring themselves or a bed partner — and if woken can often recall a matching dream. RBD is medically important because in older adults it is frequently an early warning sign, years or decades ahead, of Parkinson's disease or Lewy body dementia. SLEEP PARALYSIS is the reverse: the REM atonia lingers for a few seconds to a couple of minutes after the brain has woken up, so the person is fully conscious but unable to move or speak, often with a sense of pressure on the chest and vivid, frightening hallucinations of a presence in the room (the origin of many "night hag" and alien-abduction stories). Sleep paralysis is common, usually harmless, and is triggered by sleep deprivation, irregular sleep schedules, stress, and sleeping on the back.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sleep-stages-full',
    title: 'The Stages of Sleep (N1, N2, N3, REM)',
    category: 'Sleep Science',
    keywords: [
      'what are the stages of sleep and what is the difference between rem and non-rem', 'n1 light drift off stage hypnic jerks minutes long', 'n2 baseline sleep sleep spindles and k-complexes about half the night',
      'n3 deep slow wave sleep hardest to wake from dominates the first half of the night physical repair growth hormone', 'rem rapid eye movement brain active like waking vivid dreams muscle atonia periods lengthen toward morning',
      'cycle order n1 n2 n3 n2 rem repeat every 90 minutes', 'dreams occur in all stages most vivid in rem',
    ],
    content: `Sleep alternates between non-REM and REM. Non-REM has three stages. N1 is the brief drift-off (a few minutes): brain waves slow, muscles relax, and you may get "hypnic jerks" or a falling sensation; woken from it, people often deny they were asleep. N2 is baseline sleep and makes up roughly half the night: body temperature drops, heart rate slows, and the EEG shows distinctive bursts called sleep spindles and K-complexes, thought to protect sleep from disturbance and to aid memory. N3 is deep "slow-wave" sleep, marked by large slow delta waves; it is the hardest stage to wake from (and where sleepwalking and night terrors happen), and it is concentrated in the first half of the night. N3 is when growth hormone is released, tissue is repaired, the immune system is boosted, and the glymphatic system clears brain waste. REM sleep (rapid eye movement) has a fast, wake-like EEG, darting eyes, irregular breathing and heart rate, and vivid narrative dreams, while the skeletal muscles are paralysed. A full cycle runs N1 to N2 to N3 and back up to N2, then REM, about every 90 minutes; as the night goes on, N3 shrinks and REM periods get longer.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-adenosine-caffeine-detail',
    title: 'How Adenosine and Caffeine Control Sleepiness',
    category: 'Sleep Science',
    keywords: [
      'why does caffeine keep you awake and what is adenosine', 'adenosine a byproduct of the brains energy use accumulates while awake binds receptors that slow neural activity and build sleep pressure process s',
      'caffeine is structurally similar and competitively blocks adenosine receptors so the sleepiness signal is not felt', 'caffeine half life about 5 to 6 hours an afternoon coffee still has a quarter of the dose at bedtime',
      'caffeine crash when it wears off accumulated adenosine floods the unblocked receptors', 'tolerance the brain makes more adenosine receptors with regular use',
    ],
    content: `While you are awake, your brain's neurons burn energy (ATP), and one of the breakdown products is a molecule called adenosine. It accumulates in the brain hour by hour and binds to adenosine receptors, which dampen neural activity and produce the growing feeling of sleepiness — this is "sleep pressure" (Process S in the two-process model of sleep). During sleep, adenosine is cleared, and you wake with it low. Caffeine works because its molecular shape is similar enough to adenosine that it fits into the same receptors and blocks them without activating them: the adenosine is still there and still building up, but the brain cannot "feel" it, so you stay alert. Caffeine has a half-life of about 5-6 hours (longer in some people, shorter in smokers), so a coffee at 3 pm still has roughly a quarter of its caffeine circulating at bedtime. When caffeine finally clears, all the adenosine that piled up in the meantime binds at once, producing the "caffeine crash." With regular use the brain compensates by making more adenosine receptors, so you need more caffeine for the same effect (tolerance) and feel foggy without it (withdrawal).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jet-lag-detail',
    title: 'What Jet Lag Is and Why It Happens',
    category: 'Sleep Science',
    keywords: [
      'what is jet lag and why does it happen', 'jet lag the internal circadian clock is still set to the departure time zone and out of sync with the destination clock',
      'the clock can only shift about one hour per day so recovery takes roughly one day per time zone crossed', 'worse traveling east you must advance and shorten your day which is harder than delaying it',
      'eastward seek morning light and take melatonin in the evening westward seek evening light avoid morning light', 'not the same as travel fatigue',
    ],
    content: `Jet lag happens when you cross several time zones quickly and your internal circadian clock — still running on the time zone you left — is out of step with the local day/night cycle at your destination. Your body wants to sleep, eat, and be alert on the old schedule, producing insomnia at night, sleepiness during the day, poor concentration, digestive upset, and low mood. The clock can only re-synchronise gradually, shifting by roughly one hour per day, so a rough rule is one day of adjustment per time zone crossed. Direction matters: flying EAST (e.g. New York to Paris) forces you to advance your clock and effectively shorten your day, which is harder and slower than flying WEST, where you delay your clock and lengthen your day. Light is the strongest tool for resetting: going east, get bright light in the destination morning and avoid it in the evening, and consider a small dose of melatonin a few hours before the target bedtime; going west, seek light in the evening and avoid the early-morning light. (Jet lag is distinct from ordinary travel fatigue, which comes from a long cramped journey and resolves after one good sleep regardless of direction.)`,
    createdAt: Date.now(),
  },
];
