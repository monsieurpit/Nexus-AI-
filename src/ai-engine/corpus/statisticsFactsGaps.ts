import { KnowledgeItem } from '../../types';

// Batch 38 (statistics & probability) gap-fills. Live misses on nexus-4b:
// "correlation coefficient" -> "correlation doesn't imply causation" (never
// defined r); "discrete vs continuous data" -> "analog signals vs digital 0s
// and 1s"; "probability vs odds" -> computed odds as 6:36 = 1:6 "more likely
// than not" (wrong, it's 1:5 against); "p-value" -> "the more confident you can
// be your hypothesis is true" (misconception); "regression" -> only regression
// to the mean; "random variable" -> bled into a programming variable.
export const STATISTICS_FACTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-correlation-coefficient',
    title: 'What the Correlation Coefficient Is',
    category: 'Statistics',
    keywords: [
      'what is correlation coefficient', 'what is r in statistics', 'pearson correlation', 'what does a correlation of 0.8 mean',
      'positive vs negative correlation', 'correlation coefficient range', 'what is r squared',
    ],
    content: `The correlation coefficient (usually written r, Pearson's r) is a single number that measures the strength and direction of the LINEAR relationship between two variables. It ranges from −1 to +1: r = +1 is a perfect positive line (as one goes up, the other goes up proportionally), r = −1 is a perfect negative line, and r = 0 means no linear relationship. Rough reading: |r| around 0.1–0.3 is weak, 0.4–0.6 moderate, 0.7+ strong. Important limits: r only detects STRAIGHT-LINE relationships (a strong curved relationship can still give r near 0), it's sensitive to outliers, and — as with any correlation — a high r does not prove one variable causes the other. r² ("r-squared," the coefficient of determination) is r squared and tells you the proportion of the variation in one variable that's explained by the other (r = 0.7 → r² = 0.49 → 49% explained).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-probability-vs-odds',
    title: 'Probability vs Odds',
    category: 'Statistics',
    keywords: [
      'what is the difference between probability and odds', 'probability vs odds', 'how do you convert probability to odds',
      'what does 3 to 1 odds mean', 'odds in favor vs odds against', 'odds ratio meaning',
    ],
    content: `Probability is the fraction of times an event happens out of all outcomes: probability = favourable ÷ total. Rolling a 7 with two dice: 6 favourable outcomes out of 36 total, so probability = 6/36 = 1/6 ≈ 0.167 (about 17%). ODDS compare favourable to UNFAVOURABLE outcomes, not to the total. Odds in favour of rolling a 7 = 6 : 30 = 1 : 5 ("one to five"), meaning for every 1 time you roll a 7 you expect 5 times you don't — so a 7 is much LESS likely than not. Converting: if probability is p, odds in favour are p : (1 − p); if odds in favour are a : b, probability is a ÷ (a + b). Gamblers usually quote "odds against" (5 : 1 against rolling a 7). In research, the "odds ratio" compares the odds of an outcome between two groups.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-p-value',
    title: 'What a P-Value Is',
    category: 'Statistics',
    keywords: [
      'what is a p value', 'what does a p value mean', 'p value less than 0.05', 'what is the null hypothesis',
      'does a low p value mean my hypothesis is true', 'p value interpretation', 'p hacking',
    ],
    content: `A p-value is the probability of getting a result at least as extreme as the one you observed, ASSUMING the null hypothesis (usually "there is no real effect / no difference") is true. A small p-value means your data would be surprising if nothing were really going on, so it's evidence against the null hypothesis. By convention, p < 0.05 is called "statistically significant" and researchers reject the null. Crucial things it does NOT mean: it is not the probability that the null hypothesis is true, and it is not the probability that your result was "due to chance"; a low p-value doesn't tell you the effect is large or important, and a high p-value doesn't prove there's no effect (maybe the study was just too small). Because you can get a "significant" result 1 time in 20 by luck, running many tests and reporting only the significant ones ("p-hacking") produces false findings — which is part of the replication crisis in science.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-normal-distribution',
    title: 'What a Normal Distribution Is',
    category: 'Statistics',
    keywords: [
      'what is a normal distribution', 'what is a bell curve', 'what is the 68 95 99.7 rule', 'gaussian distribution',
      'why is data normally distributed', 'what is a standard normal distribution', 'properties of the normal curve',
    ],
    content: `A normal distribution (or "Gaussian," or "bell curve") is a symmetric, bell-shaped distribution of a continuous variable. Its two defining numbers are the mean (the centre, where the peak is) and the standard deviation (how wide the bell is). It has some clean properties: it's perfectly symmetric about the mean, so the mean, median and mode all sit at the centre, and it follows the 68–95–99.7 rule — about 68% of values fall within 1 standard deviation of the mean, about 95% within 2, and about 99.7% within 3. Many natural measurements are roughly normal (heights, blood pressure, measurement errors), and — by the central limit theorem — averages of samples tend toward a normal distribution even when the underlying data isn't, which is why the bell curve shows up so often in statistics. The "standard normal" is the special case with mean 0 and standard deviation 1, used with z-scores.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-regression',
    title: 'What Regression Is (Analysis and "to the Mean")',
    category: 'Statistics',
    keywords: [
      'what is regression', 'what is regression analysis', 'what is linear regression', 'line of best fit',
      'what is regression to the mean', 'how do you predict one variable from another', 'dependent and independent variable',
    ],
    content: `The word covers two related ideas. REGRESSION ANALYSIS is a statistical method for modelling how one variable (the outcome / dependent variable, "y") relates to one or more others (predictors / independent variables, "x"). Simple linear regression fits the straight line y = a + bx that best predicts y from x by minimising the total squared error ("least squares"); the slope b tells you how much y changes per unit of x. It's used to predict values and to estimate the effect of one factor while accounting for others (multiple regression). REGRESSION TO (TOWARD) THE MEAN is a separate phenomenon: when a measurement is extreme partly by luck, a repeat measurement tends to be closer to average. It's why the "rookie of the year" often does worse the next season, and why a treatment given to people at their worst can look effective even if it does nothing — some improvement was going to happen anyway. Ignoring it leads to false conclusions about what "worked."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-random-variable',
    title: 'What a Random Variable Is',
    category: 'Statistics',
    keywords: [
      'what is a random variable', 'random variable definition', 'discrete vs continuous random variable',
      'what is a probability distribution', 'what is expected value of a random variable', 'examples of random variables',
    ],
    content: `A random variable is a variable whose value is a numerical outcome of a random process — it assigns a number to each possible result of an experiment. Example: let X be the number of heads in 3 coin flips; X can be 0, 1, 2 or 3, each with its own probability. Random variables come in two types. DISCRETE random variables take separate, countable values (a dice roll, the number of customers in an hour, whether an email is spam coded as 0/1) — described by a probability mass function listing P(X = each value). CONTINUOUS random variables can take any value in a range (a person's exact height, the time until a bus arrives) — described by a probability density function, where probability is an area under the curve over an interval. The full list of values and their probabilities is the variable's "probability distribution," and its long-run average is the "expected value." (This is a statistics concept, not a programming variable.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-discrete-vs-continuous-data',
    title: 'Discrete vs Continuous Data',
    category: 'Statistics',
    keywords: [
      'what is the difference between discrete and continuous data', 'discrete vs continuous data', 'what is discrete data',
      'what is continuous data', 'examples of discrete and continuous variables', 'is age discrete or continuous',
    ],
    content: `In statistics, this is about what values a numeric variable can take. DISCRETE data can only take separate, distinct values — usually whole-number counts with nothing in between: the number of children in a family (0, 1, 2, 3…), goals scored in a match, dice rolls, number of cars in a car park. You can't have 2.5 children. CONTINUOUS data can take any value within a range, limited only by how precisely you measure: height, weight, temperature, time, distance, speed. Between any two values there's always another possible value. Some cases are borderline — age is really continuous but often recorded as whole years; money is technically discrete (to the cent) but usually treated as continuous. The distinction matters because it affects which charts (bar chart / histogram), which summary statistics, and which probability models are appropriate. It has nothing to do with analog vs digital signals.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-standard-deviation',
    title: 'What Standard Deviation Is',
    category: 'Statistics',
    keywords: [
      'what is standard deviation', 'how is standard deviation calculated', 'what does a high standard deviation mean',
      'standard deviation vs variance', 'what units is standard deviation in', 'why square the deviations',
    ],
    content: `Standard deviation is a measure of how spread out a set of numbers is around their mean (average). To get it: find the mean, subtract it from each value to get each deviation, square all the deviations (so negatives don't cancel positives and big deviations count more), average those squared deviations (that average is the variance), then take the square root — which brings the answer back into the original units. A small standard deviation means the data is tightly clustered near the mean; a large one means it's widely scattered. It's in the same units as the data (centimetres for heights, dollars for prices), which makes it more interpretable than the variance. For a roughly normal (bell-curve) data set, about 68% of values lie within one standard deviation of the mean and about 95% within two. Note there's a slightly different formula (dividing by n − 1) when estimating the standard deviation of a whole population from a sample.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-statistical-significance',
    title: 'What Statistical Significance Is',
    category: 'Statistics',
    keywords: [
      'what is statistical significance', 'what does statistically significant mean', 'significance level alpha',
      'is statistically significant the same as important', 'what does p less than 0.05 mean', 'hypothesis testing',
    ],
    content: `A result is "statistically significant" when it is unlikely to have occurred just by random chance if there were really no effect. In practice: you set up a null hypothesis (no effect / no difference), calculate how surprising your data would be under it (the p-value), and if that p-value falls below a chosen threshold — the significance level, usually 0.05 — you call the result significant and reject the null hypothesis. What it does and doesn't tell you: it says the pattern is probably not a fluke, but it does NOT tell you the effect is big, useful or important — with a huge sample, a trivially small difference can be "significant." Conversely, a real effect can fail to reach significance if the study is too small (low "statistical power"). "Significant" in this technical sense just means "detectable above the noise," not "significant" in the everyday sense of "meaningful."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-central-limit-theorem',
    title: 'What the Central Limit Theorem Is',
    category: 'Statistics',
    keywords: [
      'what is the central limit theorem', 'central limit theorem explained', 'why is the sample mean normally distributed',
      'what does the CLT say', 'how big does a sample need to be for the CLT', 'why does the bell curve appear everywhere',
    ],
    content: `The central limit theorem (CLT) says that if you take many independent random samples of the same size from any population and compute the average (or the sum) of each sample, the distribution of those sample averages will be approximately a normal (bell-shaped) curve — even if the original population is not normal (skewed, bimodal, uniform, whatever). The approximation gets better as the sample size grows; a common rule of thumb is n ≥ 30, though very skewed populations need more. The average of the sample means equals the population mean, and their spread (the "standard error") is the population standard deviation divided by √n — so bigger samples give more tightly clustered, more reliable estimates. The CLT is why so much of statistics (confidence intervals, many hypothesis tests) can assume normality for averages, and part of why the bell curve appears throughout nature — many measurements are themselves sums of many small independent effects.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-variance',
    title: 'What Variance Is',
    category: 'Statistics',
    keywords: [
      'what is variance', 'how is variance calculated', 'variance vs standard deviation', 'what does variance measure',
      'why is variance in squared units', 'population variance vs sample variance',
    ],
    content: `Variance is a measure of how spread out a set of numbers is: it's the average of the squared differences between each value and the mean. Steps: subtract the mean from every value (the deviations), square each deviation, then average them (dividing by n for a whole population, or by n − 1 when estimating from a sample). Squaring makes all terms positive and gives extra weight to values far from the mean. A variance of 0 means every value is identical; larger variance means more dispersion. Its main drawback is that it's in SQUARED units (e.g. "square centimetres" for a spread of heights), which isn't intuitive — so people usually report the standard deviation instead, which is just the square root of the variance and is back in the original units. Variance is still the more natural quantity for the mathematics (variances of independent things add together; standard deviations don't).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-percentile',
    title: 'What a Percentile Is',
    category: 'Statistics',
    keywords: [
      'what is a percentile', 'what does 90th percentile mean', 'percentile vs percentage', 'what is percentile rank',
      'what is the 50th percentile', 'what are quartiles', 'growth chart percentile',
    ],
    content: `A percentile tells you what fraction of a group scored below a given value. If your exam score is at the 90th percentile, you scored higher than about 90% of the people who took it (and lower than about 10%). It's not the same as a percentage: getting 90% on a test is about how many questions you got right; being in the 90th percentile is about how you rank against others, so a 60% raw score could be the 90th percentile on a hard test. The 50th percentile is the median (half above, half below). The 25th and 75th percentiles are the lower and upper quartiles, and the gap between them (the interquartile range) is a common measure of spread. Percentiles are used in standardised test scores, salary comparisons, and children's growth charts (a baby "on the 30th percentile for weight" is heavier than 30% of babies that age).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-base-rate-fallacy',
    title: 'What the Base Rate Fallacy Is',
    category: 'Statistics',
    keywords: [
      'what is the base rate fallacy', 'base rate neglect', 'why can a positive test result still probably be wrong',
      'base rate fallacy example', 'false positive paradox', 'why does a rare disease test mislead',
    ],
    content: `The base rate fallacy (base rate neglect) is ignoring how common something is in the population (the "base rate") and judging probability only from the specific evidence in front of you. The classic example: a disease affects 1 in 1,000 people, and a test is 99% accurate. You test positive — what's the chance you actually have it? Most people say ~99%, but the real answer is only about 9%. Why: out of 100,000 people, 100 have the disease (99 test positive) but 99,900 don't, and 1% of them — about 999 people — test positive anyway. So of ~1,098 positive results, only 99 are true, roughly 1 in 11. Because the disease is rare, false positives swamp true positives. The same mistake shows up in security screening, spam filters, DNA "matches," profiling, and everyday judgments ("he fits the description perfectly, so it must be him"). Bayes' theorem is the correct way to combine the base rate with the evidence.`,
    createdAt: Date.now(),
  },
];
