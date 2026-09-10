import { KnowledgeItem } from '../../types';

/**
 * STATISTICS_CONCEPTS_GAPS — batch 253 corrections. nexus-4b did well on most
 * stats contrasts (mean/median, variance/SD, parameter/statistic, type I/II,
 * p-value/CI, accuracy/precision, reliability/validity, probability/odds).
 * Misses:
 * - "histogram vs bar chart" answered about photography histograms.
 * - "interval vs ratio scales" answered about musical intervals.
 * - "bar chart vs pie chart" said a pie chart is "for continuous data".
 * - "range vs interquartile range" defined the range as Q3 minus Q1.
 * - "outlier vs anomaly" said an anomaly is "about how memory works".
 * - "internal vs external validity" answered about content validity.
 * - "t-test vs ANOVA", "cohort vs case-control", "correlational study vs
 *   experiment" were web dumps.
 * - "nominal vs ordinal", "correlation vs regression", "parametric vs
 *   non-parametric", "cross-sectional vs longitudinal" were cut off.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'statistics', keywords, content, createdAt: now,
});

export const STATISTICS_CONCEPTS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-stat-histogram-vs-bar-chart',
    'Histogram vs bar chart',
    [
      'difference between a histogram and a bar chart', 'a bar chart displays a categorical variable each bar a distinct separate category with gaps between the bars order can be rearranged compares categories', 'a histogram displays the distribution of a continuous numerical variable divided into consecutive bins the bars touch with no gaps because the x-axis is a continuous number line height shows the frequency in that range order is fixed shows the shape of a distribution',
      'not a photography brightness histogram',
    ],
    `Both use rectangular bars, but they show different kinds of data and are read differently.

A BAR CHART displays a CATEGORICAL variable. Each bar is a SEPARATE, distinct category — regions, product types, months, yes/no — and its height (or length) shows a count or value for that category. The bars have GAPS between them because the categories are unrelated, and you can REORDER them (alphabetically, by size) without losing meaning. A bar chart is for COMPARING categories.

A HISTOGRAM displays the DISTRIBUTION of a CONTINUOUS or numerical variable. The range of values is split into consecutive intervals ("BINS") — heights 150-160 cm, 160-170 cm, etc. — and each bar's height shows how many observations FALL IN that interval. The bars TOUCH with no gaps, because the x-axis is a continuous number line, and the order is FIXED (low to high). A histogram is for seeing the SHAPE of the data: where the centre is, how spread out it is, whether it is symmetric or skewed, whether it has one peak or several.

Quick test: if the x-axis labels are names/categories -> bar chart; if the x-axis is a number line cut into ranges -> histogram. (A photo-editing "histogram" is a histogram of pixel brightness values.)`,
  ),
  k(
    'kb-gap-stat-interval-vs-ratio',
    'Interval vs ratio scales (levels of measurement)',
    [
      'difference between interval and ratio scales', 'both are numerical with equal meaningful intervals between values', 'an interval scale has an arbitrary zero point zero does not mean absence you can add and subtract but not form ratios Celsius Fahrenheit calendar year IQ longitude',
      'a ratio scale has a true absolute zero meaning none of the quantity so all arithmetic including ratios is valid height weight age income distance count Kelvin', 'not musical intervals',
    ],
    `These are two of the four "levels of measurement" (nominal, ordinal, interval, ratio). Both interval and ratio scales are NUMERICAL with EQUAL, meaningful gaps between consecutive units, so you can add and subtract. The difference is the ZERO POINT.

An INTERVAL scale has an ARBITRARY zero — zero does NOT mean "none of the thing". So differences are meaningful but RATIOS are not. Examples: temperature in CELSIUS or FAHRENHEIT (0 C is not "no temperature", and 20 C is not "twice as hot" as 10 C); calendar YEARS (year 0 is arbitrary); IQ scores; longitude; a pH scale; dates. You can say "10 degrees warmer" but not "twice as warm".

A RATIO scale has a TRUE, ABSOLUTE zero that means the complete ABSENCE of the quantity. So all arithmetic works, INCLUDING ratios: 20 kg really is TWICE 10 kg; someone earning $80,000 earns twice someone on $40,000. Examples: height, weight, age, length, duration, income, counts, reaction time, and temperature in KELVIN (0 K is absolute zero — genuinely no thermal energy).

Why it matters: the scale level determines which statistics and tests are valid. Ratio data supports the geometric mean, coefficient of variation, and ratio statements; interval data does not. (This is nothing to do with musical intervals like octaves and fifths.)`,
  ),
  k(
    'kb-gap-stat-bar-vs-pie-chart',
    'Bar chart vs pie chart',
    [
      'difference between a bar chart and a pie chart', 'both display categorical data neither is for continuous data', 'a bar chart shows the value or count of each category as bar length good for comparing categories precisely works with many categories can show change over time and negative values',
      'a pie chart shows each category as a slice proportional to its share of a whole parts of 100 percent good for showing composition with only a few categories bad for precise comparison humans judge angles poorly useless with many slices or values that do not sum to a whole',
    ],
    `Both display CATEGORICAL data — NEITHER is for continuous data (that would be a histogram or line chart).

A BAR CHART represents each category as a BAR whose length is proportional to its value (a count, a total, a percentage, an average). Strengths: you can COMPARE categories precisely because the human eye judges lengths against a common baseline very well; it handles MANY categories; it can show negative values, grouped/stacked series, and change over time. It is the safe default for almost any category comparison.

A PIE CHART represents the whole as a circle and each category as a SLICE whose angle/area is proportional to that category's SHARE of the total. Its one legitimate use is showing COMPOSITION — "what fraction of the whole does each part make up" — when there are only a FEW categories (about 2-5) that genuinely SUM TO A MEANINGFUL WHOLE (100%).

Pie charts are widely criticised because people estimate ANGLES and AREAS poorly, so it is hard to tell which of two similar slices is bigger or to read exact values; they break down completely with many slices; and they cannot show negatives, values over 100%, or trends. When in doubt, use a bar chart.`,
  ),
  k(
    'kb-gap-stat-range-vs-iqr',
    'Range vs interquartile range',
    [
      'difference between the range and the interquartile range', 'the range is the maximum value minus the minimum value the two most extreme points highly sensitive to a single outlier', 'the interquartile range IQR is Q3 minus Q1 the 75th percentile minus the 25th percentile the spread of the middle 50 percent of the data ignoring the extreme quarters robust to outliers',
      'the IQR is used to draw box plots and to flag outliers beyond 1.5 times the IQR', 'the range is NOT Q3 minus Q1',
    ],
    `Both measure how SPREAD OUT a dataset is, but they use different parts of it.

The RANGE is simply the MAXIMUM value MINUS the MINIMUM value — the distance between the two most EXTREME data points. It is easy to compute but extremely SENSITIVE to outliers: one freak value miles from the rest inflates the range enormously, so it can give a misleading picture of typical variability. (The range is NOT the difference between the 75th and 25th percentiles.)

The INTERQUARTILE RANGE (IQR) is the THIRD QUARTILE minus the FIRST QUARTILE — Q3 (the 75th percentile) minus Q1 (the 25th percentile). It is the width of the MIDDLE 50% of the data, once you have chopped off the lowest quarter and the highest quarter. Because it deliberately ignores the extremes, the IQR is ROBUST to outliers and gives a stable sense of the spread of the "bulk" of the values.

Uses of the IQR: it is the length of the box in a BOX PLOT, and a common rule flags a point as a likely OUTLIER if it lies more than 1.5 x IQR below Q1 or above Q3.

So: range = full spread including the extremes (fragile); IQR = spread of the central half (sturdy).`,
  ),
  k(
    'kb-gap-stat-outlier-vs-anomaly',
    'Outlier vs anomaly',
    [
      'difference between an outlier and an anomaly', 'an outlier is a data point that lies far from the bulk of the data a purely statistical description beyond 1.5 times the IQR or several standard deviations from the mean may be a genuine extreme a measurement error or from a different population', 'an anomaly is often used synonymously but tends to imply something genuinely unusual and noteworthy that may indicate a real event of interest fraud a fault an intrusion a novel phenomenon an outlier that means something',
      'in anomaly detection an anomaly is a pattern that does not conform to expected behaviour and warrants investigation',
    ],
    `The two terms overlap heavily and are often used interchangeably; the difference is mostly one of EMPHASIS.

An OUTLIER is a purely STATISTICAL description: a data point that sits FAR from the bulk of the data or from the pattern the rest of the data follows. It is flagged by rules — beyond 1.5 x the IQR from the quartiles, more than ~3 standard deviations from the mean, far off a regression line. Calling something an outlier says nothing about WHY it is extreme: it might be a genuine rare-but-real value, a measurement or data-entry error, or a case that actually belongs to a different population. Analysts investigate outliers and decide whether to keep, correct, or exclude them.

An ANOMALY usually carries the extra connotation of something GENUINELY UNUSUAL and NOTEWORTHY — an outlier that MEANS something. In monitoring, security, and machine learning, "ANOMALY DETECTION" looks for data points or patterns that do not conform to expected normal behaviour because they may signal a real event worth acting on: fraud, a machine fault, a network intrusion, a disease outbreak, a sensor failure, a new phenomenon.

Loose rule: every anomaly is an outlier, but "outlier" is neutral about the cause and often about a single number in a calculation, whereas "anomaly" implies the deviation is significant and calls for explanation.`,
  ),
  k(
    'kb-gap-stat-internal-vs-external-validity',
    'Internal vs external validity',
    [
      'difference between internal and external validity', 'internal validity is the degree to which a study establishes a genuine cause-and-effect relationship between the independent and dependent variable free from confounds bias and alternative explanations high in tightly controlled experiments', 'external validity is the degree to which the findings generalise beyond the study to other people settings times and real-world conditions ecological validity is a subtype',
      'there is often a trade-off a controlled lab study has strong internal but weak external validity a naturalistic field study the reverse', 'distinct from construct and content validity of a measure',
    ],
    `These are about the quality of a STUDY (not about whether a test measures the right thing — that is construct/content validity of an instrument).

INTERNAL VALIDITY is how confidently a study can claim that the independent variable actually CAUSED the change in the dependent variable, rather than some other explanation. High internal validity requires ruling out CONFOUNDS, selection bias, history and maturation effects, regression to the mean, and experimenter/participant bias — achieved through random assignment, control groups, blinding, and standardised procedures. Tightly controlled laboratory EXPERIMENTS tend to have strong internal validity.

EXTERNAL VALIDITY is how well the study's findings GENERALISE beyond the specific conditions of the study — to other PEOPLE (different ages, cultures, not just undergraduates), other SETTINGS (the real world, not a lab), other TIMES, and other operationalisations of the variables. "Ecological validity" — whether the task and setting resemble everyday life — is a component of it.

There is frequently a TRADE-OFF: the more you control and standardise a study to nail down causation (internal validity), the more artificial it becomes, weakening generalisation (external validity); a naturalistic field study is realistic (external) but has more uncontrolled variables (weaker internal). Replication across settings and populations is how researchers build external validity over time.`,
  ),
  k(
    'kb-gap-stat-ttest-vs-anova',
    't-test vs ANOVA',
    [
      'difference between a t-test and ANOVA', 'a t-test compares the means of two groups or one group against a value', 'ANOVA analysis of variance compares the means of three or more groups simultaneously with a single omnibus F-test by partitioning total variance into between-group and within-group components',
      'running many t-tests inflates the type I error rate ANOVA controls it with one test if ANOVA is significant follow with post-hoc pairwise comparisons Tukey Bonferroni', 'a t-test is a special case of ANOVA with two groups F equals t squared',
    ],
    `A t-TEST compares the means of exactly TWO things: two independent groups (independent-samples t-test), one group measured twice (paired t-test), or one sample mean against a fixed value (one-sample t-test). It gives a t-statistic and a p-value.

ANOVA (Analysis of Variance) compares the means of THREE OR MORE groups AT ONCE. It works by splitting the total variability in the data into "BETWEEN-GROUP" variance (how far the group means are from the overall mean) and "WITHIN-GROUP" variance (the scatter inside each group), then forming the F-STATISTIC = between-group variance / within-group variance. A large F means the group means differ by more than you would expect from the noise within groups.

Why not just run several t-tests on every pair? Because each test has its own Type I error risk (say 5%), and doing many of them makes the chance of at least one FALSE POSITIVE balloon. ANOVA gives ONE overall ("omnibus") test that controls that error rate. If the ANOVA is significant, you then run POST-HOC pairwise comparisons (Tukey HSD, Bonferroni, Scheffe) to find out WHICH specific groups differ.

A t-test is actually a special case of ANOVA with two groups — run both and you find F = t squared, same p-value. ANOVA also extends to multiple factors (two-way ANOVA), interactions, and repeated measures.`,
  ),
  k(
    'kb-gap-stat-cohort-vs-case-control',
    'Cohort study vs case-control study',
    [
      'difference between a cohort study and a case-control study', 'a cohort study starts with exposure status classifies people by whether they have a risk factor and follows them forward in time to see who develops the outcome measures incidence and relative risk directly can study multiple outcomes expensive slow inefficient for rare outcomes', 'a case-control study starts with the outcome identifies people who already have the disease cases and a comparable group who do not controls then looks backward to compare past exposures fast cheap efficient for rare diseases can examine multiple exposures vulnerable to recall and selection bias yields an odds ratio',
      'cohort goes exposure to outcome forward case-control goes outcome to exposure backward',
    ],
    `Both are OBSERVATIONAL epidemiological designs (no manipulation) for studying links between an exposure/risk factor and a health outcome. They differ in where they START and which way they LOOK.

A COHORT STUDY starts with EXPOSURE. You take a group ("cohort") of people who are free of the outcome, classify them by whether they have the exposure (smokers vs non-smokers; a particular gene; an occupation), and FOLLOW THEM FORWARD IN TIME to record who develops the outcome (lung cancer, heart disease). It can be prospective (follow into the future) or retrospective (use existing records). Advantages: measures INCIDENCE directly, gives RELATIVE RISK, establishes that exposure preceded outcome, and can track MANY outcomes from one exposure. Drawbacks: expensive, slow, needs large samples, and is inefficient for RARE outcomes and long latency periods, with loss to follow-up over time.

A CASE-CONTROL STUDY starts with the OUTCOME. You identify people who ALREADY HAVE the disease ("cases") and a comparable group who do not ("controls"), then look BACKWARD to compare their PAST EXPOSURES. Advantages: fast, cheap, small samples, and ideal for RARE diseases and for examining MANY possible exposures at once. Drawbacks: prone to RECALL BIAS (cases remember exposures differently) and SELECTION BIAS in choosing controls, cannot measure incidence, and gives an ODDS RATIO rather than direct risk.

Mnemonic: cohort = "exposure -> outcome", forward in time; case-control = "outcome -> exposure", backward in time.`,
  ),
  k(
    'kb-gap-stat-correlational-vs-experiment',
    'Correlational study vs experiment',
    [
      'difference between a correlational study and an experiment', 'an experiment involves the researcher actively manipulating an independent variable and using control including random assignment to isolate its effect on a dependent variable which permits causal conclusions', 'a correlational study only observes and measures two or more variables as they naturally occur without manipulation and quantifies their association it can establish that variables are related and predict one from another but cannot establish causation because of confounding and directionality',
      'correlation does not equal causation experiments have higher internal validity for causal claims correlational studies used when manipulation is impossible or unethical',
    ],
    `The key difference is MANIPULATION and CONTROL.

In an EXPERIMENT the researcher actively MANIPULATES an independent variable (assigns some participants to the treatment, others to a control), holds other conditions constant, and ideally uses RANDOM ASSIGNMENT so the groups start out equivalent. Because the only systematic difference between the groups is the manipulated variable, any resulting difference in the outcome can be attributed to it — an experiment can support a CAUSAL conclusion ("X causes Y"). This gives high internal validity.

In a CORRELATIONAL (observational) study the researcher only OBSERVES and MEASURES variables as they already exist in the world — no manipulation, no assignment — and quantifies how they are ASSOCIATED (e.g. with a correlation coefficient or a regression model). It can show that two variables move together and can be used to PREDICT one from the other, but it CANNOT establish causation, for two reasons: the THIRD-VARIABLE problem (a confounder may cause both) and DIRECTIONALITY (does A cause B, or B cause A?). Hence "correlation does not imply causation".

Correlational studies are used when an experiment is IMPOSSIBLE or UNETHICAL (you cannot randomly assign people to smoke, to be abused, or to a gender), and when studying real-world relationships at scale. Experiments are used when you can manipulate the variable and want a causal answer.`,
  ),
  k(
    'kb-gap-stat-nominal-vs-ordinal',
    'Nominal vs ordinal data',
    [
      'difference between nominal and ordinal data', 'nominal data are labels or categories with no inherent order colours blood types nationality yes or no you can only count them and find the mode', 'ordinal data are categories that do have a meaningful order or rank but the intervals between them are not necessarily equal or defined Likert scales education level finishing positions T-shirt sizes',
      'with ordinal you can also find the median and use rank-based methods but not meaningfully average them', 'these are the two lowest levels of measurement',
    ],
    `Both are CATEGORICAL (qualitative) levels of measurement; the difference is whether the categories can be put in ORDER.

NOMINAL data are pure LABELS with NO inherent order. The categories are just different from each other — you cannot say one is "more" or "higher" than another. Examples: eye colour, blood type, nationality, brand, marital status, yes/no, the numbers on football shirts (a number, but not a quantity). All you can do with nominal data is COUNT how many fall in each category, report proportions, find the MODE, and use tests like chi-square. Averaging is meaningless.

ORDINAL data are categories that HAVE a meaningful ORDER or RANK, but the GAPS between them are not equal or not defined. Examples: survey responses (strongly disagree < disagree < neutral < agree < strongly agree), education level (primary < secondary < degree), military rank, race finishing positions (1st, 2nd, 3rd — but the time gaps differ), T-shirt sizes (S < M < L), pain scores, star ratings. With ordinal data you can additionally report the MEDIAN and percentiles, and use rank-based ("non-parametric") methods. But you should NOT treat the codes as real numbers and average them, because "the distance from disagree to neutral" is not guaranteed to equal "the distance from neutral to agree".

(The two higher levels — interval and ratio — add equal, meaningful numeric spacing.)`,
  ),
  k(
    'kb-gap-stat-correlation-vs-regression',
    'Correlation vs regression',
    [
      'difference between correlation and regression', 'correlation measures the strength and direction of the linear relationship between two variables with a single number Pearson r from -1 to +1 it is symmetric and unit-free and says nothing about which variable predicts which or by how much', 'regression fits an equation a line y equals a plus b x that models how the outcome changes as a function of one or more predictors it is directional gives a slope in real units and an intercept lets you predict y for a given x and extends to multiple predictors',
      'correlation quantifies association regression models and predicts',
    ],
    `They are related — both describe how two (or more) variables move together — but they answer different questions.

CORRELATION gives a SINGLE NUMBER summarising the STRENGTH and DIRECTION of the (linear) relationship between two variables: Pearson's r, ranging from -1 (perfect negative) through 0 (none) to +1 (perfect positive). It is:
- SYMMETRIC: the correlation of X with Y equals the correlation of Y with X — there is no "predictor" and "outcome";
- UNIT-FREE: it does not change if you rescale the variables;
- silent about the SLOPE — an r of 0.9 tells you the points cluster tightly around a line, but not how steep that line is or in what units.

REGRESSION fits an EQUATION — for simple linear regression, a line y = a + b*x — that models how the DEPENDENT (outcome) variable changes as a function of one or more INDEPENDENT (predictor) variables. It is:
- DIRECTIONAL: "Y regressed on X" is different from "X regressed on Y" — you choose which variable is the outcome;
- gives a SLOPE (b) in real units — "each extra year of education is associated with $X more income" — plus an intercept;
- lets you PREDICT a value of Y for a given X, and put a prediction interval on it;
- extends to MULTIPLE predictors, categorical predictors, curves, and interactions.

In short: correlation measures how tightly two things are associated; regression builds a model to explain and predict one variable from others. (For a simple two-variable case, the regression slope, r, and R-squared are all mathematically linked.)`,
  ),
  k(
    'kb-gap-stat-parametric-vs-nonparametric',
    'Parametric vs non-parametric tests',
    [
      'difference between a parametric and a non-parametric test', 'parametric tests assume the data come from a distribution with a particular form usually normal plus assumptions like equal variances and interval or ratio data when those hold they are more powerful t-test ANOVA Pearson correlation linear regression', 'non-parametric distribution-free tests make fewer assumptions typically work on ranks or medians robust to non-normality outliers small samples and ordinal data at the cost of some power Mann-Whitney Wilcoxon Kruskal-Wallis Spearman chi-square',
    ],
    `PARAMETRIC tests assume the data were generated by a distribution of a specific SHAPE with defined PARAMETERS — most commonly the NORMAL (bell-curve) distribution — and they usually add assumptions such as HOMOGENEITY OF VARIANCE (equal spread across groups), independence, and INTERVAL/RATIO-level data. When those assumptions genuinely hold, parametric tests are more POWERFUL — they are more likely to detect a real effect for a given sample size — and they estimate meaningful quantities (means, mean differences, slopes). Examples: the t-test, ANOVA, Pearson correlation, and linear regression.

NON-PARAMETRIC ("distribution-free") tests make FEWER or WEAKER assumptions about the underlying distribution. Most of them work on the RANKS of the data (or on medians, or on counts) rather than the raw values, which makes them ROBUST to: non-normal data, skew, OUTLIERS, small samples, and merely ORDINAL data. The trade-off is a modest loss of statistical POWER when the parametric assumptions actually would have held. Examples (with their parametric counterparts): Mann-Whitney U / Wilcoxon rank-sum (vs independent t-test), Wilcoxon signed-rank (vs paired t-test), Kruskal-Wallis (vs one-way ANOVA), Spearman's rho (vs Pearson r), and the chi-square test for categorical data.

Practical rule: check the assumptions (normality via a plot, variance via a test); with reasonably large samples the t-test and ANOVA are fairly robust to mild non-normality, but with small samples, heavy skew, outliers, or ordinal outcomes, switch to the non-parametric version.`,
  ),
  k(
    'kb-gap-stat-cross-sectional-vs-longitudinal',
    'Cross-sectional vs longitudinal study',
    [
      'difference between a cross-sectional and a longitudinal study', 'cross-sectional data collected at one point in time across a sample often comparing different age groups a snapshot fast and cheap but cannot track change within individuals or establish temporal order and confounds cohort effects with age', 'longitudinal the same subjects followed and measured repeatedly over time can track development and change and better establish that a cause preceded an effect but expensive slow and prone to attrition and practice effects',
    ],
    `A CROSS-SECTIONAL study collects data at ONE point in time from a sample. To study change with age or over a career, it compares DIFFERENT people who are at different stages right now (measure 20-year-olds, 40-year-olds, and 60-year-olds today, once). It is FAST, CHEAP, and good for estimating the current prevalence of something and for generating hypotheses. Weaknesses: it cannot observe change WITHIN a person, it cannot establish which variable came first (temporal order), and it CONFOUNDS age with "cohort effects" — the 60-year-olds grew up in a different era, not just older.

A LONGITUDINAL study follows the SAME subjects over time, measuring them REPEATEDLY (the same people at 20, then 40, then 60). It can directly observe DEVELOPMENT and CHANGE, individual trajectories, and the SEQUENCE of events, which strengthens (though does not prove) causal claims because it can show a predictor preceded an outcome. Weaknesses: it is EXPENSIVE, SLOW (you may wait decades), suffers ATTRITION (participants drop out, often non-randomly), and can have practice/testing effects from repeated measurement.

Hybrids exist: a "cohort-sequential" or "accelerated longitudinal" design follows several age cohorts for a few years each to get longitudinal information faster.`,
  ),
  k(
    'kb-gap-stat-sd-vs-se',
    'Standard deviation vs standard error',
    [
      'difference between the standard deviation and the standard error', 'the standard deviation measures the spread of individual data points around the mean of a sample or population it describes the data', 'the standard error of the mean measures how much the sample mean would vary from sample to sample it describes the precision of your estimate of the mean SE equals SD divided by the square root of n',
      'SE shrinks as the sample gets bigger SD does not systematically shrink use SD to describe variability SE or a confidence interval to express uncertainty in an estimate',
    ],
    `They sound similar and are related by a formula, but they describe different things.

The STANDARD DEVIATION (SD) measures how spread out the INDIVIDUAL DATA POINTS are around the mean, within one dataset. A small SD means the values cluster tightly near the mean; a large SD means they are widely scattered. It is a property of the DATA (or of the population), and it does NOT systematically get smaller as you collect more data — with a bigger sample your estimate of the population SD just gets more accurate, converging on the true value.

The STANDARD ERROR (SE), usually the "standard error of the MEAN", measures how much the SAMPLE MEAN itself would bounce around from one sample to the next if you repeatedly drew fresh samples of the same size from the same population. It describes the PRECISION of your estimate of the mean, not the spread of the raw data. It is computed as SE = SD / sqrt(n).

Because of that sqrt(n) in the denominator, the SE SHRINKS as the sample grows — more data gives a more precise estimate of the mean. This is why a 95% confidence interval for the mean is roughly mean +/- 2 x SE.

Rule of thumb: report the SD (or a range) when you want to describe how variable the individuals are; report the SE or a confidence interval when you want to express how uncertain your estimate of a summary quantity (like the mean) is. Error bars on a graph should say which one they show.`,
  ),
];
