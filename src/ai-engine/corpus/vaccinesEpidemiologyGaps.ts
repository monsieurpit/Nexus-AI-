import { KnowledgeItem } from '../../types';

// Batch 98 (vaccines & epidemiology — batch 68 covered immunology,
// vaccineHistoryDeep.ts covered vaccine history). Fairly strong. Real misses on
// nexus-4b: "what is R naught" answered about the astronomer Robert McNaught
// and a Kurt Vonnegut short story; "difference between quarantine and
// isolation" dumped text about China's Zero-COVID policy; "what is a booster
// shot" was a raw web dump; "Sabin versus Salk" and "sterilizing immunity"
// were thin or imprecise.
export const VACCINES_EPIDEMIOLOGY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-r-naught',
    title: 'What R0 (R Naught) Is',
    category: 'Epidemiology',
    keywords: [
      'what is r naught', 'basic reproduction number r0 contagiousness', 'average number of people one infected person infects susceptible population',
      'r0 above 1 outbreak grows below 1 dies out', 'measles r0 12 to 18 covid r0 2 to 3', 'effective reproduction number rt herd immunity threshold',
    ],
    content: `R0 ("R naught" or "R zero," the basic reproduction number) is the average number of people that one infected person will pass a contagious disease to, in a population where everyone is susceptible and no control measures are in place. It is the standard measure of how contagious a pathogen is. If R0 is greater than 1 an outbreak grows exponentially; if it is less than 1 the outbreak shrinks and dies out. Rough values: seasonal influenza about 1.3, COVID-19 (original strain) about 2.5–3, some Omicron subvariants 8–10, smallpox 5–7, and measles 12–18 — one of the most contagious diseases known. The "herd immunity threshold" — the fraction of a population that must be immune to stop sustained spread — is approximately 1 − 1/R0, which is why measles requires roughly 95% coverage while a disease with R0 = 2 needs only about 50%. The "effective reproduction number" (Rt or Re) is the real-time version that accounts for existing immunity and interventions; pushing Rt below 1 is the goal of any epidemic response. It has nothing to do with astronomers or science-fiction stories.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-quarantine-vs-isolation',
    title: 'The Difference Between Quarantine and Isolation',
    category: 'Epidemiology',
    keywords: [
      'what is the difference between quarantine and isolation', 'isolation for people who are already sick infected', 'quarantine for people exposed but not yet sick',
      'quarantine incubation period monitoring', 'you have it stay away vs you were exposed wait and see', 'quarantine origin quaranta giorni venice black death',
    ],
    content: `Both mean separating people to stop the spread of a contagious disease, but they apply to different people. ISOLATION is for people who ARE ALREADY SICK — a confirmed or presumed infection: they are kept apart from healthy people (a separate room at home, or a dedicated area of a hospital) until they are no longer contagious. QUARANTINE is for people who are NOT sick but have been EXPOSED to a contagious disease and might be incubating it: they stay separated and are monitored for the length of that disease's incubation period, in case they develop the illness and become infectious. In short: isolation = "you have it, stay away from others"; quarantine = "you were exposed, wait and watch before mixing with others." The word "quarantine" comes from the Italian "quaranta giorni" — the 40 days that arriving ships were held offshore from Venice during outbreaks of the plague.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-booster-shot',
    title: 'What a Booster Shot Is',
    category: 'Vaccines',
    keywords: [
      'what is a booster shot', 'additional vaccine dose after the primary series to restore waning protection', 'prime-boost strategy antibody levels rise again',
      'tetanus booster every 10 years mmr second dose', 'updated boosters matched to circulating strains', 'why does vaccine immunity wane',
    ],
    content: `A booster shot is an additional dose of a vaccine given some time after the initial ("primary") vaccination, to restore or strengthen protection that has naturally waned. After the primary series, antibody levels fall over months to years and the pool of memory cells settles at a lower level; a booster re-exposes the immune system to the antigen, which quickly raises antibody levels again and can broaden and deepen the memory response — this "prime-boost" approach produces stronger, longer-lasting immunity than the first doses alone. Examples: the tetanus/diphtheria booster recommended every 10 years, the routine second dose of MMR, and COVID-19 boosters. Boosters are sometimes reformulated to match currently circulating strains (as with the yearly flu shot and updated COVID boosters). Getting a booster a bit early is generally harmless; delaying it too long leaves a window of reduced protection.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sabin-vs-salk',
    title: 'The Difference Between the Sabin and Salk Polio Vaccines',
    category: 'Vaccines',
    keywords: [
      'what is the difference between the sabin and salk polio vaccines', 'salk ipv inactivated injected polio vaccine', 'sabin opv oral live attenuated polio drops',
      'opv gut immunity blocks transmission cheap easy', 'vaccine-derived poliovirus opv reversion risk', 'why the world switched back to ipv as wild polio disappears',
    ],
    content: `Both prevent polio but work differently. The SALK vaccine (IPV, inactivated polio vaccine, 1955) uses killed poliovirus and is given by injection. It cannot cause polio, is safe for immunocompromised people, and is now the routine choice in most wealthy countries — but it produces less "mucosal" (gut) immunity, so a vaccinated person can still carry and shed wild virus in their stool. The SABIN vaccine (OPV, oral polio vaccine, 1961) uses live but weakened virus, given as drops in the mouth. It is cheap, needs no needles or trained staff, and produces strong intestinal immunity that blocks transmission, and vaccinated people briefly shed the weakened virus, which can passively immunise close contacts — all of which made it the workhorse of the global eradication campaign. Its rare downside: the live virus can, on very rare occasions, mutate back toward a virulent form and cause "vaccine-derived poliovirus" outbreaks. As wild polio has been driven to near-extinction (endemic now only in Afghanistan and Pakistan), the world is transitioning from OPV back to IPV to remove that risk.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sterilizing-immunity',
    title: 'What Sterilizing Immunity Is',
    category: 'Vaccines',
    keywords: [
      'what is sterilizing immunity', 'immunity that prevents any infection from establishing pathogen neutralised before it replicates',
      'sterilizing vs disease-reducing effective immunity', 'why covid vaccines reduce severe disease but not infection transmission',
      'mucosal neutralising antibody at site of entry wanes', 'measles vaccine near sterilizing long lasting',
    ],
    content: `Sterilizing immunity is protection strong enough that a pathogen cannot establish any infection at all — it is neutralised before it can replicate, so the person does not become infected and cannot transmit it. It contrasts with the more common "effective" or disease-reducing immunity, where the pathogen still gets in and multiplies but the immune system brings it under control quickly enough to prevent serious illness (the person may still feel mildly ill and be briefly contagious). Sterilizing immunity usually requires high levels of neutralising antibody right at the point of entry — the lining of the nose, throat or gut — and those mucosal antibody levels fade over months, so even immunity that briefly confers it often doesn't sustain it. The measles vaccine comes close to sterilizing immunity and it lasts for decades; by contrast, the COVID-19 vaccines sharply cut severe disease and death but do not reliably block infection or onward transmission, especially against newer variants, because circulating antibody wanes and the virus evolves to escape it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-herd-immunity-threshold',
    title: 'What the Herd Immunity Threshold Is',
    category: 'Epidemiology',
    keywords: [
      'what is herd immunity threshold', 'fraction of population immune to stop sustained spread', 'herd immunity threshold formula 1 minus 1 over r0',
      'measles 95 percent covid 60 to 90 percent', 'herd immunity protects those who cannot be vaccinated', 'why herd immunity threshold rises with a more contagious variant',
    ],
    content: `The herd immunity threshold is the fraction of a population that needs to be immune (through vaccination or past infection) for a contagious disease to stop spreading in a sustained way — at that point each infected person passes it to fewer than one other person on average, so outbreaks fizzle out even though not everyone is immune. This indirectly protects people who can't be vaccinated (newborns, the immunocompromised). The threshold depends on how contagious the disease is, and is approximately 1 − 1/R0. So a disease with R0 = 2 needs about 50% immunity; COVID-19's original strain (R0 ≈ 3) needed roughly 65–70%; and measles (R0 ≈ 15) needs around 93–95%, which is why even small drops in measles vaccination coverage cause outbreaks. The real-world number is higher and fuzzier than the formula because immunity is imperfect and wanes, contacts aren't evenly mixed, and a more transmissible variant raises R0 and therefore the threshold — which is part of why "herd immunity" was never reached for COVID-19.`,
    createdAt: Date.now(),
  },
];
