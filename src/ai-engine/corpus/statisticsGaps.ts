import { KnowledgeItem } from '../../types';

// Batch 102 (statistics & probability). The stats corpus was already strong
// (p-value, correlation/causation, CLT, Bayes, SD/variance, z-score,
// discrete/continuous, gambler's fallacy, p-hacking all fine). Real misses on
// nexus-4b: "type 1 vs type 2 error" was a web dump about mean absolute error
// and brittle bone disease; "selection bias" was answered about Darwinian
// natural selection; the confidence-interval answer repeated the standard
// misinterpretation ("95% chance the true value is in this interval"); "sample
// vs population" was truncated mid-sentence.
export const STATISTICS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-type-1-type-2-error',
    title: 'Type I vs Type II Error',
    category: 'Statistics',
    keywords: [
      'what is a type 1 versus type 2 error', 'type i error false positive rejecting a true null hypothesis rate alpha', 'type ii error false negative failing to reject a false null rate beta',
      'power is 1 minus beta', 'lowering alpha raises beta for a fixed sample size', 'type i crying wolf type ii missing the wolf',
    ],
    content: `In hypothesis testing there are two ways to be wrong. A TYPE I ERROR is a false positive: you reject the null hypothesis when it is actually true — you conclude there is an effect, a difference, or a signal when there really isn't one. The probability of a Type I error is α (alpha), the significance level you choose, conventionally 0.05. A TYPE II ERROR is a false negative: you fail to reject the null hypothesis when it is actually false — a real effect exists but your test misses it. The probability of a Type II error is β (beta), and statistical power is 1 − β, the chance of catching a real effect. For a fixed sample size the two trade off: making α stricter (say 0.01) reduces false positives but raises β, increasing false negatives. The usual way to reduce both at once is a larger sample. A common mnemonic: Type I is "crying wolf" when there is no wolf; Type II is failing to notice the wolf that is really there. (This has nothing to do with "mean absolute error," which is a regression accuracy metric.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-selection-bias',
    title: 'What Selection Bias Is',
    category: 'Statistics',
    keywords: [
      'what is selection bias', 'selection bias the sample studied is not representative of the population because of how it was selected', 'survivorship bias only analyzing the planes that returned',
      'self-selection volunteer bias non-response bias healthy worker effect', 'systematic error not fixed by a bigger sample', 'selection bias is not natural selection',
    ],
    content: `Selection bias occurs when the group you actually study differs systematically from the population you want to draw conclusions about, because of the way members were chosen or ended up in the sample. The distortion is baked into the data, so collecting more of the same biased data does not fix it. Common forms: survivorship bias (the classic WWII example — reinforcing the parts of returning bombers that showed damage, when the planes hit in the fatal spots never came back, so the undamaged-looking areas were the ones to armor); self-selection or volunteer bias (people who choose to answer a survey or join a study are not typical — e.g. only very satisfied and very angry customers leave reviews); non-response bias (those who decline differ from those who respond); and the healthy-worker effect (employed people are healthier than the general population, biasing occupational health studies). This is a statistical/methodological term and is unrelated to natural selection in biology.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-confidence-interval-interpretation',
    title: 'What a Confidence Interval Actually Means',
    category: 'Statistics',
    keywords: [
      'what does a 95 percent confidence interval mean', 'confidence interval correct interpretation if you repeated the sampling 95 percent of the intervals would contain the true parameter',
      'common misinterpretation there is a 95 percent chance the parameter is in this interval', 'the parameter is fixed the interval is random', 'wider interval more confidence or smaller sample',
      'confidence interval vs credible interval bayesian',
    ],
    content: `A confidence interval is a range, computed from sample data, that is designed to capture an unknown population parameter (such as the true mean). The confidence level — 95% is standard — refers to the long-run behaviour of the procedure: if you repeated the whole study many times and built a 95% interval each time, about 95% of those intervals would contain the true parameter. It does NOT mean "there is a 95% probability the true value lies in this particular interval." In the frequentist framework the parameter is a fixed number and the interval is what varies from sample to sample, so any single interval either contains the parameter or it doesn't — there is no probability attached to that one interval. Intervals get narrower with larger samples and less variable data, and wider if you demand a higher confidence level. (The interpretation people usually want — a probability statement about the parameter given this data — is actually a Bayesian "credible interval," which requires a prior.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sample-vs-population',
    title: 'Sample vs Population (Statistics)',
    category: 'Statistics',
    keywords: [
      'what is a sample versus a population in statistics', 'population the entire set you want to draw conclusions about', 'sample the subset you actually measure',
      'parameters describe populations mu sigma statistics describe samples x-bar s', 'inference uses the sample to estimate the parameter sampling error standard error',
      'random sampling representative sample',
    ],
    content: `The population is the complete set of people, objects, or events you want to understand — every voter in a country, every widget a factory will ever make, all possible coin flips. A parameter is a fixed numerical fact about that population, like its true mean (μ) or standard deviation (σ); usually you cannot measure it directly because the population is too large, infinite, or not yet fully existing. So you take a sample — a subset you actually observe — and compute a statistic from it, like the sample mean (x̄) or sample standard deviation (s). Inferential statistics uses the sample statistic as an estimate of the population parameter. Because a different sample would give a slightly different statistic, every estimate carries sampling error, quantified by the standard error, and expressed as a confidence interval or used in a hypothesis test. The estimate is only trustworthy if the sample is representative — ideally drawn at random — so that it is not systematically different from the population (see selection bias).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-skewed-distribution',
    title: 'What a Skewed Distribution Is',
    category: 'Statistics',
    keywords: [
      'what is a skewed distribution', 'skewed distribution not symmetric has a longer tail on one side', 'right positive skew tail to the right mean greater than median income house prices',
      'left negative skew tail to the left mean less than median exam scores with a ceiling', 'skew pulls the mean toward the tail median more robust', 'log transform to reduce right skew',
    ],
    content: `A skewed distribution is one that is not symmetric — it has a longer, thinner tail stretching out on one side. In a RIGHT-SKEWED (positively skewed) distribution the long tail points toward high values: most of the data sits at the lower end with a few large outliers pulling the average up, so the mean is greater than the median. Income, house prices, city populations, and reaction times are typically right-skewed. In a LEFT-SKEWED (negatively skewed) distribution the tail points toward low values and the mean is less than the median — for example exam scores on an easy test, where most people cluster near the maximum and a few low scores drag the tail down. The key practical consequence: skew pulls the mean toward the tail, so for skewed data the median is a more robust description of the "typical" value. Analysts often apply a transformation (such as taking logarithms) to make right-skewed data more symmetric before using methods that assume normality.`,
    createdAt: Date.now(),
  },
];
