import type { Unit } from '../../../types';

export const psySection17Part2: Unit[] = [
  // ========================================================================
  // UNIT 6: Effect Sizes & Confidence Intervals
  // ========================================================================
  {
    id: 'psy-sec17-u6',
    title: 'Effect Sizes & CIs',
    description: 'P-values tell you if an effect exists. Effect sizes tell you if it matters.',
    color: '#F97316',
    icon: '📏',
    sectionIndex: 17,
    sectionTitle: 'Statistics & Methods',
    lessons: [
      // ===== LESSON 1: Cohen's d =====
      {
        id: 'psy-sec17-u6-L1',
        title: "Cohen's d",
        description: 'The most common effect size for comparing two groups.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u6-L1-T1',
            type: 'teaching',
            question: 'What is an effect size?',
            explanation:
              'An effect size is a number that tells you how big or meaningful a difference is. A p-value only says whether a difference is likely real. The effect size says whether it actually matters in the real world.',
            hint: 'Think of p-value as "Is it real?" and effect size as "Is it big enough to care about?"',
          },
          {
            id: 'psy-sec17-u6-L1-Q1',
            type: 'multiple-choice',
            question: 'A study finds p < 0.001 with a Cohen\'s d of 0.05. What does this tell you?',
            options: [
              'The effect is large and important',
              'The effect is statistically significant but trivially small',
              'The study failed to find an effect',
              'The sample size was too small',
            ],
            correctIndex: 1,
            explanation:
              'A tiny d (0.05) with a very small p-value means the effect is real but practically meaningless. Large samples can detect tiny effects.',
            distractorExplanations: {
              0: 'A Cohen\'s d of 0.05 is far below the "small" threshold of 0.2. The effect is trivial despite being statistically significant.',
              2: 'The p-value is highly significant, so an effect was detected. It is just extremely small.',
              3: 'Actually, a very small p with a tiny effect size usually means the sample was very large, not too small.',
            },
          },
          {
            id: 'psy-sec17-u6-L1-T2',
            type: 'teaching',
            question: "Cohen's d benchmarks",
            explanation:
              'Cohen\'s d measures the difference between two group means in standard deviation units. Benchmarks: 0.2 = small, 0.5 = medium, 0.8 = large. A d of 0.5 means the groups differ by half a standard deviation.',
          },
          {
            id: 'psy-sec17-u6-L1-Q2',
            type: 'sort-buckets',
            question: "Classify each Cohen's d value by its conventional size:",
            options: [
              'd = 0.15',
              'd = 0.50',
              'd = 0.90',
              'd = 0.22',
              'd = 0.75',
              'd = 1.20',
            ],
            buckets: ['Small (0.2)', 'Medium (0.5)', 'Large (0.8)'],
            correctBuckets: [0, 1, 2, 0, 1, 2],
            explanation:
              'Small is around 0.2, medium around 0.5, and large around 0.8 or above. These are rough guides, not rigid cutoffs.',
          },
          {
            id: 'psy-sec17-u6-L1-Q3',
            type: 'true-false',
            question: "A Cohen's d of 0.5 means the treatment group scored 50% better than the control group.",
            correctAnswer: false,
            explanation:
              "Cohen's d = 0.5 means the groups differ by half a standard deviation, not 50%. It is measured in SD units, not percentages.",
            distractorExplanations: {
              0: "Cohen's d is measured in standard deviation units, not percentages. d = 0.5 means half an SD apart.",
            },
          },
          {
            id: 'psy-sec17-u6-L1-Q4',
            type: 'fill-blank',
            question: "A Cohen's d of 0.8 or larger is conventionally considered a _____ effect.",
            blanks: ['large'],
            wordBank: ['small', 'medium', 'large', 'trivial', 'massive'],
            explanation: "Cohen's benchmarks: 0.2 = small, 0.5 = medium, 0.8 = large.",
          },
          {
            id: 'psy-sec17-u6-L1-Q5',
            type: 'scenario',
            question: 'What should this researcher conclude?',
            scenario:
              "A therapy study with 500 participants per group finds the therapy group improves by 0.3 points more than the control on a 100-point scale. The result is p = 0.01, Cohen's d = 0.03.",
            options: [
              'The therapy is highly effective because p < 0.05',
              'The therapy works but the improvement is too small to be practically useful',
              'The study needs more participants to detect a meaningful effect',
              'The p-value must be wrong if the effect size is that small',
            ],
            correctIndex: 1,
            explanation:
              'With 500 per group, even a tiny difference reaches significance. But d = 0.03 is trivially small. The therapy is real but not worth implementing.',
            distractorExplanations: {
              0: 'Statistical significance alone does not mean the effect is meaningful. A d of 0.03 is practically nothing.',
              2: 'The study already has 1,000 total participants. The problem is not sample size but that the effect is genuinely tiny.',
              3: 'Large samples routinely produce small p-values for tiny effects. Both numbers are valid.',
            },
          },
          {
            id: 'psy-sec17-u6-L1-Q6',
            type: 'multiple-choice',
            question: "Cohen's d is calculated by dividing the difference between two means by the...",
            options: [
              'Sample size',
              'Pooled standard deviation',
              'Standard error',
              'Variance',
            ],
            correctIndex: 1,
            explanation:
              "Cohen's d = (M1 - M2) / pooled SD. This expresses the difference in standard deviation units.",
            distractorExplanations: {
              0: 'Dividing by sample size would give you the mean difference per person, not an effect size in SD units.',
              2: 'Dividing by standard error gives you a t-statistic, not Cohen\'s d.',
              3: 'Dividing by variance (SD squared) would give a different and less interpretable number.',
            },
          },
        ],
      },

      // ===== LESSON 2: Eta-Squared and Variance Explained =====
      {
        id: 'psy-sec17-u6-L2',
        title: 'Variance Explained',
        description: 'Eta-squared tells you how much of the total variation your variable accounts for.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u6-L2-T1',
            type: 'teaching',
            question: 'Eta-squared: the ANOVA effect size',
            explanation:
              'Eta-squared tells you what proportion of total variance in the outcome is explained by the independent variable. An eta-squared of 0.10 means the IV explains 10% of the variation in scores.',
            hint: 'Think of it as a pie chart: eta-squared is the slice your IV accounts for.',
          },
          {
            id: 'psy-sec17-u6-L2-Q1',
            type: 'slider-estimate',
            question: 'An ANOVA produces eta-squared = 0.14. What percentage of variance does the IV explain?',
            sliderMin: 0,
            sliderMax: 50,
            correctValue: 14,
            tolerance: 5,
            unit: '%',
            explanation:
              'Eta-squared of 0.14 means 14% of total variance is explained. By convention, 0.14 is a large effect for ANOVA.',
          },
          {
            id: 'psy-sec17-u6-L2-T2',
            type: 'teaching',
            question: 'Eta-squared benchmarks',
            explanation:
              'For ANOVA: small = 0.01 (1%), medium = 0.06 (6%), large = 0.14 (14%). These differ from Cohen\'s d benchmarks because they measure proportion of variance, not group separation.',
          },
          {
            id: 'psy-sec17-u6-L2-Q2',
            type: 'match-pairs',
            question: 'Match each eta-squared value to its conventional size:',
            options: [
              '0.01',
              '0.06',
              '0.14',
              '0.25',
            ],
            matchTargets: [
              'Small',
              'Medium',
              'Large',
              'Very large',
            ],
            correctMatches: [0, 1, 2, 3],
            explanation:
              'Eta-squared benchmarks: 0.01 = small, 0.06 = medium, 0.14 = large. Values above 0.14 are very large.',
          },
          {
            id: 'psy-sec17-u6-L2-Q3',
            type: 'true-false',
            question: 'Eta-squared can be directly compared to Cohen\'s d because they both measure the same thing.',
            correctAnswer: false,
            explanation:
              "They measure different things. Cohen's d measures separation between two means in SD units. Eta-squared measures proportion of variance explained. You cannot directly compare them.",
            distractorExplanations: {
              0: "Cohen's d and eta-squared are on completely different scales. One is in SD units, the other is a proportion.",
            },
          },
          {
            id: 'psy-sec17-u6-L2-Q4',
            type: 'multiple-choice',
            question: 'A three-group ANOVA has eta-squared = 0.02. How should you interpret this?',
            options: [
              'The groups are dramatically different',
              'The IV explains a small amount of variance in the outcome',
              'The result is not statistically significant',
              'The study needs a larger sample',
            ],
            correctIndex: 1,
            explanation:
              'Eta-squared of 0.02 is a small effect. The groups differ, but the IV explains only 2% of the total variation.',
            distractorExplanations: {
              0: 'An eta-squared of 0.02 is classified as small. The groups differ only slightly.',
              2: 'Effect size and significance are separate. A small effect can still be statistically significant with enough participants.',
              3: 'Sample size affects power, not effect size. A bigger sample would not change the eta-squared much.',
            },
          },
          {
            id: 'psy-sec17-u6-L2-Q5',
            type: 'fill-blank',
            question: 'Eta-squared represents the _____ of total variance in the dependent variable explained by the independent variable.',
            blanks: ['proportion'],
            wordBank: ['proportion', 'mean', 'deviation', 'correlation', 'sum'],
            explanation:
              'Eta-squared is a proportion, ranging from 0 to 1, representing the fraction of outcome variance accounted for.',
          },
          {
            id: 'psy-sec17-u6-L2-Q6',
            type: 'scenario',
            question: 'Which effect size should this researcher report?',
            scenario:
              'A researcher runs a one-way ANOVA comparing anxiety levels across four therapy types. The ANOVA is significant at p = 0.03. The journal requires an effect size.',
            options: [
              "Cohen's d, since it works for any group comparison",
              'Eta-squared, since it is the standard effect size for ANOVA',
              'Pearson r, since it measures relationships',
              'No effect size needed because p < 0.05 is enough',
            ],
            correctIndex: 1,
            explanation:
              "Eta-squared is the go-to effect size for ANOVA. Cohen's d is for two-group comparisons. Journals now require effect sizes alongside p-values.",
            distractorExplanations: {
              0: "Cohen's d compares exactly two means. With four groups, eta-squared is appropriate.",
              2: 'Pearson r is for correlations between continuous variables, not group comparisons.',
              3: 'APA standards require effect sizes. A p-value alone is never enough.',
            },
          },
        ],
      },

      // ===== LESSON 3: Confidence Intervals =====
      {
        id: 'psy-sec17-u6-L3',
        title: 'Confidence Intervals',
        description: 'A range of plausible values for the true population parameter.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u6-L3-T1',
            type: 'teaching',
            question: 'What is a confidence interval?',
            explanation:
              'A 95% confidence interval (CI) gives a range of values that is likely to contain the true population parameter. If you repeated the study 100 times, about 95 of those CIs would capture the true value.',
            hint: 'A CI is like a net. A wider net is more likely to catch the fish (true value), but tells you less precisely where it is.',
          },
          {
            id: 'psy-sec17-u6-L3-Q1',
            type: 'multiple-choice',
            question: 'A 95% CI for a mean is [12.3, 18.7]. What does this mean?',
            options: [
              'There is a 95% chance the true population mean is between 12.3 and 18.7',
              '95% of individual scores fall between 12.3 and 18.7',
              'The sample mean is 95% accurate',
              'If we repeated this study many times, about 95% of the intervals would capture the true mean',
            ],
            correctIndex: 3,
            explanation:
              'The correct interpretation is about long-run coverage. We cannot say there is a 95% probability for any single interval; the true mean either is or is not inside it.',
            distractorExplanations: {
              0: 'This is the most common misinterpretation. The 95% refers to the method, not to the probability that this specific interval contains the true mean.',
              1: 'CIs are about the mean, not individual scores. Individual scores spread much more widely.',
              2: 'Accuracy of the sample mean is described by standard error, not the confidence level.',
            },
          },
          {
            id: 'psy-sec17-u6-L3-T2',
            type: 'teaching',
            question: 'Width of a CI',
            explanation:
              'Wider CIs mean less precision. Three things make CIs wider: smaller sample sizes, more variability in the data, and higher confidence levels (99% CI is wider than 95% CI).',
          },
          {
            id: 'psy-sec17-u6-L3-Q2',
            type: 'sort-buckets',
            question: 'Which factors make a confidence interval wider vs narrower?',
            options: [
              'Larger sample size',
              'More variability in data',
              'Higher confidence level (99%)',
              'Lower confidence level (90%)',
              'Less variability in data',
              'Smaller sample size',
            ],
            buckets: ['Narrower CI', 'Wider CI'],
            correctBuckets: [0, 1, 1, 0, 0, 1],
            explanation:
              'Large samples, less variability, and lower confidence levels all produce narrower (more precise) intervals.',
          },
          {
            id: 'psy-sec17-u6-L3-Q3',
            type: 'true-false',
            question: 'A 99% confidence interval is always narrower than a 95% CI for the same data.',
            correctAnswer: false,
            explanation:
              'Higher confidence requires a wider net. A 99% CI is always wider than a 95% CI from the same data because you need more range to be more confident.',
            distractorExplanations: {
              0: 'More confidence means a wider interval. You trade precision for certainty.',
            },
          },
          {
            id: 'psy-sec17-u6-L3-Q4',
            type: 'multiple-choice',
            question: 'A 95% CI for the difference between two groups is [-0.5, 3.2]. What can you conclude?',
            options: [
              'The difference is statistically significant at p < 0.05',
              'The difference is not statistically significant at p < 0.05',
              'The groups are identical',
              'The effect size is large',
            ],
            correctIndex: 1,
            explanation:
              'The CI includes zero, meaning no difference is a plausible value. When a CI for a difference includes zero, the result is not significant at that alpha level.',
            distractorExplanations: {
              0: 'If the CI includes zero, the difference might be zero. This means it is not significant at the 0.05 level.',
              2: 'The CI spans from negative to positive, but we cannot say the groups are identical. We just lack strong evidence of a difference.',
              3: 'You cannot determine effect size from this information alone. The CI tells you about precision, not magnitude in standardized units.',
            },
          },
          {
            id: 'psy-sec17-u6-L3-Q5',
            type: 'fill-blank',
            question: 'When a 95% CI for a mean difference includes _____, the result is not statistically significant at p < 0.05.',
            blanks: ['zero'],
            wordBank: ['zero', 'one', 'the mean', 'infinity', 'the median'],
            explanation:
              'If zero (no difference) is inside the interval, then no difference is a plausible outcome, so we cannot reject the null.',
          },
          {
            id: 'psy-sec17-u6-L3-Q6',
            type: 'scenario',
            question: 'Which study gives a more precise estimate of the treatment effect?',
            scenario:
              "Study A reports a mean improvement of 5 points, 95% CI [4.2, 5.8]. Study B reports a mean improvement of 5 points, 95% CI [1.0, 9.0]. Both studies find the same average improvement.",
            options: [
              'Study B, because its CI covers more possibilities',
              'Study A, because its narrow CI indicates greater precision',
              'Both are equally precise because they have the same mean',
              'Neither is precise because CIs always have uncertainty',
            ],
            correctIndex: 1,
            explanation:
              "Study A's narrow CI (1.6 wide) pins down the true effect much more precisely than Study B's wide CI (8.0 wide).",
            distractorExplanations: {
              0: 'A wider CI means less precision, not more. Study B has much more uncertainty about the true effect.',
              2: 'Equal means do not mean equal precision. The CI width matters enormously.',
              3: 'All estimates have uncertainty, but Study A has far less of it.',
            },
          },
        ],
      },

      // ===== LESSON 4: Practical vs Statistical Significance =====
      {
        id: 'psy-sec17-u6-L4',
        title: 'Practical vs Statistical Significance',
        description: 'A significant p-value does not always mean a meaningful real-world difference.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u6-L4-T1',
            type: 'teaching',
            question: 'Two kinds of significance',
            explanation:
              'Statistical significance means the effect is unlikely due to chance (p < 0.05). Practical significance means the effect is large enough to matter in the real world. A study can be statistically significant but practically meaningless.',
          },
          {
            id: 'psy-sec17-u6-L4-Q1',
            type: 'category-swipe',
            question: 'Swipe each finding to "Practically significant" or "Trivially small":',
            options: [
              'New drug lowers blood pressure by 0.1 mmHg (p = 0.001, N = 50,000)',
              'Therapy reduces depression scores by 15 points on a 60-point scale (d = 0.9)',
              'Training improves test scores by 0.3 points out of 100 (d = 0.02)',
              'Exercise program reduces anxiety by 1 full standard deviation (d = 1.0)',
              'Font color change increases reading speed by 0.01 seconds (p = 0.04)',
            ],
            buckets: ['Practically significant', 'Trivially small'],
            correctBuckets: [1, 0, 1, 0, 1],
            explanation:
              'Large effect sizes (d = 0.9, d = 1.0, 15-point improvements) are practically meaningful. Tiny effects detected by huge samples or barely significant p-values are trivial.',
          },
          {
            id: 'psy-sec17-u6-L4-Q2',
            type: 'true-false',
            question: 'With a large enough sample, virtually any tiny difference can reach statistical significance.',
            correctAnswer: true,
            explanation:
              'This is a fundamental insight. Large samples give enormous statistical power, detecting even trivially small effects. This is why effect sizes are essential.',
            distractorExplanations: {
              1: 'Power increases with sample size. A study with millions of participants can detect a difference so small it has no practical importance.',
            },
          },
          {
            id: 'psy-sec17-u6-L4-T2',
            type: 'teaching',
            question: 'APA reporting standards',
            explanation:
              'The APA Publication Manual now requires effect sizes and confidence intervals alongside p-values. This shift happened because p-values alone are misleading. Readers need to know both whether an effect exists and how big it is.',
          },
          {
            id: 'psy-sec17-u6-L4-Q3',
            type: 'multi-select',
            question: 'Which should a well-reported study include? (Select all that apply)',
            options: [
              'p-value',
              'Effect size',
              'Confidence interval',
              'Only whether the result is "significant" or "not significant"',
              'Sample size',
            ],
            correctIndices: [0, 1, 2, 4],
            explanation:
              'Modern reporting requires p-values, effect sizes, CIs, and sample sizes. Simply saying "significant" or "not significant" is insufficient.',
          },
          {
            id: 'psy-sec17-u6-L4-Q4',
            type: 'scenario',
            question: 'How should this finding be interpreted?',
            scenario:
              'A nationwide study of 200,000 students finds that students who eat breakfast score 0.4 points higher on a 500-point standardized test (p < 0.001, d = 0.01).',
            options: [
              'Eating breakfast dramatically improves test scores',
              'The result is statistically significant but the effect is too small to matter for individual students',
              'The study is flawed because the effect is too small',
              'The p-value proves breakfast causes better scores',
            ],
            correctIndex: 1,
            explanation:
              'With 200,000 students, even a 0.4-point difference is detectable. But d = 0.01 is negligible. It would be misleading to recommend breakfast based on this alone.',
            distractorExplanations: {
              0: 'A 0.4-point increase on a 500-point test is practically invisible. "Dramatically" is a huge overstatement.',
              2: 'The study is not flawed. It correctly detected a real but tiny effect. The issue is interpretation, not methodology.',
              3: 'This is observational, not experimental. We cannot claim causation. Also, a tiny effect size does not support strong claims.',
            },
          },
          {
            id: 'psy-sec17-u6-L4-Q5',
            type: 'rank-order',
            question: 'Rank these from most to least useful for evaluating real-world importance:',
            rankCriteria: 'Usefulness for judging practical importance: most to least',
            steps: [
              'Effect size (d or eta-squared)',
              'Confidence interval width',
              'p-value',
              'Sample size alone',
            ],
            correctOrder: [0, 1, 2, 3],
            explanation:
              'Effect size directly tells you how big the effect is. CIs show precision. P-values only say "unlikely by chance." Sample size alone says nothing about importance.',
          },
        ],
      },

      // ===== LESSON 5 (Conversation): Interpreting Study Results =====
      {
        id: 'psy-sec17-u6-L-conv',
        title: 'Interpreting Study Results',
        description: 'Help a classmate understand what a published study really found.',
        icon: '💬',
        type: 'conversation',
        xpReward: 20,
        questions: [],
        conversationStartNodeId: 'psy-sec17-u6-L-conv-C1',
        conversationNodes: [
          {
            id: 'psy-sec17-u6-L-conv-C1',
            speaker: 'Narrator',
            message:
              "Your study partner Jamie is confused about a journal article they're reading for class. The article reports several statistics and Jamie needs help making sense of them.",
            nextNodeId: 'psy-sec17-u6-L-conv-C2',
          },
          {
            id: 'psy-sec17-u6-L-conv-C2',
            speaker: 'Jamie',
            message:
              "The paper says the treatment group improved significantly, p = 0.03, but Cohen's d is only 0.12. Does that mean the treatment works well?",
            options: [
              {
                text: 'The treatment has a real but tiny effect. A d of 0.12 is below the threshold for even a small effect.',
                nextNodeId: 'psy-sec17-u6-L-conv-C3',
                quality: 'great',
                feedback:
                  "Right. Statistically significant does not mean practically meaningful. A d of 0.12 is below Cohen's small benchmark of 0.2.",
              },
              {
                text: 'If it is significant, the treatment works. That is what p < 0.05 means.',
                nextNodeId: 'psy-sec17-u6-L-conv-C3',
                quality: 'poor',
                feedback:
                  'Significance only means the effect probably is not zero. It says nothing about whether the effect is large enough to matter.',
              },
              {
                text: 'The d of 0.12 is a medium effect, so it is moderately useful.',
                nextNodeId: 'psy-sec17-u6-L-conv-C3',
                quality: 'poor',
                feedback:
                  "A d of 0.12 is below the small threshold (0.2), not medium (0.5). It's a very small effect.",
              },
            ],
          },
          {
            id: 'psy-sec17-u6-L-conv-C3',
            speaker: 'Jamie',
            message:
              'Okay, the paper also says 95% CI for the mean difference is [0.2, 8.4]. The interval seems really wide. Is that a problem?',
            options: [
              {
                text: 'Yes, the wide CI means low precision. The true effect could be as small as 0.2 or as large as 8.4.',
                nextNodeId: 'psy-sec17-u6-L-conv-C4',
                quality: 'great',
                feedback:
                  'Exactly. A wide CI means the study does not pin down the true effect well. More data would narrow it.',
              },
              {
                text: 'No, as long as it does not include zero, the study is fine.',
                nextNodeId: 'psy-sec17-u6-L-conv-C4',
                quality: 'okay',
                feedback:
                  'True that excluding zero matches the significant p-value. But the width still tells you the estimate is imprecise.',
              },
              {
                text: 'The width does not matter. Only the p-value matters.',
                nextNodeId: 'psy-sec17-u6-L-conv-C4',
                quality: 'poor',
                feedback:
                  'CI width matters a great deal. It tells you how precisely the study estimated the effect.',
              },
            ],
          },
          {
            id: 'psy-sec17-u6-L-conv-C4',
            speaker: 'Jamie',
            message:
              'Last question. The paper says "eta-squared = 0.15" for their ANOVA. They tested three therapy types. Is that a big deal?',
            options: [
              {
                text: "Yes, 0.15 is a large effect by Cohen's benchmarks. The therapy type explains about 15% of the variance in outcomes.",
                nextNodeId: 'psy-sec17-u6-L-conv-C5',
                quality: 'great',
                feedback:
                  'Correct. An eta-squared above 0.14 is considered large. Therapy type accounts for a meaningful chunk of variance.',
              },
              {
                text: 'That is a small effect. 0.15 is close to zero.',
                nextNodeId: 'psy-sec17-u6-L-conv-C5',
                quality: 'poor',
                feedback:
                  'For eta-squared, 0.14 is already large. 0.15 means the IV explains 15% of variance, which is substantial.',
              },
              {
                text: 'I have no idea how to interpret eta-squared.',
                nextNodeId: 'psy-sec17-u6-L-conv-C5',
                quality: 'okay',
                feedback:
                  'Eta-squared benchmarks: 0.01 = small, 0.06 = medium, 0.14 = large. At 0.15, this is a large effect.',
              },
            ],
          },
          {
            id: 'psy-sec17-u6-L-conv-C5',
            speaker: 'Narrator',
            message:
              'Great work. You helped Jamie see that p-values, effect sizes, and confidence intervals each tell a different part of the story. Together they give a complete picture of what a study found.',
          },
        ],
      },

      // ===== LESSON 6: Effect Sizes Speed Round =====
      {
        id: 'psy-sec17-u6-L-speed',
        title: 'Effect Sizes Speed Round',
        description: "Rapid recall of effect size benchmarks and CI interpretation.",
        icon: '⚡',
        type: 'speed-round',
        xpReward: 20,
        questions: [],
        speedTimeLimit: 60,
        speedQuestions: [
          {
            id: 'psy-sec17-u6-L-speed-SQ1',
            question: "A Cohen's d of 0.2 is considered...",
            options: ['Trivial', 'Small', 'Medium', 'Large'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u6-L-speed-SQ2',
            question: "A Cohen's d of 0.8 is considered...",
            options: ['Small', 'Medium', 'Large', 'Negligible'],
            correctIndex: 2,
          },
          {
            id: 'psy-sec17-u6-L-speed-SQ3',
            question: 'An eta-squared of 0.06 is considered...',
            options: ['Small', 'Medium', 'Large', 'Trivial'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u6-L-speed-SQ4',
            question: 'A 95% CI that includes zero means the result is...',
            options: ['Significant', 'Not significant', 'Large', 'Biased'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u6-L-speed-SQ5',
            question: 'Effect size tells you the _____ of an effect.',
            options: ['Significance', 'Magnitude', 'Direction', 'Probability'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u6-L-speed-SQ6',
            question: "Cohen's d divides the mean difference by the...",
            options: ['Sample size', 'Pooled SD', 'Variance', 'Standard error'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u6-L-speed-SQ7',
            question: 'A wider confidence interval means...',
            options: ['More precision', 'Less precision', 'Larger effect', 'Better study'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u6-L-speed-SQ8',
            question: 'Increasing sample size makes the CI...',
            options: ['Wider', 'Narrower', 'Unchanged', 'Disappear'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u6-L-speed-SQ9',
            question: 'Which organization requires effect sizes in published papers?',
            options: ['FBI', 'APA', 'NASA', 'WHO'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u6-L-speed-SQ10',
            question: 'Eta-squared of 0.14 is considered...',
            options: ['Small', 'Medium', 'Large', 'Meaningless'],
            correctIndex: 2,
          },
          {
            id: 'psy-sec17-u6-L-speed-SQ11',
            question: 'A tiny effect can be statistically significant with...',
            options: ['Small samples', 'No control group', 'Large samples', 'Bad measures'],
            correctIndex: 2,
          },
          {
            id: 'psy-sec17-u6-L-speed-SQ12',
            question: 'A 99% CI is _____ than a 95% CI for the same data.',
            options: ['Narrower', 'Wider', 'Identical', 'Shorter'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u6-L-speed-SQ13',
            question: "Cohen's d of 0.5 means the groups differ by...",
            options: ['50%', 'Half an SD', '5 points', '0.5 points'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u6-L-speed-SQ14',
            question: 'Practical significance concerns whether an effect is...',
            options: ['Real', 'Replicable', 'Meaningful in the real world', 'Published'],
            correctIndex: 2,
          },
          {
            id: 'psy-sec17-u6-L-speed-SQ15',
            question: 'Eta-squared is the standard effect size for...',
            options: ['t-tests', 'Correlations', 'ANOVA', 'Chi-square'],
            correctIndex: 2,
          },
        ],
      },
    ],
  },

  // ========================================================================
  // UNIT 7: Advanced Research Designs
  // ========================================================================
  {
    id: 'psy-sec17-u7',
    title: 'Advanced Research Designs',
    description: 'Beyond simple experiments. Real research often requires sophisticated designs.',
    color: '#FB923C',
    icon: '🔬',
    sectionIndex: 17,
    sectionTitle: 'Statistics & Methods',
    lessons: [
      // ===== LESSON 1: Factorial Designs =====
      {
        id: 'psy-sec17-u7-L1',
        title: 'Factorial Designs',
        description: 'Two or more independent variables tested at once in a single experiment.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u7-L1-T1',
            type: 'teaching',
            question: 'What is a factorial design?',
            explanation:
              'A factorial design tests two or more independent variables simultaneously. A 2x2 design has two IVs, each with 2 levels, creating 4 conditions. This lets you study main effects (each IV separately) and interactions (do the IVs combine in unexpected ways?).',
            hint: 'Think of a 2x2 grid. Rows = one IV, columns = the other. Each cell is a unique condition.',
          },
          {
            id: 'psy-sec17-u7-L1-Q1',
            type: 'multiple-choice',
            question: 'A 2x3 factorial design has how many total conditions?',
            options: ['5', '6', '8', '23'],
            correctIndex: 1,
            explanation:
              'Multiply the levels: 2 x 3 = 6 conditions. Each participant is assigned to one of these 6 cells.',
            distractorExplanations: {
              0: 'You multiply the levels, not add them. 2 + 3 = 5 is wrong; 2 x 3 = 6 is correct.',
              2: '2 x 3 = 6, not 8. You would need a 2x4 or 2x2x2 design for 8 conditions.',
              3: '23 is 2 raised to the 3rd power, which is not how factorial notation works. The numbers are multiplied.',
            },
          },
          {
            id: 'psy-sec17-u7-L1-T2',
            type: 'teaching',
            question: 'Main effects vs interactions',
            explanation:
              'A main effect is the overall impact of one IV across all levels of the other. An interaction means the effect of one IV depends on the level of the other. For example: caffeine helps performance on easy tasks but hurts it on hard tasks.',
          },
          {
            id: 'psy-sec17-u7-L1-Q2',
            type: 'scenario',
            question: 'Is there an interaction in this study?',
            scenario:
              'A 2x2 study tests drug (drug vs placebo) and therapy (CBT vs none). Results: Drug alone improves symptoms by 5 points. CBT alone improves by 5 points. Drug + CBT together improves by 20 points.',
            options: [
              'No interaction. Both treatments work independently.',
              'Yes, there is an interaction. The combination produces a larger improvement than expected from adding the individual effects.',
              'There is only a main effect of drug.',
              'There is only a main effect of therapy.',
            ],
            correctIndex: 1,
            explanation:
              'If effects were simply additive, drug + CBT should produce 10 points (5+5). But 20 is much more, meaning the treatments interact synergistically.',
            distractorExplanations: {
              0: 'If there were no interaction, the combined effect should be 5 + 5 = 10. Getting 20 means they amplify each other.',
              2: 'Both drug and therapy show main effects, but the key finding is the interaction between them.',
              3: 'Both variables have main effects. The interaction is the most important finding here.',
            },
          },
          {
            id: 'psy-sec17-u7-L1-Q3',
            type: 'sort-buckets',
            question: 'Classify each finding as a main effect or an interaction:',
            options: [
              'Women score higher than men overall',
              'Caffeine helps on easy tasks but hurts on hard tasks',
              'Therapy A is better than Therapy B regardless of age',
              'Exercise reduces anxiety in young adults but not in older adults',
              'Students in morning classes score higher overall',
              'Noise harms introverts but not extroverts',
            ],
            buckets: ['Main effect', 'Interaction'],
            correctBuckets: [0, 1, 0, 1, 0, 1],
            explanation:
              'Main effects describe the overall impact of one variable. Interactions describe when the effect of one variable depends on another.',
          },
          {
            id: 'psy-sec17-u7-L1-Q4',
            type: 'fill-blank',
            question: 'In a factorial design, an _____ occurs when the effect of one IV depends on the level of another IV.',
            blanks: ['interaction'],
            wordBank: ['interaction', 'main effect', 'confound', 'correlation', 'outlier'],
            explanation:
              'An interaction means the IVs do not operate independently. The effect of one depends on the other.',
          },
          {
            id: 'psy-sec17-u7-L1-Q5',
            type: 'true-false',
            question: 'A 3x3 factorial design has 6 total conditions.',
            correctAnswer: false,
            explanation:
              '3 x 3 = 9 conditions. You multiply the number of levels of each factor.',
            distractorExplanations: {
              0: '3 x 3 = 9 conditions, not 6. You multiply the levels, not add them (3 + 3 = 6 would be wrong).',
            },
          },
          {
            id: 'psy-sec17-u7-L1-Q6',
            type: 'multiple-choice',
            question: 'Why are factorial designs more efficient than running separate experiments for each variable?',
            options: [
              'They require fewer participants because each person contributes data to multiple comparisons',
              'They always produce significant results',
              'They eliminate the need for random assignment',
              'They are simpler to analyze than single-variable designs',
            ],
            correctIndex: 0,
            explanation:
              'Every participant provides data for analyzing both main effects and the interaction, making factorial designs remarkably efficient.',
            distractorExplanations: {
              1: 'No design guarantees significant results. Factorial designs are efficient, not magical.',
              2: 'Factorial experiments still require random assignment to conditions.',
              3: 'Factorial designs are actually more complex to analyze because you must test main effects and interactions.',
            },
          },
        ],
      },

      // ===== LESSON 2: Mixed and Longitudinal Designs =====
      {
        id: 'psy-sec17-u7-L2',
        title: 'Mixed and Longitudinal Designs',
        description: 'Combining between-subjects and within-subjects factors, and studying change over time.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u7-L2-T1',
            type: 'teaching',
            question: 'Mixed designs',
            explanation:
              'A mixed design uses both between-subjects and within-subjects factors. For example: two therapy groups (between) are each measured at pre-test, mid-test, and post-test (within). This lets you compare groups while also tracking change over time.',
          },
          {
            id: 'psy-sec17-u7-L2-Q1',
            type: 'scenario',
            question: 'What type of design is this?',
            scenario:
              'Researchers randomly assign 60 patients to Drug A or Drug B (30 each). They measure depression at baseline, 4 weeks, and 8 weeks. They want to compare the two drugs and track improvement over time.',
            options: [
              'Purely between-subjects',
              'Purely within-subjects',
              'Mixed design (between + within)',
              'Correlational study',
            ],
            correctIndex: 2,
            explanation:
              'Drug group is between-subjects (each person gets one drug). Time is within-subjects (each person is measured at all three points). That makes it a mixed design.',
            distractorExplanations: {
              0: 'If it were purely between-subjects, each person would be measured only once.',
              1: 'If it were purely within-subjects, every person would receive both drugs.',
              3: 'There is an experimental manipulation (drug assignment), so this is not merely correlational.',
            },
          },
          {
            id: 'psy-sec17-u7-L2-T2',
            type: 'teaching',
            question: 'Longitudinal vs cross-sectional',
            explanation:
              'Longitudinal studies follow the same people over time (months or years). Cross-sectional studies compare different age groups at one point in time. Longitudinal designs are stronger for studying change but are expensive and lose participants over time (attrition).',
          },
          {
            id: 'psy-sec17-u7-L2-Q2',
            type: 'match-pairs',
            question: 'Match each design feature to its design type:',
            options: [
              'Same people measured repeatedly over years',
              'Different age groups tested at the same time',
              'Can detect individual change over time',
              'Faster and cheaper but confounds age with cohort',
            ],
            matchTargets: [
              'Longitudinal',
              'Cross-sectional',
            ],
            correctMatches: [0, 1, 0, 1],
            explanation:
              'Longitudinal tracks individuals over time. Cross-sectional compares groups at one point, which is faster but cannot separate age effects from generation effects.',
          },
          {
            id: 'psy-sec17-u7-L2-Q3',
            type: 'multiple-choice',
            question: 'A cross-sectional study compares memory in 20-year-olds and 70-year-olds today. Why might the difference not reflect true aging?',
            options: [
              'Because 70-year-olds grew up in a different era with different education and nutrition',
              'Because 20-year-olds have shorter attention spans',
              'Because memory cannot be measured accurately',
              'Because the sample sizes are too small',
            ],
            correctIndex: 0,
            explanation:
              'This is the cohort effect problem. Differences between age groups may reflect generational differences, not aging itself.',
            distractorExplanations: {
              1: 'Attention span differences, if any, are irrelevant to the core design problem of confounding age with cohort.',
              2: 'Memory can be measured with validated tests. That is not the design concern here.',
              3: 'Sample size affects power, not the fundamental confound between age and generation.',
            },
          },
          {
            id: 'psy-sec17-u7-L2-Q4',
            type: 'true-false',
            question: 'Longitudinal studies are immune to participant dropout.',
            correctAnswer: false,
            explanation:
              'Attrition (dropout) is a major challenge in longitudinal research. People move, lose interest, or pass away. Worse, dropout is often non-random: sicker or less motivated participants leave first.',
            distractorExplanations: {
              0: 'Attrition is one of the biggest threats to longitudinal research. It creates biased samples over time.',
            },
          },
          {
            id: 'psy-sec17-u7-L2-Q5',
            type: 'fill-blank',
            question: 'The main weakness of cross-sectional studies of aging is that they confound age with _____ effects.',
            blanks: ['cohort'],
            wordBank: ['cohort', 'practice', 'testing', 'regression', 'fatigue'],
            explanation:
              'People born in different decades had different experiences. Cross-sectional designs cannot separate these cohort differences from true age-related changes.',
          },
          {
            id: 'psy-sec17-u7-L2-Q6',
            type: 'category-swipe',
            question: 'Swipe each feature to its design type:',
            options: [
              'Tracks same participants over years',
              'Tests different age groups at one time point',
              'High attrition risk',
              'Confounds age with generation',
              'Can detect individual growth curves',
            ],
            buckets: ['Longitudinal', 'Cross-sectional'],
            correctBuckets: [0, 1, 0, 1, 0],
            explanation:
              'Longitudinal follows people over time (with dropout risk) and can detect individual change. Cross-sectional is a snapshot that confounds age and cohort.',
          },
        ],
      },

      // ===== LESSON 3: Quasi-Experimental and Single-Case Designs =====
      {
        id: 'psy-sec17-u7-L3',
        title: 'Quasi-Experimental Designs',
        description: 'When random assignment is not possible, these designs still allow causal-ish conclusions.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u7-L3-T1',
            type: 'teaching',
            question: 'What is quasi-experimental?',
            explanation:
              'Quasi-experiments compare naturally occurring groups without random assignment. Examples: comparing smokers vs non-smokers, or students in School A vs School B. They look like experiments but lack the gold-standard control of randomization.',
            hint: '"Quasi" means "as if." These designs resemble experiments but are missing the random assignment ingredient.',
          },
          {
            id: 'psy-sec17-u7-L3-Q1',
            type: 'multiple-choice',
            question: 'Why is random assignment so important in true experiments?',
            options: [
              'It makes the study more interesting',
              'It ensures groups are equivalent on all variables before the manipulation',
              'It guarantees a large sample size',
              'It eliminates the need for a control group',
            ],
            correctIndex: 1,
            explanation:
              'Random assignment distributes all participant characteristics (known and unknown) roughly equally across groups, ruling out pre-existing differences as explanations.',
            distractorExplanations: {
              0: 'Interest level is not a methodological concern. Random assignment is about internal validity.',
              2: 'Random assignment distributes participants; it does not determine how many you recruit.',
              3: 'You still need a control group. Random assignment just ensures the groups are comparable before the study begins.',
            },
          },
          {
            id: 'psy-sec17-u7-L3-Q2',
            type: 'sort-buckets',
            question: 'Classify each study as a true experiment or quasi-experiment:',
            options: [
              'Randomly assigning students to a new teaching method or standard method',
              'Comparing test scores of urban vs rural schools',
              'Randomly assigning patients to a drug or placebo',
              'Comparing health outcomes of people who chose to be vegetarian vs those who did not',
              'Randomly assigning rats to enriched or standard housing',
              'Comparing anxiety levels before and after a natural disaster',
            ],
            buckets: ['True experiment', 'Quasi-experiment'],
            correctBuckets: [0, 1, 0, 1, 0, 1],
            explanation:
              'True experiments have random assignment. Quasi-experiments use pre-existing groups or events that researchers cannot manipulate.',
          },
          {
            id: 'psy-sec17-u7-L3-T2',
            type: 'teaching',
            question: 'Single-case designs',
            explanation:
              'Single-case designs study one person (or a small group) intensively over time. The ABA design removes and reintroduces the treatment to see if behavior changes accordingly. Multiple baseline designs stagger the treatment across settings or behaviors.',
          },
          {
            id: 'psy-sec17-u7-L3-Q3',
            type: 'order-steps',
            question: 'Put the phases of an ABA reversal design in order:',
            steps: [
              'Baseline: Observe behavior without treatment',
              'Treatment: Introduce the intervention and measure behavior',
              'Reversal: Remove the treatment and observe whether behavior returns to baseline',
            ],
            correctOrder: [0, 1, 2],
            explanation:
              'ABA = Baseline, Treatment, Return to baseline. If behavior worsens when treatment is removed, it strongly suggests the treatment was responsible.',
          },
          {
            id: 'psy-sec17-u7-L3-Q4',
            type: 'true-false',
            question: 'Quasi-experimental designs can establish causation as strongly as true experiments.',
            correctAnswer: false,
            explanation:
              'Without random assignment, pre-existing group differences are a rival explanation. Quasi-experiments suggest but cannot firmly establish causation.',
            distractorExplanations: {
              0: 'Random assignment is what allows causal conclusions. Without it, confounds always threaten internal validity.',
            },
          },
          {
            id: 'psy-sec17-u7-L3-Q5',
            type: 'scenario',
            question: 'Why is this a quasi-experiment?',
            scenario:
              'A psychologist wants to study whether bilingualism delays cognitive decline. She compares a group of lifelong bilinguals to a group of monolinguals, matching them on age, education, and income.',
            options: [
              'Because she did not use a standardized test',
              'Because she could not randomly assign people to be bilingual or monolingual',
              'Because the sample size was too small',
              'Because she used matching instead of statistics',
            ],
            correctIndex: 1,
            explanation:
              'You cannot randomly assign people to grow up bilingual. The groups formed naturally, making this quasi-experimental despite careful matching.',
            distractorExplanations: {
              0: 'Standardized tests are about measurement, not design type. The issue is assignment.',
              2: 'Sample size determines power, not whether a study is quasi-experimental.',
              3: 'Matching is a valid technique, and she still analyzes data statistically. The quasi-experimental label comes from lack of random assignment.',
            },
          },
          {
            id: 'psy-sec17-u7-L3-Q6',
            type: 'multiple-choice',
            question: 'In a multiple baseline design, the treatment is...',
            options: [
              'Applied to all participants at the same time',
              'Applied to different participants or settings at staggered times',
              'Never actually administered',
              'Applied only once and then removed permanently',
            ],
            correctIndex: 1,
            explanation:
              'Staggering the treatment across participants, behaviors, or settings lets you see if change occurs exactly when the treatment is introduced each time.',
            distractorExplanations: {
              0: 'Applying to all at once would make it impossible to know if something else caused the change at that time.',
              2: 'The treatment is definitely administered. Otherwise there would be nothing to evaluate.',
              3: 'That describes a simple AB design, not a multiple baseline.',
            },
          },
        ],
      },

      // ===== LESSON 4: Threats to Internal Validity =====
      {
        id: 'psy-sec17-u7-L4',
        title: 'Threats to Internal Validity',
        description: 'The sneaky problems that can make your results unreliable.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u7-L4-T1',
            type: 'teaching',
            question: 'Internal validity = "Was it really the IV?"',
            explanation:
              'Internal validity is the confidence that the independent variable actually caused the change in the dependent variable. Threats are alternative explanations for your results. The more threats you eliminate, the stronger your causal claim.',
          },
          {
            id: 'psy-sec17-u7-L4-Q1',
            type: 'match-pairs',
            question: 'Match each threat to internal validity with its definition:',
            options: [
              'Maturation',
              'History',
              'Testing effects',
              'Regression to the mean',
            ],
            matchTargets: [
              'Participants naturally change over time',
              'External events coincide with the treatment',
              'Taking a pretest affects posttest performance',
              'Extreme scores move toward the average on retesting',
            ],
            correctMatches: [0, 1, 2, 3],
            explanation:
              'Each threat offers an alternative explanation for changes. Strong designs control for these.',
          },
          {
            id: 'psy-sec17-u7-L4-Q2',
            type: 'scenario',
            question: 'Which threat to internal validity is present here?',
            scenario:
              'A study tests whether a reading program helps struggling readers. They select the 20 lowest scorers for treatment. After 8 weeks, these students improve by 10 points. The researcher credits the program.',
            options: [
              'History: an outside event caused the improvement',
              'Maturation: students naturally improved with age',
              'Regression to the mean: extreme low scorers tend to score higher on retest regardless',
              'Testing effects: the pretest helped them learn',
            ],
            correctIndex: 2,
            explanation:
              'When you select the most extreme performers, their next scores will naturally drift toward the average even without treatment. This is regression to the mean.',
            distractorExplanations: {
              0: 'While history is possible, the classic threat when selecting extreme scorers is regression to the mean.',
              1: 'Eight weeks is short for maturation to produce a 10-point gain. Regression is the primary concern.',
              3: 'Testing effects are possible but less likely to produce a large gain. The selection of extreme scorers points to regression.',
            },
          },
          {
            id: 'psy-sec17-u7-L4-T2',
            type: 'teaching',
            question: 'Regression to the mean',
            explanation:
              'Regression to the mean happens because extreme scores partly reflect luck or measurement error. A student who scored unusually low probably had a bad day. On retest, they return closer to their true ability. This is not improvement; it is statistical inevitability.',
          },
          {
            id: 'psy-sec17-u7-L4-Q3',
            type: 'category-swipe',
            question: 'Swipe each scenario to the correct threat:',
            options: [
              'A 12-month study sees children improve; they also got older',
              'A celebrity scandal occurs during a media influence study',
              'Students perform better on a posttest because the pretest was practice',
              'The worst performers improve on retest even without intervention',
              'A national policy change happens between pre and post measurement',
            ],
            buckets: ['Maturation/History', 'Testing/Regression'],
            correctBuckets: [0, 0, 1, 1, 0],
            explanation:
              'Maturation and history are about natural change or external events over time. Testing effects and regression concern measurement artifacts.',
          },
          {
            id: 'psy-sec17-u7-L4-Q4',
            type: 'true-false',
            question: 'A control group that receives no treatment helps rule out maturation and history threats.',
            correctAnswer: true,
            explanation:
              'If the control group also improves (due to maturation or history), you can subtract their gain from the treatment group to isolate the real treatment effect.',
            distractorExplanations: {
              1: 'A control group experiences the same passage of time and external events. Comparing groups reveals what change is due to the treatment vs these background factors.',
            },
          },
          {
            id: 'psy-sec17-u7-L4-Q5',
            type: 'fill-blank',
            question: 'When extremely low scorers are selected for treatment, their scores will likely improve due to _____ to the mean.',
            blanks: ['regression'],
            wordBank: ['regression', 'maturation', 'history', 'attrition', 'practice'],
            explanation:
              'Regression to the mean is a statistical artifact. Extreme scores naturally drift toward average on retest.',
          },
          {
            id: 'psy-sec17-u7-L4-Q6',
            type: 'multi-select',
            question: 'Which of these help control threats to internal validity? (Select all that apply)',
            options: [
              'Random assignment to conditions',
              'Including a control group',
              'Using a pretest-posttest design with a control',
              'Selecting only extreme scorers',
              'Collecting data at only one time point',
            ],
            correctIndices: [0, 1, 2],
            explanation:
              'Random assignment, control groups, and pretest-posttest designs with controls all address validity threats. Selecting extremes invites regression, and single time points cannot track change.',
          },
        ],
      },

      // ===== LESSON 5 (Conversation): Designing a Study =====
      {
        id: 'psy-sec17-u7-L-conv',
        title: 'Designing a Study',
        description: 'Help a researcher choose the right design for their question.',
        icon: '💬',
        type: 'conversation',
        xpReward: 20,
        questions: [],
        conversationStartNodeId: 'psy-sec17-u7-L-conv-C1',
        conversationNodes: [
          {
            id: 'psy-sec17-u7-L-conv-C1',
            speaker: 'Narrator',
            message:
              'Dr. Patel is planning a study on whether mindfulness training reduces burnout in nurses. She asks for your input on the study design.',
            nextNodeId: 'psy-sec17-u7-L-conv-C2',
          },
          {
            id: 'psy-sec17-u7-L-conv-C2',
            speaker: 'Dr. Patel',
            message:
              'I want to compare mindfulness training to a wait-list control. But the hospital won\'t let me randomly assign nurses. Each floor already has different schedules. I can only offer training to Floor 3 and use Floor 7 as the control. What kind of design is this?',
            options: [
              {
                text: 'This is a quasi-experimental design because you cannot randomly assign nurses to conditions.',
                nextNodeId: 'psy-sec17-u7-L-conv-C3',
                quality: 'great',
                feedback:
                  'Correct. Without random assignment, it is quasi-experimental. Pre-existing group differences could confound the results.',
              },
              {
                text: 'This is a true experiment because you have a treatment and a control group.',
                nextNodeId: 'psy-sec17-u7-L-conv-C3',
                quality: 'poor',
                feedback:
                  'Having treatment and control groups is necessary but not sufficient. Without random assignment, you cannot call it a true experiment.',
              },
              {
                text: 'This is a correlational study because there is no manipulation.',
                nextNodeId: 'psy-sec17-u7-L-conv-C3',
                quality: 'poor',
                feedback:
                  'There is a manipulation (mindfulness training). The issue is that group assignment is not random, making it quasi-experimental.',
              },
            ],
          },
          {
            id: 'psy-sec17-u7-L-conv-C3',
            speaker: 'Dr. Patel',
            message:
              'I also want to measure burnout at baseline, 3 months, and 6 months. Does that change the design?',
            options: [
              {
                text: 'Yes, now it is a mixed design. Group assignment is between-subjects, and time is within-subjects.',
                nextNodeId: 'psy-sec17-u7-L-conv-C4',
                quality: 'great',
                feedback:
                  'Exactly. The between factor is group (mindfulness vs control) and the within factor is time (baseline, 3 months, 6 months).',
              },
              {
                text: 'No, adding more time points does not change the design type.',
                nextNodeId: 'psy-sec17-u7-L-conv-C4',
                quality: 'poor',
                feedback:
                  'Adding repeated measures introduces a within-subjects factor, making it a mixed design.',
              },
              {
                text: 'It becomes a longitudinal study, which is completely different from an experiment.',
                nextNodeId: 'psy-sec17-u7-L-conv-C4',
                quality: 'okay',
                feedback:
                  'It does have a longitudinal element, but it is specifically a mixed quasi-experimental design because there is still a treatment manipulation.',
              },
            ],
          },
          {
            id: 'psy-sec17-u7-L-conv-C4',
            speaker: 'Dr. Patel',
            message:
              'My biggest worry is that Floor 3 nurses might already be less burned out than Floor 7 nurses. How can I check for that?',
            options: [
              {
                text: 'Compare their baseline burnout scores before starting the intervention. If they differ, that is a confound.',
                nextNodeId: 'psy-sec17-u7-L-conv-C5',
                quality: 'great',
                feedback:
                  'Yes. Baseline equivalence checks are essential in quasi-experiments. If the groups start differently, you need to statistically control for that.',
              },
              {
                text: 'Do not worry about it. Just compare the final scores.',
                nextNodeId: 'psy-sec17-u7-L-conv-C5',
                quality: 'poor',
                feedback:
                  'Ignoring baseline differences is a critical error. Any post-test difference might reflect pre-existing differences, not the treatment.',
              },
              {
                text: 'Switch to a different research question that allows random assignment.',
                nextNodeId: 'psy-sec17-u7-L-conv-C5',
                quality: 'okay',
                feedback:
                  'Random assignment would be ideal, but it is not always possible in applied settings. Checking and controlling for baseline differences is the practical solution.',
              },
            ],
          },
          {
            id: 'psy-sec17-u7-L-conv-C5',
            speaker: 'Narrator',
            message:
              'Well done. You helped Dr. Patel identify her design as quasi-experimental and mixed, recognized the key confound of pre-existing group differences, and suggested baseline equivalence checks. Real-world research rarely allows perfect designs, but knowing the limitations helps you draw careful conclusions.',
          },
        ],
      },

      // ===== LESSON 6: Research Designs Speed Round =====
      {
        id: 'psy-sec17-u7-L-speed',
        title: 'Research Designs Speed Round',
        description: 'Quick-fire questions on factorial, mixed, and quasi-experimental designs.',
        icon: '⚡',
        type: 'speed-round',
        xpReward: 20,
        questions: [],
        speedTimeLimit: 60,
        speedQuestions: [
          {
            id: 'psy-sec17-u7-L-speed-SQ1',
            question: 'A 2x2 design has how many conditions?',
            options: ['2', '4', '6', '8'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u7-L-speed-SQ2',
            question: 'A quasi-experiment lacks...',
            options: ['A hypothesis', 'Random assignment', 'A dependent variable', 'Statistics'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u7-L-speed-SQ3',
            question: 'An interaction means one IV\'s effect _____ on the other IV.',
            options: ['Is independent of', 'Depends', 'Cancels out', 'Doubles'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u7-L-speed-SQ4',
            question: 'Longitudinal studies follow the _____ people over time.',
            options: ['Different', 'Same', 'Youngest', 'Oldest'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u7-L-speed-SQ5',
            question: 'Cross-sectional studies confound age with...',
            options: ['Cohort effects', 'Practice effects', 'Testing effects', 'Attrition'],
            correctIndex: 0,
          },
          {
            id: 'psy-sec17-u7-L-speed-SQ6',
            question: 'ABA design stands for...',
            options: ['Always Be Assessing', 'Baseline-Treatment-Baseline', 'After-Before-After', 'Applied Behavior Analysis'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u7-L-speed-SQ7',
            question: 'The main effect is the overall impact of _____ IV.',
            options: ['One', 'Two', 'All', 'No'],
            correctIndex: 0,
          },
          {
            id: 'psy-sec17-u7-L-speed-SQ8',
            question: 'Regression to the mean affects _____ scorers most.',
            options: ['Average', 'Extreme', 'High only', 'Young'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u7-L-speed-SQ9',
            question: 'A mixed design combines between and _____ subjects factors.',
            options: ['Random', 'Within', 'Matched', 'External'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u7-L-speed-SQ10',
            question: 'Maturation threat means participants _____ during the study.',
            options: ['Drop out', 'Naturally change', 'Cheat', 'Move away'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u7-L-speed-SQ11',
            question: 'History threat involves _____ events affecting results.',
            options: ['Past', 'External', 'Internal', 'Statistical'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u7-L-speed-SQ12',
            question: 'A 3x2 design has how many conditions?',
            options: ['5', '6', '9', '12'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u7-L-speed-SQ13',
            question: 'Multiple baseline designs stagger the _____ across participants.',
            options: ['Measurement', 'Treatment', 'Baseline', 'Analysis'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u7-L-speed-SQ14',
            question: 'Attrition in longitudinal studies means participants...',
            options: ['Improve', 'Drop out', 'Age', 'Move up'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u7-L-speed-SQ15',
            question: 'Testing effects occur when the _____ influences the posttest.',
            options: ['Treatment', 'Pretest', 'Hypothesis', 'Sample size'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },

  // ========================================================================
  // UNIT 8: Qualitative Methods
  // ========================================================================
  {
    id: 'psy-sec17-u8',
    title: 'Qualitative Methods',
    description: 'Numbers do not capture everything. Qualitative research explores meaning and experience.',
    color: '#FDBA74',
    icon: '🗣️',
    sectionIndex: 17,
    sectionTitle: 'Statistics & Methods',
    lessons: [
      // ===== LESSON 1: When and Why Qualitative =====
      {
        id: 'psy-sec17-u8-L1',
        title: 'When to Go Qualitative',
        description: 'Some research questions demand depth over numbers.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u8-L1-T1',
            type: 'teaching',
            question: 'Why qualitative?',
            explanation:
              'Qualitative research is ideal when you want to explore a new or poorly understood topic, understand lived experiences, or generate hypotheses rather than test them. Instead of numbers, it uses words, stories, and themes to make sense of human behavior.',
            hint: 'Quantitative asks "how much?" and "how many?" Qualitative asks "what is this like?" and "what does this mean?"',
          },
          {
            id: 'psy-sec17-u8-L1-Q1',
            type: 'sort-buckets',
            question: 'Which research questions are better suited for qualitative vs quantitative methods?',
            options: [
              'What is it like to live with chronic pain?',
              'Does drug X reduce anxiety more than placebo?',
              'How do refugees make sense of their identity in a new country?',
              'Is there a correlation between sleep and GPA?',
              'What themes emerge in survivor narratives after a disaster?',
              'Does cognitive-behavioral therapy produce larger effect sizes than medication?',
            ],
            buckets: ['Qualitative', 'Quantitative'],
            correctBuckets: [0, 1, 0, 1, 0, 1],
            explanation:
              'Questions about experience, meaning, and emerging themes are qualitative. Questions about amounts, comparisons, and relationships between variables are quantitative.',
          },
          {
            id: 'psy-sec17-u8-L1-Q2',
            type: 'true-false',
            question: 'Qualitative research is less rigorous than quantitative research.',
            correctAnswer: false,
            explanation:
              'Qualitative research has its own standards of rigor: trustworthiness, credibility, dependability, and confirmability. It is different from quantitative rigor, not inferior.',
            distractorExplanations: {
              0: 'Both approaches have standards. Qualitative research evaluates quality through trustworthiness criteria rather than statistical validity.',
            },
          },
          {
            id: 'psy-sec17-u8-L1-T2',
            type: 'teaching',
            question: 'Qualitative is not just "no numbers"',
            explanation:
              'Good qualitative research follows systematic procedures. Researchers collect data methodically, code it carefully, check their interpretations, and document their reasoning. It demands as much discipline as running statistics.',
          },
          {
            id: 'psy-sec17-u8-L1-Q3',
            type: 'multiple-choice',
            question: 'A researcher wants to understand how first-generation college students experience impostor syndrome. Which approach is most appropriate?',
            options: [
              'A survey with Likert scale items administered to 1,000 students',
              'In-depth interviews with 15-20 first-generation students',
              'A randomized controlled trial comparing impostor syndrome treatments',
              'A correlational study of GPA and impostor syndrome scores',
            ],
            correctIndex: 1,
            explanation:
              'Understanding the lived experience of impostor syndrome requires depth, not breadth. In-depth interviews allow participants to share their stories in their own words.',
            distractorExplanations: {
              0: 'A Likert survey measures the degree of impostor syndrome but cannot capture the richness of personal experience.',
              2: 'An RCT tests a treatment. The researcher wants to understand the experience, not treat it (yet).',
              3: 'A correlational study shows whether variables relate but cannot reveal what the experience feels like.',
            },
          },
          {
            id: 'psy-sec17-u8-L1-Q4',
            type: 'multi-select',
            question: 'When is qualitative research a good choice? (Select all that apply)',
            options: [
              'When exploring a new or poorly understood phenomenon',
              'When you need to test a specific hypothesis',
              'When you want to understand lived experience in depth',
              'When generating hypotheses for future quantitative testing',
              'When you need a large representative sample',
            ],
            correctIndices: [0, 2, 3],
            explanation:
              'Qualitative excels at exploration, depth, and hypothesis generation. Testing hypotheses and large samples are quantitative strengths.',
          },
          {
            id: 'psy-sec17-u8-L1-Q5',
            type: 'fill-blank',
            question: 'Qualitative research aims to understand _____ and meaning rather than measure quantities.',
            blanks: ['experience'],
            wordBank: ['experience', 'variables', 'correlation', 'probability', 'effect sizes'],
            explanation:
              'Qualitative methods focus on the depth and richness of human experience. Numbers take a back seat to stories, patterns, and themes.',
          },
        ],
      },

      // ===== LESSON 2: Interviews and Focus Groups =====
      {
        id: 'psy-sec17-u8-L2',
        title: 'Interviews and Focus Groups',
        description: 'The most common qualitative data collection methods.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u8-L2-T1',
            type: 'teaching',
            question: 'Three types of interviews',
            explanation:
              'Structured interviews ask every participant the same fixed questions. Semi-structured interviews have a guide but allow follow-up questions. Unstructured interviews are open conversations. Most qualitative researchers prefer semi-structured: enough consistency for comparison, enough flexibility for discovery.',
          },
          {
            id: 'psy-sec17-u8-L2-Q1',
            type: 'match-pairs',
            question: 'Match each interview type to its description:',
            options: [
              'Structured',
              'Semi-structured',
              'Unstructured',
            ],
            matchTargets: [
              'Fixed questions asked in the same order every time',
              'Guided by key topics but flexible in follow-up',
              'Open conversation with minimal predetermined questions',
            ],
            correctMatches: [0, 1, 2],
            explanation:
              'The types range from rigid (structured) to free-flowing (unstructured), with semi-structured as the most common middle ground.',
          },
          {
            id: 'psy-sec17-u8-L2-Q2',
            type: 'scenario',
            question: 'Which interview type would work best here?',
            scenario:
              'A researcher is studying the grief process in parents who lost a child. She wants to hear each parent\'s unique story but also needs to cover certain key topics like coping strategies and support systems.',
            options: [
              'Structured, so every parent answers the same questions for fair comparison',
              'Semi-structured, so she can cover key topics while letting parents share their stories freely',
              'Unstructured, so parents can talk about whatever they want with no guidance',
              'A written survey would be more appropriate for this sensitive topic',
            ],
            correctIndex: 1,
            explanation:
              'Semi-structured interviews give the researcher a flexible guide for key topics while leaving room for the unique, deeply personal stories each parent needs to tell.',
            distractorExplanations: {
              0: 'Rigid questions could feel insensitive and miss important aspects of individual grief experiences.',
              2: 'Some structure ensures key topics are covered. Purely unstructured interviews risk missing important comparisons.',
              3: 'Written surveys cannot capture the depth of emotion and narrative that interviews can, especially on sensitive topics.',
            },
          },
          {
            id: 'psy-sec17-u8-L2-T2',
            type: 'teaching',
            question: 'Focus groups',
            explanation:
              'Focus groups bring 6-10 participants together for a guided discussion. They are useful for exploring shared experiences and social norms. Group dynamics can spark ideas that individual interviews miss. However, some participants may dominate while shy members stay silent.',
          },
          {
            id: 'psy-sec17-u8-L2-Q3',
            type: 'category-swipe',
            question: 'Swipe each feature to interviews or focus groups:',
            options: [
              'One person shares their story in depth',
              'Group dynamics can spark new ideas',
              'Better for sensitive or private topics',
              'Dominant members can silence quieter ones',
              'Explores shared social norms effectively',
            ],
            buckets: ['Individual interview', 'Focus group'],
            correctBuckets: [0, 1, 0, 1, 1],
            explanation:
              'Interviews are better for individual depth and sensitive topics. Focus groups leverage group dynamics but risk uneven participation.',
          },
          {
            id: 'psy-sec17-u8-L2-Q4',
            type: 'true-false',
            question: 'Focus groups are ideal for exploring highly personal or stigmatized topics.',
            correctAnswer: false,
            explanation:
              'People may not share sensitive information in a group setting. Individual interviews offer more privacy and are better for stigmatized topics.',
            distractorExplanations: {
              0: 'Participants often self-censor in groups, especially about embarrassing or stigmatized experiences. Individual interviews are better for sensitive topics.',
            },
          },
          {
            id: 'psy-sec17-u8-L2-Q5',
            type: 'multiple-choice',
            question: 'What is the typical recommended size for a focus group?',
            options: [
              '2-3 participants',
              '6-10 participants',
              '20-30 participants',
              '50+ participants',
            ],
            correctIndex: 1,
            explanation:
              'Six to ten participants is standard. Fewer than 6 limits discussion diversity; more than 10 makes it hard for everyone to participate.',
            distractorExplanations: {
              0: 'Two to three people is too few for the group dynamic that makes focus groups valuable.',
              2: 'Twenty to thirty would be a crowd, not a discussion. Many voices would go unheard.',
              3: 'That is a lecture audience, not a focus group. Meaningful group discussion requires manageable numbers.',
            },
          },
          {
            id: 'psy-sec17-u8-L2-Q6',
            type: 'fill-blank',
            question: 'The most commonly used qualitative interview type is _____, which balances structure with flexibility.',
            blanks: ['semi-structured'],
            wordBank: ['semi-structured', 'structured', 'unstructured', 'standardized', 'clinical'],
            explanation:
              'Semi-structured interviews provide a topic guide while allowing the interviewer to follow up on unexpected but relevant directions.',
          },
        ],
      },

      // ===== LESSON 3: Thematic Analysis and Grounded Theory =====
      {
        id: 'psy-sec17-u8-L3',
        title: 'Analyzing Qualitative Data',
        description: 'How researchers find patterns and build theories from words, not numbers.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u8-L3-T1',
            type: 'teaching',
            question: 'Thematic analysis',
            explanation:
              'Thematic analysis is the most common qualitative analysis method. The researcher reads through data (interview transcripts, field notes), identifies codes (short labels for meaningful segments), and then groups codes into broader themes. Good themes capture something important about the data in relation to the research question.',
          },
          {
            id: 'psy-sec17-u8-L3-Q1',
            type: 'order-steps',
            question: 'Put the steps of thematic analysis in order:',
            steps: [
              'Familiarize yourself with the data by reading it multiple times',
              'Generate initial codes by labeling meaningful segments',
              'Search for themes by grouping related codes together',
              'Review themes to ensure they fit the data',
              'Define and name each theme clearly',
              'Write up the analysis with data excerpts as evidence',
            ],
            correctOrder: [0, 1, 2, 3, 4, 5],
            explanation:
              'Thematic analysis follows these six phases, from immersion in the data to final write-up. Each step builds on the previous one.',
          },
          {
            id: 'psy-sec17-u8-L3-Q2',
            type: 'multiple-choice',
            question: 'In thematic analysis, a "code" is...',
            options: [
              'A number assigned to each participant',
              'A short label that captures a meaningful segment of data',
              'A statistical test for qualitative data',
              'A password-protected file of interview recordings',
            ],
            correctIndex: 1,
            explanation:
              'Codes are concise labels (like "feeling isolated" or "coping through humor") applied to meaningful chunks of text. Related codes get grouped into themes.',
            distractorExplanations: {
              0: 'Participant numbers are identifiers, not codes in the thematic analysis sense.',
              2: 'Qualitative analysis does not use statistical tests. Coding is an interpretive process.',
              3: 'Data security is important but unrelated to the analytical meaning of coding.',
            },
          },
          {
            id: 'psy-sec17-u8-L3-T2',
            type: 'teaching',
            question: 'Grounded theory',
            explanation:
              'Grounded theory builds a theory from the data itself rather than testing an existing theory. The researcher collects and analyzes data simultaneously, letting emerging patterns guide further data collection. The goal is to develop a new theoretical framework that is "grounded" in what participants actually said and did.',
          },
          {
            id: 'psy-sec17-u8-L3-Q3',
            type: 'sort-buckets',
            question: 'Classify each approach by its goal:',
            options: [
              'Identifying recurring patterns across interviews',
              'Building a new theoretical framework from participant data',
              'Grouping codes into overarching themes',
              'Collecting and analyzing data simultaneously',
              'Labeling meaningful segments of text',
              'Letting data guide what questions to ask next',
            ],
            buckets: ['Thematic analysis', 'Grounded theory'],
            correctBuckets: [0, 1, 0, 1, 0, 1],
            explanation:
              'Thematic analysis focuses on finding themes in existing data. Grounded theory iteratively builds theory from ongoing data collection.',
          },
          {
            id: 'psy-sec17-u8-L3-Q4',
            type: 'true-false',
            question: 'Grounded theory starts with a hypothesis and then collects data to test it.',
            correctAnswer: false,
            explanation:
              'Grounded theory does the opposite: it starts with data and builds theory from it. The researcher enters with an open mind, not a predetermined hypothesis.',
            distractorExplanations: {
              0: 'The whole point of grounded theory is to let the theory emerge from the data rather than imposing a pre-existing framework.',
            },
          },
          {
            id: 'psy-sec17-u8-L3-Q5',
            type: 'scenario',
            question: 'Which analysis method should this researcher use?',
            scenario:
              'A researcher has transcripts from 20 interviews with new immigrants about their experiences finding employment. She wants to identify the common barriers and facilitators they describe. She is not trying to build a new theory.',
            options: [
              'Grounded theory, because she has qualitative data',
              'Thematic analysis, because she wants to identify patterns and themes in existing data',
              'Statistical analysis, because she has 20 participants',
              'Content analysis, because she wants to count word frequencies',
            ],
            correctIndex: 1,
            explanation:
              'She wants to find themes in her data, not build a theory from scratch. Thematic analysis is the right fit for identifying patterns.',
            distractorExplanations: {
              0: 'Grounded theory is for theory building, not just pattern identification. It also involves iterative data collection.',
              2: 'Twenty interview transcripts are qualitative data. Statistical analysis is for numerical data.',
              3: 'Content analysis can count frequencies, but she wants to understand barriers and facilitators, which requires thematic interpretation.',
            },
          },
          {
            id: 'psy-sec17-u8-L3-Q6',
            type: 'fill-blank',
            question: 'In grounded theory, the theory is built from the _____ rather than imposed from existing literature.',
            blanks: ['data'],
            wordBank: ['data', 'hypothesis', 'statistics', 'theory', 'literature'],
            explanation:
              'The name says it all: the theory is "grounded" in the actual data collected from participants.',
          },
        ],
      },

      // ===== LESSON 4: Mixed Methods =====
      {
        id: 'psy-sec17-u8-L4',
        title: 'Mixed Methods',
        description: 'Combining numbers and stories for a richer understanding.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u8-L4-T1',
            type: 'teaching',
            question: 'Best of both worlds',
            explanation:
              'Mixed methods research combines quantitative and qualitative approaches in one study. For example, you might survey 500 people for broad patterns (quantitative) and then interview 20 of them for depth (qualitative). The numbers show what happens; the stories show why.',
          },
          {
            id: 'psy-sec17-u8-L4-Q1',
            type: 'multiple-choice',
            question: 'What is the main advantage of mixed methods over using just one approach?',
            options: [
              'It is cheaper than running two separate studies',
              'It combines breadth (quantitative) with depth (qualitative) for a more complete picture',
              'It eliminates all bias from the research',
              'It guarantees publication in top journals',
            ],
            correctIndex: 1,
            explanation:
              'Mixed methods leverage the strengths of both approaches. Quantitative provides generalizability; qualitative provides richness and context.',
            distractorExplanations: {
              0: 'Mixed methods are typically more expensive and time-consuming, not cheaper.',
              2: 'No method eliminates all bias. Mixed methods reduce certain biases by triangulating data sources.',
              3: 'Publication depends on quality, not method. Though mixed methods are increasingly valued.',
            },
          },
          {
            id: 'psy-sec17-u8-L4-T2',
            type: 'teaching',
            question: 'Common mixed methods designs',
            explanation:
              'Sequential explanatory: quantitative first, then qualitative to explain the numbers. Sequential exploratory: qualitative first, then quantitative to test what you found. Convergent: both at the same time, then compare results.',
          },
          {
            id: 'psy-sec17-u8-L4-Q2',
            type: 'match-pairs',
            question: 'Match each mixed methods design to its sequence:',
            options: [
              'Sequential explanatory',
              'Sequential exploratory',
              'Convergent',
            ],
            matchTargets: [
              'Quantitative first, then qualitative',
              'Qualitative first, then quantitative',
              'Both at the same time',
            ],
            correctMatches: [0, 1, 2],
            explanation:
              'Explanatory explains numbers with stories (quant then qual). Exploratory explores first, then tests (qual then quant). Convergent runs both simultaneously.',
          },
          {
            id: 'psy-sec17-u8-L4-Q3',
            type: 'scenario',
            question: 'Which mixed methods design fits this study?',
            scenario:
              'A researcher surveys 1,000 teachers about burnout (quantitative). She finds that rural teachers report higher burnout. To understand why, she then interviews 15 rural teachers (qualitative).',
            options: [
              'Sequential exploratory: she explored qualitatively first',
              'Convergent: she ran both at the same time',
              'Sequential explanatory: she used qualitative data to explain quantitative findings',
              'This is not mixed methods because the studies are separate',
            ],
            correctIndex: 2,
            explanation:
              'She started with a quantitative survey, found a pattern, and then used qualitative interviews to explain it. That is the sequential explanatory design.',
            distractorExplanations: {
              0: 'She started with the survey (quantitative), not interviews (qualitative). Exploratory does qualitative first.',
              1: 'The phases were sequential, not simultaneous. The interviews followed the survey.',
              3: 'Both phases are part of one research project with an integrated design. This is textbook mixed methods.',
            },
          },
          {
            id: 'psy-sec17-u8-L4-Q4',
            type: 'true-false',
            question: 'Mixed methods research is simply doing a survey and an interview in the same study.',
            correctAnswer: false,
            explanation:
              'True mixed methods requires intentional integration of the two data types. Simply collecting both without connecting them is not mixed methods; the data must be combined and compared.',
            distractorExplanations: {
              0: 'Mixed methods requires a deliberate plan for how quantitative and qualitative findings will be integrated, not just collected side by side.',
            },
          },
          {
            id: 'psy-sec17-u8-L4-Q5',
            type: 'multi-select',
            question: 'Which are common reasons to use mixed methods? (Select all that apply)',
            options: [
              'To explain unexpected quantitative results with qualitative depth',
              'To develop a survey based on qualitative exploration',
              'To avoid learning statistics',
              'To triangulate findings from different data sources',
              'To explore a topic and then test emerging hypotheses',
            ],
            correctIndices: [0, 1, 3, 4],
            explanation:
              'Mixed methods serves many purposes: explaining, developing instruments, triangulating, and exploring. It does not replace the need for statistical skills.',
          },
          {
            id: 'psy-sec17-u8-L4-Q6',
            type: 'pick-the-best',
            question: 'What is the best description of triangulation in mixed methods?',
            options: [
              'Using three different statistical tests',
              'Comparing findings from multiple data sources to see if they converge',
              'Interviewing participants three times',
              'Using three different qualitative methods',
            ],
            correctIndex: 1,
            explanation:
              'Triangulation means checking whether different methods or data sources lead to the same conclusions, strengthening confidence in the findings.',
            distractorExplanations: {
              0: 'Triangulation is about data sources and methods, not the number of statistical tests.',
              2: 'Multiple interviews can add depth, but triangulation specifically means comparing different types of data.',
              3: 'Using three qualitative methods is methodological variety but not the core idea of mixed methods triangulation.',
            },
          },
        ],
      },

      // ===== LESSON 5 (Conversation): Choosing a Research Approach =====
      {
        id: 'psy-sec17-u8-L-conv',
        title: 'Choosing a Research Approach',
        description: 'Help a student decide between qualitative, quantitative, and mixed methods.',
        icon: '💬',
        type: 'conversation',
        xpReward: 20,
        questions: [],
        conversationStartNodeId: 'psy-sec17-u8-L-conv-C1',
        conversationNodes: [
          {
            id: 'psy-sec17-u8-L-conv-C1',
            speaker: 'Narrator',
            message:
              'Your classmate Priya is planning her senior thesis. She is interested in how social media affects body image but is stuck on which methodology to use.',
            nextNodeId: 'psy-sec17-u8-L-conv-C2',
          },
          {
            id: 'psy-sec17-u8-L-conv-C2',
            speaker: 'Priya',
            message:
              'I want to know if more Instagram use is linked to worse body image. Should I do interviews or a survey?',
            options: [
              {
                text: 'A survey would be best for testing whether there is a statistical relationship between Instagram use and body image scores.',
                nextNodeId: 'psy-sec17-u8-L-conv-C3',
                quality: 'great',
                feedback:
                  'Right. Testing a relationship between two measurable variables calls for quantitative methods like a survey with validated scales.',
              },
              {
                text: 'Interviews would be best because body image is personal.',
                nextNodeId: 'psy-sec17-u8-L-conv-C3',
                quality: 'okay',
                feedback:
                  'Body image is personal, but the question "is more use linked to worse image" is a quantitative question. Interviews could supplement but not answer it.',
              },
              {
                text: 'It does not matter. Both would work equally well.',
                nextNodeId: 'psy-sec17-u8-L-conv-C3',
                quality: 'poor',
                feedback:
                  'The research question dictates the method. Testing a correlational relationship requires quantitative data.',
              },
            ],
          },
          {
            id: 'psy-sec17-u8-L-conv-C3',
            speaker: 'Priya',
            message:
              'But I also want to understand how people feel when they scroll through Instagram and see edited photos. Numbers alone seem incomplete. What do I do?',
            options: [
              {
                text: 'Consider a mixed methods approach. Survey first for the statistical relationship, then interview a subset to understand the emotional experience.',
                nextNodeId: 'psy-sec17-u8-L-conv-C4',
                quality: 'great',
                feedback:
                  'Perfect. Sequential explanatory design: the survey answers "is there a link?" and interviews answer "what does it feel like?"',
              },
              {
                text: 'Just add open-ended questions to the survey.',
                nextNodeId: 'psy-sec17-u8-L-conv-C4',
                quality: 'okay',
                feedback:
                  'Open-ended survey items give some qualitative flavor but lack the depth of real interviews. A true mixed methods approach would be stronger.',
              },
              {
                text: 'Drop the survey and just do interviews.',
                nextNodeId: 'psy-sec17-u8-L-conv-C4',
                quality: 'poor',
                feedback:
                  'Interviews alone cannot establish the statistical relationship between Instagram use and body image scores.',
              },
            ],
          },
          {
            id: 'psy-sec17-u8-L-conv-C4',
            speaker: 'Priya',
            message:
              'For the interviews, should I ask every person the same exact questions, or let the conversation flow naturally?',
            options: [
              {
                text: 'Use semi-structured interviews. Have a topic guide but let participants share their experiences freely.',
                nextNodeId: 'psy-sec17-u8-L-conv-C5',
                quality: 'great',
                feedback:
                  'Semi-structured is ideal. You ensure key topics are covered while leaving room for unexpected insights.',
              },
              {
                text: 'Use fully structured interviews so you can compare answers directly.',
                nextNodeId: 'psy-sec17-u8-L-conv-C5',
                quality: 'okay',
                feedback:
                  'Structured interviews allow comparison but may miss rich, unexpected insights that are the whole point of qualitative research.',
              },
              {
                text: 'Just let people talk about whatever they want with no guide at all.',
                nextNodeId: 'psy-sec17-u8-L-conv-C5',
                quality: 'poor',
                feedback:
                  'Completely unstructured conversations risk wandering off topic. Some structure ensures you address the research question.',
              },
            ],
          },
          {
            id: 'psy-sec17-u8-L-conv-C5',
            speaker: 'Narrator',
            message:
              'Great advice. You helped Priya design a mixed methods study: a survey to establish the statistical link and semi-structured interviews to explore the emotional experience. This combination gives both breadth and depth.',
          },
        ],
      },

      // ===== LESSON 6: Qualitative Methods Speed Round =====
      {
        id: 'psy-sec17-u8-L-speed',
        title: 'Qualitative Methods Speed Round',
        description: 'Rapid recall of qualitative research concepts.',
        icon: '⚡',
        type: 'speed-round',
        xpReward: 20,
        questions: [],
        speedTimeLimit: 60,
        speedQuestions: [
          {
            id: 'psy-sec17-u8-L-speed-SQ1',
            question: 'The most common qualitative interview type is...',
            options: ['Structured', 'Semi-structured', 'Unstructured', 'Standardized'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u8-L-speed-SQ2',
            question: 'A typical focus group has _____ participants.',
            options: ['2-3', '6-10', '20-30', '50+'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u8-L-speed-SQ3',
            question: 'Thematic analysis identifies _____ in qualitative data.',
            options: ['p-values', 'Themes', 'Effect sizes', 'Confidence intervals'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u8-L-speed-SQ4',
            question: 'Grounded theory builds theory from...',
            options: ['Existing literature', 'Data', 'Hypotheses', 'Statistics'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u8-L-speed-SQ5',
            question: 'Mixed methods combines quantitative and...',
            options: ['More quantitative', 'Qualitative', 'Experimental', 'Longitudinal'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u8-L-speed-SQ6',
            question: 'Sequential explanatory design starts with...',
            options: ['Qualitative', 'Quantitative', 'Both at once', 'Theory'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u8-L-speed-SQ7',
            question: 'A "code" in thematic analysis is a short _____ for a data segment.',
            options: ['Number', 'Label', 'Statistic', 'Equation'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u8-L-speed-SQ8',
            question: 'Focus groups are NOT ideal for _____ topics.',
            options: ['Interesting', 'Stigmatized', 'Popular', 'Common'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u8-L-speed-SQ9',
            question: 'Triangulation means comparing findings from multiple...',
            options: ['Hypotheses', 'Data sources', 'Researchers', 'Countries'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u8-L-speed-SQ10',
            question: 'Convergent mixed methods collects both data types...',
            options: ['Years apart', 'At the same time', 'Qualitative first', 'Quantitative first'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u8-L-speed-SQ11',
            question: 'Qualitative rigor is assessed by...',
            options: ['p-values', 'Trustworthiness criteria', 'Effect sizes', 'Sample size'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u8-L-speed-SQ12',
            question: 'Qualitative research is best for exploring...',
            options: ['Causal relationships', 'Lived experience', 'Large samples', 'Effect sizes'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u8-L-speed-SQ13',
            question: 'In grounded theory, data collection and analysis happen...',
            options: ['Separately', 'Simultaneously', 'Only once', 'After publication'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u8-L-speed-SQ14',
            question: 'Sequential exploratory design starts with...',
            options: ['Quantitative', 'Qualitative', 'Both', 'Neither'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u8-L-speed-SQ15',
            question: 'Unstructured interviews have _____ predetermined questions.',
            options: ['Many', 'Minimal', 'Exactly 10', 'Standardized'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },

  // ========================================================================
  // UNIT 9: The Replication Crisis
  // ========================================================================
  {
    id: 'psy-sec17-u9',
    title: 'The Replication Crisis',
    description: 'Many famous psychology findings do not replicate. Here is why and what is being done.',
    color: '#EA580C',
    icon: '🔄',
    sectionIndex: 17,
    sectionTitle: 'Statistics & Methods',
    lessons: [
      // ===== LESSON 1: The Reproducibility Project =====
      {
        id: 'psy-sec17-u9-L1',
        title: 'The Reproducibility Problem',
        description: 'When researchers repeated 100 classic studies, less than half held up.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u9-L1-T1',
            type: 'teaching',
            question: 'The Reproducibility Project',
            explanation:
              'In 2015, the Open Science Collaboration tried to replicate 100 published psychology studies. Only about 39% produced significant results the second time. Effect sizes were roughly half the originals. This shook the field.',
            hint: 'Replication is the gold standard of science. If a finding cannot be reproduced, we cannot trust it.',
          },
          {
            id: 'psy-sec17-u9-L1-Q1',
            type: 'slider-estimate',
            question: 'In the Reproducibility Project, approximately what percentage of 100 psychology studies replicated successfully?',
            sliderMin: 0,
            sliderMax: 100,
            correctValue: 39,
            tolerance: 10,
            unit: '%',
            explanation:
              'About 39% of the 100 studies produced significant results in the replication attempt. This was a wake-up call for the field.',
          },
          {
            id: 'psy-sec17-u9-L1-Q2',
            type: 'multiple-choice',
            question: 'What happened to effect sizes in the replications compared to the originals?',
            options: [
              'They were roughly the same',
              'They were roughly half the size of the originals',
              'They doubled in size',
              'They disappeared entirely',
            ],
            correctIndex: 1,
            explanation:
              'Replication effect sizes averaged about half of the original. This suggests the originals were inflated, likely due to publication bias and small samples.',
            distractorExplanations: {
              0: 'If effect sizes matched, the crisis would be less concerning. But they shrank substantially.',
              2: 'Effects getting larger in replications would be unusual and was not the pattern found.',
              3: 'Some effects disappeared, but on average they were about half the original size, not zero.',
            },
          },
          {
            id: 'psy-sec17-u9-L1-T2',
            type: 'teaching',
            question: 'Why does failure to replicate matter?',
            explanation:
              'Science builds on previous findings. Textbooks, therapies, and policies rely on published results. If those results do not replicate, the downstream knowledge is built on shaky ground. The crisis forced psychology to improve its methods.',
          },
          {
            id: 'psy-sec17-u9-L1-Q3',
            type: 'true-false',
            question: 'A single failure to replicate definitively proves the original finding was wrong.',
            correctAnswer: false,
            explanation:
              'A single failure could reflect a difference in sample, setting, or procedure. Multiple failed replications are more damning. But one failure is a warning sign.',
            distractorExplanations: {
              0: 'Replication failures can result from many factors. It takes a pattern of failures, not just one, to conclude the original was likely wrong.',
            },
          },
          {
            id: 'psy-sec17-u9-L1-Q4',
            type: 'multi-select',
            question: 'Which factors contributed to the replication crisis? (Select all that apply)',
            options: [
              'Small sample sizes in original studies',
              'Publication bias favoring positive results',
              'Flexible data analysis practices',
              'Too many researchers using the same methods',
              'Pressure to publish novel findings',
            ],
            correctIndices: [0, 1, 2, 4],
            explanation:
              'Small samples, publication bias, analytical flexibility, and publish-or-perish pressure all inflated false positive rates. Using the same methods is not a problem; it is actually desirable for replication.',
          },
          {
            id: 'psy-sec17-u9-L1-Q5',
            type: 'fill-blank',
            question: 'The Open Science Collaboration found that only about _____% of 100 psychology studies replicated.',
            blanks: ['39'],
            wordBank: ['39', '75', '90', '50', '15'],
            explanation:
              'Approximately 39% of the 100 studies produced significant results in replication. This alarmingly low rate galvanized reform.',
          },
          {
            id: 'psy-sec17-u9-L1-Q6',
            type: 'scenario',
            question: 'How should you interpret this situation?',
            scenario:
              'A famous "power posing" study claimed that standing in an expansive pose for 2 minutes increases testosterone and risk-taking. Multiple large replications found no effect on hormones or behavior. The original researchers stand by their claim.',
            options: [
              'The original researchers must be right because they did the study first',
              'Multiple failed replications with larger samples strongly suggest the hormonal effect does not exist',
              'The replications must have done something wrong',
              'We should ignore the controversy and keep teaching the finding',
            ],
            correctIndex: 1,
            explanation:
              'Multiple independent replications with larger samples outweigh a single original study. The weight of evidence matters more than who published first.',
            distractorExplanations: {
              0: 'Being first does not mean being right. Science updates based on the totality of evidence.',
              2: 'Multiple independent teams making the same "mistake" is unlikely. Failed replications across labs are strong evidence.',
              3: 'Teaching findings that do not replicate misleads students. Science must self-correct.',
            },
          },
        ],
      },

      // ===== LESSON 2: Publication Bias and P-Hacking =====
      {
        id: 'psy-sec17-u9-L2',
        title: 'Publication Bias and P-Hacking',
        description: 'How the incentive system distorted published science.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u9-L2-T1',
            type: 'teaching',
            question: 'The file drawer problem',
            explanation:
              'Journals strongly prefer publishing significant results (p < 0.05). Studies that find "no effect" are much harder to publish, so they end up in researchers\' file drawers. This means the published literature overrepresents positive findings and underrepresents null results.',
          },
          {
            id: 'psy-sec17-u9-L2-Q1',
            type: 'multiple-choice',
            question: 'Publication bias means the literature is skewed because...',
            options: [
              'Researchers only study interesting topics',
              'Journals are more likely to publish significant results, so null findings go unreported',
              'Only famous researchers can publish',
              'Studies with large samples never get published',
            ],
            correctIndex: 1,
            explanation:
              'The bias is toward positive, significant results. Null findings are real data that gets hidden, creating a distorted picture of what is true.',
            distractorExplanations: {
              0: 'Topic interest is separate from publication bias. The bias is specifically about significance status.',
              2: 'Early career researchers publish regularly. The bias is about results, not researcher fame.',
              3: 'Large studies are actually more likely to be published. The bias concerns significance, not sample size.',
            },
          },
          {
            id: 'psy-sec17-u9-L2-T2',
            type: 'teaching',
            question: 'P-hacking and HARKing',
            explanation:
              'P-hacking: trying many analyses until you stumble on p < 0.05. Examples include dropping outliers, adding covariates, testing multiple measures, or splitting data by subgroups until something is significant. HARKing: Hypothesizing After Results are Known. You find an unexpected result and pretend you predicted it all along.',
          },
          {
            id: 'psy-sec17-u9-L2-Q2',
            type: 'sort-buckets',
            question: 'Classify each practice as p-hacking, HARKing, or legitimate:',
            options: [
              'Testing 20 dependent variables and reporting only the one that was significant',
              'Pre-registering your hypothesis before collecting data',
              'Finding an unexpected result and writing the paper as if you predicted it',
              'Removing data points until p drops below 0.05',
              'Running a pre-planned analysis on pre-planned sample size',
              'Adding exploratory covariates until the main effect becomes significant',
            ],
            buckets: ['P-hacking', 'HARKing', 'Legitimate'],
            correctBuckets: [0, 2, 1, 0, 2, 0],
            explanation:
              'P-hacking manipulates data or analyses to get significance. HARKing rewrites the narrative to hide that a finding was unexpected. Legitimate practices involve pre-planned, transparent analysis.',
          },
          {
            id: 'psy-sec17-u9-L2-Q3',
            type: 'true-false',
            question: 'If a researcher tests 20 hypotheses at p < 0.05, about 1 will be significant by chance alone.',
            correctAnswer: true,
            explanation:
              'At alpha = 0.05, you expect 5% false positives. Testing 20 hypotheses: 20 x 0.05 = 1 expected false positive. This is why multiple comparisons need correction.',
            distractorExplanations: {
              1: 'With 20 tests at alpha = 0.05, you expect 1 false positive (20 x 0.05 = 1). This is the multiple comparisons problem.',
            },
          },
          {
            id: 'psy-sec17-u9-L2-Q4',
            type: 'multiple-choice',
            question: 'What does HARKing stand for?',
            options: [
              'Hypothesizing After Results are Known',
              'Hiding Analysis Results and Knowledge',
              'Having All Researchers Know',
              'Hypothesis Adjustment for Research Kudos',
            ],
            correctIndex: 0,
            explanation:
              'HARKing means pretending you predicted a finding that was actually discovered after looking at the data. It makes exploratory results look confirmatory.',
            distractorExplanations: {
              1: 'While HARKing does involve hiding the true process, this is not what the acronym stands for.',
              2: 'This is not a real acronym in research methodology.',
              3: 'This is not a real acronym either, though "kudos" captures the motivation behind HARKing.',
            },
          },
          {
            id: 'psy-sec17-u9-L2-Q5',
            type: 'scenario',
            question: 'What questionable research practice is being described?',
            scenario:
              'A researcher measures anxiety, depression, stress, self-esteem, and life satisfaction in her treatment study. Only the self-esteem measure shows p < 0.05. She writes the paper focusing entirely on self-esteem and does not mention the other four measures.',
            options: [
              'HARKing, because she changed her hypothesis after seeing results',
              'P-hacking, because she selectively reported only the significant outcome from multiple tests',
              'Legitimate analysis, because self-esteem was her primary variable',
              'Publication bias, because the journal rejected the other findings',
            ],
            correctIndex: 1,
            explanation:
              'Measuring five outcomes and reporting only the one that was significant is a form of p-hacking (specifically, selective outcome reporting). With five tests, finding one at p < 0.05 by chance is expected.',
            distractorExplanations: {
              0: 'HARKing involves changing the stated hypothesis. This is selective reporting of outcomes, which is p-hacking.',
              2: 'If self-esteem were truly the primary variable, she would not have measured four other outcomes. All five should be reported.',
              3: 'The journal did not reject anything. The researcher chose not to report the null results.',
            },
          },
          {
            id: 'psy-sec17-u9-L2-Q6',
            type: 'fill-blank',
            question: 'The _____ problem refers to studies with null results that never get published.',
            blanks: ['file drawer'],
            wordBank: ['file drawer', 'replication', 'power', 'baseline', 'control group'],
            explanation:
              'Null results get filed away in drawers instead of being published, creating a biased literature of mostly positive findings.',
          },
        ],
      },

      // ===== LESSON 3: Solutions and Open Science =====
      {
        id: 'psy-sec17-u9-L3',
        title: 'Open Science Solutions',
        description: 'How psychology is reforming to be more trustworthy.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u9-L3-T1',
            type: 'teaching',
            question: 'Pre-registration',
            explanation:
              'Pre-registration means publicly recording your hypotheses, methods, and analysis plan before collecting data. This prevents p-hacking and HARKing because your plan is on the record. You can still do exploratory analyses, but you must label them as exploratory.',
          },
          {
            id: 'psy-sec17-u9-L3-Q1',
            type: 'multiple-choice',
            question: 'Pre-registration primarily prevents...',
            options: [
              'Participants from dropping out',
              'Researchers from adjusting hypotheses and analyses after seeing results',
              'Journals from rejecting papers',
              'Other labs from stealing research ideas',
            ],
            correctIndex: 1,
            explanation:
              'By locking in the plan before data collection, pre-registration makes it impossible to quietly change hypotheses or analysis strategies after the fact.',
            distractorExplanations: {
              0: 'Pre-registration is about researcher behavior, not participant retention.',
              2: 'Pre-registration does not guarantee publication, though registered reports help.',
              3: 'Pre-registrations are public, not secret. They are about transparency, not protection from theft.',
            },
          },
          {
            id: 'psy-sec17-u9-L3-T2',
            type: 'teaching',
            question: 'Open science practices',
            explanation:
              'Open data: sharing raw data so others can verify analyses. Open materials: sharing questionnaires, stimuli, and code. Registered reports: journals accept papers based on the method before results are known, eliminating publication bias. These reforms increase transparency and trust.',
          },
          {
            id: 'psy-sec17-u9-L3-Q2',
            type: 'match-pairs',
            question: 'Match each open science practice to what it addresses:',
            options: [
              'Pre-registration',
              'Open data',
              'Registered reports',
              'Open materials',
            ],
            matchTargets: [
              'Prevents post-hoc changes to hypotheses and analyses',
              'Allows others to verify the analysis independently',
              'Eliminates publication bias by accepting methods before results',
              'Enables exact replication by sharing all study tools',
            ],
            correctMatches: [0, 1, 2, 3],
            explanation:
              'Each practice targets a specific weakness in the old system. Together they create a more transparent and reliable science.',
          },
          {
            id: 'psy-sec17-u9-L3-Q3',
            type: 'true-false',
            question: 'Registered reports are accepted for publication before the results are known.',
            correctAnswer: true,
            explanation:
              'Journals evaluate the research question and methodology. If the design is sound, they commit to publishing regardless of whether results are significant. This eliminates publication bias.',
            distractorExplanations: {
              1: 'Registered reports are indeed provisionally accepted based on methodology, not results. This is one of the most powerful reforms against publication bias.',
            },
          },
          {
            id: 'psy-sec17-u9-L3-Q4',
            type: 'multi-select',
            question: 'Which are open science practices? (Select all that apply)',
            options: [
              'Sharing raw data publicly',
              'Pre-registering hypotheses',
              'Keeping methods secret to prevent competitors from replicating',
              'Publishing code used for analysis',
              'Only publishing significant results',
            ],
            correctIndices: [0, 1, 3],
            explanation:
              'Open science is about transparency: sharing data, pre-registering, and publishing analysis code. Secrecy and selective publishing are the old problems, not solutions.',
          },
          {
            id: 'psy-sec17-u9-L3-Q5',
            type: 'scenario',
            question: 'What should this researcher do?',
            scenario:
              'Dr. Kim is designing a study on whether gratitude journaling reduces anxiety. She wants to make her research as trustworthy as possible. She has not started collecting data yet.',
            options: [
              'Pre-register her hypotheses and analysis plan, plan to share data and materials',
              'Collect data first, then decide which analyses to run based on what looks promising',
              'Run the study privately and only share results if they are significant',
              'Skip pre-registration because it limits her analytical freedom',
            ],
            correctIndex: 0,
            explanation:
              'Pre-registering before data collection, plus planning for open data and materials, maximizes trustworthiness. She can still run exploratory analyses as long as she labels them as such.',
            distractorExplanations: {
              1: 'Deciding analyses after seeing data is exactly the p-hacking the field is trying to eliminate.',
              2: 'Selective sharing based on significance perpetuates publication bias.',
              3: 'Pre-registration does not limit exploratory analysis. It just requires labeling it honestly.',
            },
          },
          {
            id: 'psy-sec17-u9-L3-Q6',
            type: 'fill-blank',
            question: '_____ reports are journal articles accepted based on the methodology before results are collected.',
            blanks: ['Registered'],
            wordBank: ['Registered', 'Published', 'Open', 'Peer-reviewed', 'Pre-printed'],
            explanation:
              'Registered reports commit to publication based on the question and methods, not the results. This eliminates the bias toward significant findings.',
          },
          {
            id: 'psy-sec17-u9-L3-Q7',
            type: 'rank-order',
            question: 'Rank these from most to least effective at preventing publication bias:',
            rankCriteria: 'Effectiveness against publication bias: most to least',
            steps: [
              'Registered reports (accepted before results are known)',
              'Pre-registration (analysis plan locked in advance)',
              'Open data (others can check your work)',
              'Reporting all results including null findings',
            ],
            correctOrder: [0, 1, 3, 2],
            explanation:
              'Registered reports directly eliminate publication bias. Pre-registration prevents p-hacking. Reporting all results helps but depends on researcher honesty. Open data allows verification but does not prevent selective publishing.',
          },
        ],
      },

      // ===== LESSON 4: Evaluating Research Quality =====
      {
        id: 'psy-sec17-u9-L4',
        title: 'Evaluating Research Quality',
        description: 'Red flags and green flags in published psychology research.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u9-L4-T1',
            type: 'teaching',
            question: 'Red flags in research',
            explanation:
              'Be wary of: very small samples with large claims, studies with exactly p = 0.04 or p = 0.03 (suspiciously close to 0.05), no effect sizes reported, extraordinary claims with a single study, and researchers who never find null results.',
          },
          {
            id: 'psy-sec17-u9-L4-Q1',
            type: 'category-swipe',
            question: 'Swipe each indicator as a red flag or green flag for research quality:',
            options: [
              'Pre-registered hypothesis and analysis plan',
              'Sample size of 12 with a bold claim',
              'All data and materials shared publicly',
              'Only significant results across 10 studies in one paper',
              'Large pre-registered replication with open data',
              'p-values are all suspiciously close to 0.05',
            ],
            buckets: ['Green flag', 'Red flag'],
            correctBuckets: [0, 1, 0, 1, 0, 1],
            explanation:
              'Pre-registration, open data, and large replications are positive signs. Tiny samples with big claims, suspicious p-values, and all-positive results are warning signs.',
          },
          {
            id: 'psy-sec17-u9-L4-Q2',
            type: 'multiple-choice',
            question: 'A paper reports 8 studies, all with p-values just below 0.05. What is most concerning?',
            options: [
              'The topic is not important enough',
              'The pattern suggests selective reporting or p-hacking',
              'The studies were conducted in different countries',
              'Eight studies is too many for one paper',
            ],
            correctIndex: 1,
            explanation:
              'If you run 8 honest studies, some p-values should vary widely and some may not be significant. All clustering just under 0.05 suggests the researcher nudged borderline results over the threshold.',
            distractorExplanations: {
              0: 'Topic importance is independent of statistical quality.',
              2: 'Cross-cultural replication is actually a strength, not a concern.',
              3: 'Multi-study papers are common and valuable. The issue is the suspicious pattern of p-values.',
            },
          },
          {
            id: 'psy-sec17-u9-L4-T2',
            type: 'teaching',
            question: 'Green flags to look for',
            explanation:
              'Trust research more when it has: pre-registration, adequate sample sizes, effect sizes and CIs reported, open data and materials, independent replications that confirm the finding, and transparent reporting of all measures and analyses.',
          },
          {
            id: 'psy-sec17-u9-L4-Q3',
            type: 'true-false',
            question: 'A single study published in a top journal should be considered definitive evidence.',
            correctAnswer: false,
            explanation:
              'No single study is definitive, regardless of the journal. Science depends on replication. Even prestigious journals have published findings that later failed to replicate.',
            distractorExplanations: {
              0: 'Journal prestige does not guarantee correctness. Some of the most famous non-replicating findings were published in top journals.',
            },
          },
          {
            id: 'psy-sec17-u9-L4-Q4',
            type: 'pick-the-best',
            question: 'Which piece of evidence should give you the most confidence in a finding?',
            options: [
              'It was published in a famous journal',
              'The original author strongly defends it',
              'Multiple independent labs have replicated it with pre-registered designs',
              'It has been cited thousands of times',
            ],
            correctIndex: 2,
            explanation:
              'Independent replication is the gold standard. Famous journals, passionate defenders, and high citation counts do not guarantee truth.',
            distractorExplanations: {
              0: 'Journal prestige is not proof. Many non-replicating findings appeared in top journals.',
              1: 'Author conviction is not evidence. Researchers can be wrong and still defend their work vigorously.',
              3: 'Citations reflect popularity and influence, not necessarily accuracy. Widely cited findings have later been debunked.',
            },
          },
          {
            id: 'psy-sec17-u9-L4-Q5',
            type: 'scenario',
            question: 'What is the most likely explanation for this pattern?',
            scenario:
              'A researcher publishes 15 papers over 5 years. Every single study finds significant results supporting their theory. No null findings are ever reported.',
            options: [
              'They are an exceptionally talented researcher who always designs perfect studies',
              'Their theory is so correct that it always produces significant results',
              'They likely engage in selective reporting, publishing only studies that "work" and filing away failures',
              'All 15 papers must have had very large samples',
            ],
            correctIndex: 2,
            explanation:
              'A perfect track record of only significant findings is statistically implausible. Even strong effects sometimes produce null results due to sampling variability. This pattern suggests selective reporting.',
            distractorExplanations: {
              0: 'Even the best researchers get null results sometimes. A perfect record is a red flag, not a sign of talent.',
              1: 'No theory in psychology produces significant results 100% of the time across all samples and conditions.',
              3: 'Large samples help but do not guarantee significance every time, especially across 15 different studies.',
            },
          },
          {
            id: 'psy-sec17-u9-L4-Q6',
            type: 'fill-blank',
            question: 'Independent _____ by other labs is the strongest evidence that a finding is real.',
            blanks: ['replication'],
            wordBank: ['replication', 'citation', 'publication', 'review', 'funding'],
            explanation:
              'When different researchers in different labs reproduce the same finding, confidence grows. This is the self-correcting engine of science.',
          },
        ],
      },

      // ===== LESSON 5 (Conversation): Spotting Questionable Research =====
      {
        id: 'psy-sec17-u9-L-conv',
        title: 'Spotting Questionable Research',
        description: 'A professor shares a suspicious paper. Can you identify the problems?',
        icon: '💬',
        type: 'conversation',
        xpReward: 20,
        questions: [],
        conversationStartNodeId: 'psy-sec17-u9-L-conv-C1',
        conversationNodes: [
          {
            id: 'psy-sec17-u9-L-conv-C1',
            speaker: 'Narrator',
            message:
              'Your research methods professor, Dr. Stein, shows the class a recently published paper and asks for your critical analysis.',
            nextNodeId: 'psy-sec17-u9-L-conv-C2',
          },
          {
            id: 'psy-sec17-u9-L-conv-C2',
            speaker: 'Dr. Stein',
            message:
              'This paper claims a new memory technique doubles recall. They tested 18 participants and got p = 0.047. No effect size is reported. What do you think?',
            options: [
              {
                text: 'Three red flags: tiny sample, p-value barely under 0.05, and no effect size reported. This is not convincing.',
                nextNodeId: 'psy-sec17-u9-L-conv-C3',
                quality: 'great',
                feedback:
                  'Excellent critical eye. Any one of those issues would be concerning. Together they strongly suggest this result is fragile.',
              },
              {
                text: 'It is significant at p < 0.05, so the technique works.',
                nextNodeId: 'psy-sec17-u9-L-conv-C3',
                quality: 'poor',
                feedback:
                  'A barely significant p-value with 18 participants and no effect size is extremely weak evidence. This is exactly the kind of result that often fails to replicate.',
              },
              {
                text: 'The small sample is concerning, but the p-value is fine.',
                nextNodeId: 'psy-sec17-u9-L-conv-C3',
                quality: 'okay',
                feedback:
                  'Good catch on the sample size. But a p-value of 0.047 with a small sample and no effect size means we cannot assess practical importance.',
              },
            ],
          },
          {
            id: 'psy-sec17-u9-L-conv-C3',
            speaker: 'Dr. Stein',
            message:
              'Good points. The authors also mention they measured recall with three different tests but only report results from the one that was significant. Thoughts?',
            options: [
              {
                text: 'That is selective outcome reporting. Testing three measures and reporting only the significant one inflates the false positive rate.',
                nextNodeId: 'psy-sec17-u9-L-conv-C4',
                quality: 'great',
                feedback:
                  'Exactly. With three tests at alpha = 0.05, the chance of at least one false positive is about 14%, not 5%.',
              },
              {
                text: 'It makes sense to focus on the most interesting finding.',
                nextNodeId: 'psy-sec17-u9-L-conv-C4',
                quality: 'poor',
                feedback:
                  'All measured outcomes should be reported. Cherry-picking the significant one is a form of p-hacking.',
              },
              {
                text: 'They should have corrected for multiple comparisons.',
                nextNodeId: 'psy-sec17-u9-L-conv-C4',
                quality: 'okay',
                feedback:
                  'Correction for multiple comparisons would help, but the bigger issue is that reporting only significant results among multiple tests is misleading.',
              },
            ],
          },
          {
            id: 'psy-sec17-u9-L-conv-C4',
            speaker: 'Dr. Stein',
            message:
              'Final question. What would make you believe this memory technique actually works?',
            options: [
              {
                text: 'A large pre-registered replication by an independent lab, with effect sizes and open data.',
                nextNodeId: 'psy-sec17-u9-L-conv-C5',
                quality: 'great',
                feedback:
                  'That is the gold standard. Pre-registration prevents p-hacking, large samples provide power, independent labs prevent bias, and open data allows verification.',
              },
              {
                text: 'If the same researchers run a slightly bigger study.',
                nextNodeId: 'psy-sec17-u9-L-conv-C5',
                quality: 'okay',
                feedback:
                  'A bigger study from the same team helps but is not as convincing as independent replication. The same team may have the same blind spots.',
              },
              {
                text: 'If the paper gets published in a better journal.',
                nextNodeId: 'psy-sec17-u9-L-conv-C5',
                quality: 'poor',
                feedback:
                  'Journal prestige does not fix methodological problems. The evidence needs to be stronger regardless of where it is published.',
              },
            ],
          },
          {
            id: 'psy-sec17-u9-L-conv-C5',
            speaker: 'Narrator',
            message:
              'Well done. You identified multiple red flags: a tiny sample, a barely significant p-value, missing effect sizes, and selective outcome reporting. You also know that independent pre-registered replication is the remedy. These critical evaluation skills protect you from building knowledge on unreliable findings.',
          },
        ],
      },

      // ===== LESSON 6: Replication Crisis Speed Round =====
      {
        id: 'psy-sec17-u9-L-speed',
        title: 'Replication Crisis Speed Round',
        description: 'Quick-fire questions on replication, bias, and open science.',
        icon: '⚡',
        type: 'speed-round',
        xpReward: 20,
        questions: [],
        speedTimeLimit: 60,
        speedQuestions: [
          {
            id: 'psy-sec17-u9-L-speed-SQ1',
            question: 'About what percent of the 100 psychology studies replicated?',
            options: ['10%', '39%', '75%', '90%'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u9-L-speed-SQ2',
            question: 'Publication bias favors _____ results.',
            options: ['Null', 'Significant', 'Qualitative', 'Longitudinal'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u9-L-speed-SQ3',
            question: 'P-hacking involves manipulating analyses to achieve...',
            options: ['Large samples', 'p < 0.05', 'High reliability', 'Random assignment'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u9-L-speed-SQ4',
            question: 'HARKing stands for Hypothesizing After _____ are Known.',
            options: ['Researchers', 'Results', 'Reports', 'Reviews'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u9-L-speed-SQ5',
            question: 'Pre-registration locks in your plan _____ data collection.',
            options: ['After', 'Before', 'During', 'Instead of'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u9-L-speed-SQ6',
            question: 'Registered reports are accepted based on...',
            options: ['Results', 'Methodology', 'Journal impact', 'Author fame'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u9-L-speed-SQ7',
            question: 'The file drawer problem hides _____ results.',
            options: ['Significant', 'Null', 'Fraudulent', 'Large'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u9-L-speed-SQ8',
            question: 'Open data allows others to _____ your analyses.',
            options: ['Ignore', 'Verify', 'Patent', 'Delete'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u9-L-speed-SQ9',
            question: 'Replication effect sizes in the Reproducibility Project were about _____ the originals.',
            options: ['Double', 'Half', 'Equal to', 'Triple'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u9-L-speed-SQ10',
            question: 'A p-value of exactly 0.049 should make you...',
            options: ['Very confident', 'Suspicious', 'Ignore the study', 'Celebrate'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u9-L-speed-SQ11',
            question: 'The gold standard of evidence is independent...',
            options: ['Publication', 'Replication', 'Funding', 'Review'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u9-L-speed-SQ12',
            question: 'Testing 20 hypotheses at p < 0.05 expects _____ false positive(s).',
            options: ['0', '1', '5', '20'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u9-L-speed-SQ13',
            question: 'Open materials allow other researchers to...',
            options: ['Fund your lab', 'Replicate your study exactly', 'Review your paper', 'Hire you'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u9-L-speed-SQ14',
            question: 'Reporting only significant findings from multiple measures is...',
            options: ['Good practice', 'Selective reporting', 'Required by APA', 'Meta-analysis'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u9-L-speed-SQ15',
            question: 'Exploratory analyses should be labeled as...',
            options: ['Confirmatory', 'Exploratory', 'Definitive', 'Primary'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },

  // ========================================================================
  // UNIT 10: Reading & Evaluating Research
  // ========================================================================
  {
    id: 'psy-sec17-u10',
    title: 'Reading Research Papers',
    description: 'Every psychology student needs to read papers critically. Here is the skill.',
    color: '#C2410C',
    icon: '📄',
    sectionIndex: 17,
    sectionTitle: 'Statistics & Methods',
    lessons: [
      // ===== LESSON 1: Anatomy of a Paper =====
      {
        id: 'psy-sec17-u10-L1',
        title: 'Anatomy of a Paper',
        description: 'Every empirical paper follows the same structure. Learn to navigate it.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u10-L1-T1',
            type: 'teaching',
            question: 'The standard paper structure',
            explanation:
              'Nearly every empirical psychology paper follows this order: Abstract (summary), Introduction (background and hypotheses), Methods (what they did), Results (what they found), Discussion (what it means). This is sometimes called IMRaD format.',
            hint: 'Think of it as: Why did we do this? How did we do it? What did we find? What does it mean?',
          },
          {
            id: 'psy-sec17-u10-L1-Q1',
            type: 'order-steps',
            question: 'Put the sections of an empirical paper in the correct order:',
            steps: [
              'Abstract',
              'Introduction',
              'Methods',
              'Results',
              'Discussion',
            ],
            correctOrder: [0, 1, 2, 3, 4],
            explanation:
              'This is the standard IMRaD format used by virtually all psychology journals.',
          },
          {
            id: 'psy-sec17-u10-L1-Q2',
            type: 'match-pairs',
            question: 'Match each paper section to what it contains:',
            options: [
              'Abstract',
              'Introduction',
              'Methods',
              'Results',
              'Discussion',
            ],
            matchTargets: [
              'Brief summary of the entire study',
              'Background literature and hypotheses',
              'Participants, materials, and procedure',
              'Statistical analyses and findings',
              'Interpretation, limitations, and future directions',
            ],
            correctMatches: [0, 1, 2, 3, 4],
            explanation:
              'Each section serves a distinct purpose. Knowing this lets you quickly find what you need.',
          },
          {
            id: 'psy-sec17-u10-L1-T2',
            type: 'teaching',
            question: 'How to read a paper efficiently',
            explanation:
              'Do not read front to back like a novel. Start with the abstract for the big picture. Then jump to the methods to judge quality. Check the results for effect sizes and CIs. Read the discussion for the authors\' interpretation. Finally, form your own opinion.',
          },
          {
            id: 'psy-sec17-u10-L1-Q3',
            type: 'multiple-choice',
            question: 'Which section should you read first to quickly decide if a paper is relevant to your topic?',
            options: [
              'Methods',
              'Discussion',
              'Abstract',
              'References',
            ],
            correctIndex: 2,
            explanation:
              'The abstract gives you the research question, method, key findings, and conclusion in one paragraph. It is the fastest way to decide if the paper is worth reading in full.',
            distractorExplanations: {
              0: 'Methods are important but too detailed for an initial relevance check.',
              1: 'The discussion is where authors interpret findings but reading it first skips critical context.',
              3: 'References show what sources were used but do not summarize the paper itself.',
            },
          },
          {
            id: 'psy-sec17-u10-L1-Q4',
            type: 'true-false',
            question: 'You should read a research paper from beginning to end, just like a novel.',
            correctAnswer: false,
            explanation:
              'Efficient reading means jumping between sections. Start with the abstract, check the methods, examine the results, then read the discussion. You can skip the introduction if you already know the background.',
            distractorExplanations: {
              0: 'Sequential reading is inefficient for academic papers. Strategic section-hopping is the expert approach.',
            },
          },
          {
            id: 'psy-sec17-u10-L1-Q5',
            type: 'fill-blank',
            question: 'The _____ section describes who participated, what materials were used, and what procedures were followed.',
            blanks: ['Methods'],
            wordBank: ['Methods', 'Results', 'Abstract', 'Discussion', 'Introduction'],
            explanation:
              'The Methods section is where you evaluate the quality of the research design, sample, and measurement tools.',
          },
          {
            id: 'psy-sec17-u10-L1-Q6',
            type: 'scenario',
            question: 'Where in the paper should you look?',
            scenario:
              'You are writing a literature review and want to know the exact sample size, whether there was random assignment, and what measures were used in a study.',
            options: [
              'Abstract, because it summarizes everything',
              'Methods, because it describes participants, design, and measures in detail',
              'Results, because it has the numbers',
              'Discussion, because it explains what happened',
            ],
            correctIndex: 1,
            explanation:
              'The Methods section contains the detailed information about participants, design, assignment procedures, and measurement instruments.',
            distractorExplanations: {
              0: 'The abstract gives a brief overview but lacks the detail you need for a thorough evaluation.',
              2: 'Results contain statistical findings, not design details.',
              3: 'Discussion interprets the findings but does not describe the methodology.',
            },
          },
        ],
      },

      // ===== LESSON 2: Evaluating Methodology =====
      {
        id: 'psy-sec17-u10-L2',
        title: 'Evaluating Methodology',
        description: 'Check the methods section like a detective examining evidence.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u10-L2-T1',
            type: 'teaching',
            question: 'Key things to check',
            explanation:
              'When evaluating methods, ask: Was the sample large enough? Was there random assignment? Was there a proper control group? Were participants and researchers blinded? Were measures valid and reliable? Each weakness limits what the study can claim.',
          },
          {
            id: 'psy-sec17-u10-L2-Q1',
            type: 'multi-select',
            question: 'Which features strengthen a study\'s methodology? (Select all that apply)',
            options: [
              'Large sample size',
              'Random assignment to conditions',
              'Double-blinding (neither participants nor researchers know group assignment)',
              'Using only participants who confirm the hypothesis',
              'Validated measurement instruments',
            ],
            correctIndices: [0, 1, 2, 4],
            explanation:
              'Large samples, random assignment, blinding, and validated measures all strengthen a study. Selecting participants who confirm the hypothesis is bias, not a strength.',
          },
          {
            id: 'psy-sec17-u10-L2-Q2',
            type: 'scenario',
            question: 'What is the biggest methodological weakness?',
            scenario:
              'A study tests whether a new app reduces test anxiety. They recruit 200 college students who volunteer for the study. Students choose whether to use the app or not. Students who used the app report less anxiety at the end of the semester.',
            options: [
              'The sample is too small at 200',
              'There is no random assignment; students who choose to use the app may differ from those who do not',
              'The study should have used a different measure of anxiety',
              'College students are not representative of the general population',
            ],
            correctIndex: 1,
            explanation:
              'Self-selection is the fatal flaw. Students who voluntarily use an anxiety app may be more motivated, proactive, or less anxious to begin with. Without random assignment, we cannot attribute the difference to the app.',
            distractorExplanations: {
              0: '200 participants is a reasonable sample size. The problem is assignment, not sample size.',
              2: 'The measure may or may not be ideal, but the self-selection confound is a much bigger problem.',
              3: 'Generalizability is a valid concern but secondary to the internal validity problem of self-selection.',
            },
          },
          {
            id: 'psy-sec17-u10-L2-T2',
            type: 'teaching',
            question: 'Blinding explained',
            explanation:
              'Single-blind: participants do not know their group. Double-blind: neither participants nor researchers know. Blinding prevents expectation effects. A patient who knows they got the real drug may feel better from expectation alone (placebo effect). A researcher who knows the group may unconsciously treat them differently.',
          },
          {
            id: 'psy-sec17-u10-L2-Q3',
            type: 'sort-buckets',
            question: 'Classify each as a strength or weakness in methodology:',
            options: [
              'Random assignment of 500 participants',
              'No control group',
              'Double-blind procedure',
              'Researcher knows which group each participant is in',
              'Validated and reliable measurement tools',
              'Self-selected sample of 15 volunteers',
            ],
            buckets: ['Strength', 'Weakness'],
            correctBuckets: [0, 1, 0, 1, 0, 1],
            explanation:
              'Random assignment, blinding, and validated measures are strengths. Missing controls, unblinded researchers, and tiny self-selected samples are weaknesses.',
          },
          {
            id: 'psy-sec17-u10-L2-Q4',
            type: 'true-false',
            question: 'A study with a large sample but no control group can still make strong causal claims.',
            correctAnswer: false,
            explanation:
              'Without a control group, there is no comparison. Any change might be due to maturation, history, or placebo effects. Sample size cannot compensate for this design flaw.',
            distractorExplanations: {
              0: 'Large samples increase power but cannot fix the absence of a control group. You need both for causal claims.',
            },
          },
          {
            id: 'psy-sec17-u10-L2-Q5',
            type: 'match-pairs',
            question: 'Match each blinding type to what it controls for:',
            options: [
              'Single-blind',
              'Double-blind',
              'No blinding',
            ],
            matchTargets: [
              'Participant expectation effects only',
              'Both participant and researcher expectation effects',
              'Neither expectation effect is controlled',
            ],
            correctMatches: [0, 1, 2],
            explanation:
              'Double-blind is the gold standard. Single-blind handles participant expectations. No blinding leaves both sources of bias uncontrolled.',
          },
          {
            id: 'psy-sec17-u10-L2-Q6',
            type: 'fill-blank',
            question: 'In a _____ study, neither the participants nor the researchers know who is in the treatment or control group.',
            blanks: ['double-blind'],
            wordBank: ['double-blind', 'single-blind', 'open-label', 'randomized', 'longitudinal'],
            explanation:
              'Double-blind designs prevent both participant and researcher expectations from biasing the results.',
          },
        ],
      },

      // ===== LESSON 3: Interpreting Statistics in Papers =====
      {
        id: 'psy-sec17-u10-L3',
        title: 'Interpreting Statistics in Papers',
        description: 'Look beyond p-values. The full statistical picture tells the real story.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u10-L3-T1',
            type: 'teaching',
            question: 'What to look for in Results',
            explanation:
              'When reading results, look for: effect sizes (how big is the effect?), confidence intervals (how precise is the estimate?), sample size (was there enough power?), and whether the authors tested what they said they would test. Do not just check if p < 0.05.',
          },
          {
            id: 'psy-sec17-u10-L3-Q1',
            type: 'rank-order',
            question: 'When reading a Results section, rank what to examine from most to least informative:',
            rankCriteria: 'Informativeness for understanding findings: most to least',
            steps: [
              'Effect sizes and confidence intervals',
              'Whether the result is "significant" or not',
              'The specific p-value',
              'The number of asterisks on the table',
            ],
            correctOrder: [0, 2, 1, 3],
            explanation:
              'Effect sizes and CIs give the richest information. The exact p-value is more informative than just "significant/not significant." Asterisks are the least informative way to report statistics.',
          },
          {
            id: 'psy-sec17-u10-L3-Q2',
            type: 'scenario',
            question: 'How should you interpret this results section?',
            scenario:
              'A paper reports: "The treatment group scored significantly higher than the control group, t(48) = 2.05, p = 0.046, d = 0.58, 95% CI [0.01, 1.15]."',
            options: [
              'This is a strong, clear result with a large effect',
              'The effect is medium-sized but the wide CI and barely significant p suggest uncertainty',
              'The result is not significant because p is close to 0.05',
              'The CI proves the effect is large',
            ],
            correctIndex: 1,
            explanation:
              'Cohen\'s d = 0.58 is a medium effect, which is promising. But the CI ranges from 0.01 to 1.15, meaning the true effect could be anywhere from negligible to large. The p of 0.046 is borderline. More data would help.',
            distractorExplanations: {
              0: 'The effect is medium, not large. And the wide CI means substantial uncertainty about the true size.',
              2: 'The result is technically significant at p < 0.05, but barely. Significance is a binary threshold, and 0.046 is below it.',
              3: 'The CI includes values from 0.01 (trivial) to 1.15 (large). It does not prove the effect is large.',
            },
          },
          {
            id: 'psy-sec17-u10-L3-T2',
            type: 'teaching',
            question: 'Common reporting red flags',
            explanation:
              'Be cautious when papers: report only p-values without effect sizes, use phrases like "approached significance" (p = 0.07 is not significant), report only positive results from many measures, or make causal claims from correlational data.',
          },
          {
            id: 'psy-sec17-u10-L3-Q3',
            type: 'category-swipe',
            question: 'Swipe each statement as acceptable or a red flag in results reporting:',
            options: [
              '"The result approached significance (p = 0.08)"',
              '"Cohen\'s d = 0.65, 95% CI [0.32, 0.98], p = 0.001"',
              '"The correlation was significant (r = 0.15, p = 0.03, N = 2,000)"',
              '"The treatment caused improved outcomes" (from a correlational study)',
              '"Results are shown in Table 2 with effect sizes and CIs for all comparisons"',
            ],
            buckets: ['Acceptable', 'Red flag'],
            correctBuckets: [1, 0, 1, 1, 0],
            explanation:
              '"Approached significance" is a red flag because p = 0.08 is not significant. A tiny r with huge N is technically significant but practically trivial. Causal claims from correlational data are always inappropriate.',
          },
          {
            id: 'psy-sec17-u10-L3-Q4',
            type: 'true-false',
            question: 'A result that "approaches significance" (p = 0.07) should be treated as meaningful evidence.',
            correctAnswer: false,
            explanation:
              'If p > 0.05, the result is not significant by conventional standards. "Approaching significance" is not a real statistical concept. The data failed to provide sufficient evidence.',
            distractorExplanations: {
              0: '"Approaching significance" is a euphemism for "not significant." There is no in-between zone in null hypothesis testing.',
            },
          },
          {
            id: 'psy-sec17-u10-L3-Q5',
            type: 'multiple-choice',
            question: 'A correlational study finds that ice cream sales and drowning deaths are positively correlated (r = 0.85). What should you conclude?',
            options: [
              'Ice cream causes drowning',
              'Drowning causes ice cream sales to increase',
              'A third variable (hot weather) likely causes both to increase',
              'The correlation must be wrong because it makes no logical sense',
            ],
            correctIndex: 2,
            explanation:
              'This is the classic third-variable problem. Hot weather drives both ice cream sales and swimming (thus drowning). Correlation never implies causation.',
            distractorExplanations: {
              0: 'Correlation does not establish causation. A high r does not mean one variable causes the other.',
              1: 'The reverse causal direction makes even less sense, but regardless, correlation cannot prove any causal direction.',
              3: 'The correlation is real. Both variables genuinely co-occur. The issue is that a hidden third variable explains both.',
            },
          },
          {
            id: 'psy-sec17-u10-L3-Q6',
            type: 'fill-blank',
            question: 'When reading results, always check for _____ sizes alongside p-values to understand the practical importance of findings.',
            blanks: ['effect'],
            wordBank: ['effect', 'sample', 'test', 'confidence', 'population'],
            explanation:
              'Effect sizes tell you how big the difference or relationship actually is. Without them, a significant p-value tells you very little.',
          },
        ],
      },

      // ===== LESSON 4: Evidence Hierarchy and Meta-Analysis =====
      {
        id: 'psy-sec17-u10-L4',
        title: 'Evidence Hierarchy',
        description: 'Not all evidence is equal. Learn which study types deserve the most trust.',
        icon: '📝',
        xpReward: 20,
        questions: [
          {
            id: 'psy-sec17-u10-L4-T1',
            type: 'teaching',
            question: 'The evidence pyramid',
            explanation:
              'From strongest to weakest evidence: meta-analyses (combining many studies), randomized controlled trials (RCTs), quasi-experiments, observational/correlational studies, case studies, and expert opinion. Higher levels control for more biases and provide more trustworthy conclusions.',
          },
          {
            id: 'psy-sec17-u10-L4-Q1',
            type: 'rank-order',
            question: 'Rank these evidence types from strongest to weakest:',
            rankCriteria: 'Strength of evidence: strongest to weakest',
            steps: [
              'Meta-analysis of multiple RCTs',
              'Single randomized controlled trial',
              'Observational cohort study',
              'Single case study',
              'Expert opinion',
            ],
            correctOrder: [0, 1, 2, 3, 4],
            explanation:
              'Meta-analyses synthesize many studies and are strongest. Expert opinion, while valuable, is the weakest form of evidence because it is subject to individual bias.',
          },
          {
            id: 'psy-sec17-u10-L4-T2',
            type: 'teaching',
            question: 'What is a meta-analysis?',
            explanation:
              'A meta-analysis statistically combines results from many studies on the same question. It calculates an overall effect size weighted by study quality and sample size. Forest plots visually display each study\'s effect and the combined estimate. Heterogeneity measures tell you if studies agree or disagree.',
          },
          {
            id: 'psy-sec17-u10-L4-Q2',
            type: 'multiple-choice',
            question: 'What is the main advantage of a meta-analysis over a single study?',
            options: [
              'It is cheaper to conduct',
              'It combines evidence across many studies for a more reliable overall estimate',
              'It does not require statistical expertise',
              'It always produces significant results',
            ],
            correctIndex: 1,
            explanation:
              'Meta-analyses pool data across studies, increasing precision and giving a more trustworthy estimate of the true effect than any single study can provide.',
            distractorExplanations: {
              0: 'Meta-analyses require extensive literature searching, coding, and specialized statistics. They are not cheap or easy.',
              2: 'Meta-analysis requires substantial statistical expertise, often more than a single study.',
              3: 'Meta-analyses can and do find null effects. They reflect the overall evidence, which may show no meaningful effect.',
            },
          },
          {
            id: 'psy-sec17-u10-L4-Q3',
            type: 'match-pairs',
            question: 'Match each meta-analysis term to its meaning:',
            options: [
              'Forest plot',
              'Heterogeneity',
              'Overall effect size',
              'Funnel plot',
            ],
            matchTargets: [
              'Visual display of each study\'s effect and the combined estimate',
              'The degree to which study results disagree with each other',
              'The weighted average effect across all included studies',
              'A graph used to detect publication bias',
            ],
            correctMatches: [0, 1, 2, 3],
            explanation:
              'Forest plots show individual and combined effects. Heterogeneity reveals disagreement. The overall effect is the bottom line. Funnel plots check for missing studies.',
          },
          {
            id: 'psy-sec17-u10-L4-Q4',
            type: 'true-false',
            question: 'A meta-analysis is only as good as the studies it includes.',
            correctAnswer: true,
            explanation:
              'This is the "garbage in, garbage out" principle. If the included studies are low quality, biased, or poorly conducted, the meta-analysis will amplify those problems rather than fix them.',
            distractorExplanations: {
              1: 'Combining many flawed studies does not produce a reliable answer. Quality of the input studies matters enormously.',
            },
          },
          {
            id: 'psy-sec17-u10-L4-Q5',
            type: 'scenario',
            question: 'Which source of evidence should the policymaker trust most?',
            scenario:
              'A policymaker wants to know if school breakfast programs improve academic performance. She finds: one expert\'s opinion that they help, three individual RCTs with mixed results, and a meta-analysis of 25 studies showing a small but consistent positive effect.',
            options: [
              'The expert opinion, because experts know their field best',
              'The three RCTs, because experiments are the gold standard',
              'The meta-analysis, because it synthesizes the most evidence',
              'None of them, because results are mixed',
            ],
            correctIndex: 2,
            explanation:
              'The meta-analysis of 25 studies provides the most comprehensive and reliable estimate. Mixed individual results are expected; the meta-analysis resolves disagreement by combining all evidence.',
            distractorExplanations: {
              0: 'Expert opinion is the weakest level of evidence. It is informative but should not override synthesized data.',
              1: 'Three RCTs with mixed results are harder to interpret than a meta-analysis that statistically combines 25 studies.',
              3: 'Mixed results in individual studies are normal. The meta-analysis provides the overall answer.',
            },
          },
          {
            id: 'psy-sec17-u10-L4-Q6',
            type: 'fill-blank',
            question: 'A _____ plot visually displays each study\'s effect size and the overall combined estimate in a meta-analysis.',
            blanks: ['forest'],
            wordBank: ['forest', 'funnel', 'scatter', 'bar', 'box'],
            explanation:
              'Forest plots show horizontal lines (CIs) for each study and a diamond for the overall effect. They are the signature visualization of meta-analysis.',
          },
          {
            id: 'psy-sec17-u10-L4-Q7',
            type: 'multi-select',
            question: 'What does high heterogeneity in a meta-analysis suggest? (Select all that apply)',
            options: [
              'The included studies produced very different results',
              'There may be important moderating variables',
              'All studies agree perfectly',
              'The overall effect size may not tell the full story',
              'The meta-analysis should be ignored entirely',
            ],
            correctIndices: [0, 1, 3],
            explanation:
              'High heterogeneity means studies disagree. This could be due to differences in methods, samples, or moderating variables. The overall effect may mask important variation.',
          },
        ],
      },

      // ===== LESSON 5 (Conversation): Reading a Real Paper =====
      {
        id: 'psy-sec17-u10-L-conv',
        title: 'Reading a Real Paper',
        description: 'Walk through evaluating a published study with a study group.',
        icon: '💬',
        type: 'conversation',
        xpReward: 20,
        questions: [],
        conversationStartNodeId: 'psy-sec17-u10-L-conv-C1',
        conversationNodes: [
          {
            id: 'psy-sec17-u10-L-conv-C1',
            speaker: 'Narrator',
            message:
              'Your study group is preparing for a journal club presentation. You need to critically evaluate a published paper about whether smartphone use predicts depression in adolescents.',
            nextNodeId: 'psy-sec17-u10-L-conv-C2',
          },
          {
            id: 'psy-sec17-u10-L-conv-C2',
            speaker: 'Alex',
            message:
              'The paper says "smartphone use significantly predicted depression, r = 0.12, p < 0.001, N = 10,000." That seems like a solid finding. Ten thousand participants is huge!',
            options: [
              {
                text: 'The sample is large, but r = 0.12 is a tiny effect. Smartphone use explains less than 2% of the variance in depression. The significance comes from the massive sample size.',
                nextNodeId: 'psy-sec17-u10-L-conv-C3',
                quality: 'great',
                feedback:
                  'Exactly right. r = 0.12 means r-squared = 0.014, or 1.4% of variance explained. The tiny p-value reflects sample size, not effect importance.',
              },
              {
                text: 'With p < 0.001 and 10,000 participants, this is very strong evidence that smartphones cause depression.',
                nextNodeId: 'psy-sec17-u10-L-conv-C3',
                quality: 'poor',
                feedback:
                  'Two problems: the tiny effect size means the relationship is practically negligible, and correlation does not prove causation.',
              },
              {
                text: 'The sample size is impressive. That must mean the finding is reliable.',
                nextNodeId: 'psy-sec17-u10-L-conv-C3',
                quality: 'okay',
                feedback:
                  'Large samples do give reliable estimates, but reliable does not mean important. The effect is reliably tiny.',
              },
            ],
          },
          {
            id: 'psy-sec17-u10-L-conv-C3',
            speaker: 'Alex',
            message:
              'Good point. The discussion section says "these findings suggest that reducing smartphone use could decrease depression in teens." Can they say that?',
            options: [
              {
                text: 'No. This is a correlational study, so it cannot establish that reducing phone use would cause less depression. Depressed teens might use phones more as a coping mechanism.',
                nextNodeId: 'psy-sec17-u10-L-conv-C4',
                quality: 'great',
                feedback:
                  'The causal language is unjustified. The relationship could be reversed (depression drives phone use) or explained by a third variable (loneliness drives both).',
              },
              {
                text: 'Yes, if the correlation is significant, it implies a causal relationship.',
                nextNodeId: 'psy-sec17-u10-L-conv-C4',
                quality: 'poor',
                feedback:
                  'Correlation never implies causation, regardless of significance. An experiment would be needed to test the causal claim.',
              },
              {
                text: 'They should be more cautious, but the general idea seems reasonable.',
                nextNodeId: 'psy-sec17-u10-L-conv-C4',
                quality: 'okay',
                feedback:
                  'The idea might seem intuitive, but the data do not support causal language. Many plausible explanations exist.',
              },
            ],
          },
          {
            id: 'psy-sec17-u10-L-conv-C4',
            speaker: 'Alex',
            message:
              'I also found a meta-analysis of 40 studies on screen time and well-being. It reports an overall effect of r = 0.04. How does that change things?',
            options: [
              {
                text: 'A meta-analysis of 40 studies finding r = 0.04 is strong evidence that the relationship between screen time and well-being is essentially negligible.',
                nextNodeId: 'psy-sec17-u10-L-conv-C5',
                quality: 'great',
                feedback:
                  'Right. A meta-analysis is the highest level of evidence. An r of 0.04 across 40 studies means screen time explains virtually none of the variation in well-being.',
              },
              {
                text: 'The single study with r = 0.12 is more trustworthy because it had more participants.',
                nextNodeId: 'psy-sec17-u10-L-conv-C5',
                quality: 'poor',
                feedback:
                  'A meta-analysis of 40 studies outranks any single study, regardless of that study\'s sample size.',
              },
              {
                text: 'The meta-analysis and the single study disagree, so we cannot draw any conclusions.',
                nextNodeId: 'psy-sec17-u10-L-conv-C5',
                quality: 'okay',
                feedback:
                  'They actually agree that the effect is small. The meta-analysis suggests it is even smaller than the single study found, which is consistent with the original study having an inflated estimate.',
              },
            ],
          },
          {
            id: 'psy-sec17-u10-L-conv-C5',
            speaker: 'Narrator',
            message:
              'Excellent critical reading. You identified that a significant correlation with a tiny effect size does not justify dramatic conclusions, caught inappropriate causal language in a correlational study, and correctly placed the meta-analysis above the single study in the evidence hierarchy. These skills are essential for every psychology professional.',
          },
        ],
      },

      // ===== LESSON 6: Reading Research Speed Round =====
      {
        id: 'psy-sec17-u10-L-speed',
        title: 'Reading Research Speed Round',
        description: 'Rapid recall of paper structure, methods evaluation, and evidence hierarchy.',
        icon: '⚡',
        type: 'speed-round',
        xpReward: 20,
        questions: [],
        speedTimeLimit: 60,
        speedQuestions: [
          {
            id: 'psy-sec17-u10-L-speed-SQ1',
            question: 'The standard paper format is abbreviated as...',
            options: ['ABCDE', 'IMRaD', 'SMART', 'APA'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u10-L-speed-SQ2',
            question: 'Which section describes participants, materials, and procedure?',
            options: ['Introduction', 'Methods', 'Results', 'Discussion'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u10-L-speed-SQ3',
            question: 'The strongest form of evidence is...',
            options: ['Expert opinion', 'Case study', 'Meta-analysis', 'Single RCT'],
            correctIndex: 2,
          },
          {
            id: 'psy-sec17-u10-L-speed-SQ4',
            question: 'A forest plot is used in...',
            options: ['Ecology', 'Meta-analysis', 'Case studies', 'Surveys'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u10-L-speed-SQ5',
            question: 'Double-blind means _____ know group assignment.',
            options: ['Everyone', 'Only researchers', 'Neither participants nor researchers', 'Only participants'],
            correctIndex: 2,
          },
          {
            id: 'psy-sec17-u10-L-speed-SQ6',
            question: 'Correlation proves...',
            options: ['Causation', 'Nothing about causation', 'Reverse causation', 'Mediation'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u10-L-speed-SQ7',
            question: '"Approached significance" is a _____ for "not significant."',
            options: ['Synonym', 'Euphemism', 'Scientific term', 'Improvement'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u10-L-speed-SQ8',
            question: 'Which paper section should you read first for a quick overview?',
            options: ['Methods', 'Results', 'Abstract', 'References'],
            correctIndex: 2,
          },
          {
            id: 'psy-sec17-u10-L-speed-SQ9',
            question: 'High heterogeneity in a meta-analysis means studies...',
            options: ['Agree', 'Disagree', 'Are all large', 'Used the same method'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u10-L-speed-SQ10',
            question: 'A funnel plot helps detect...',
            options: ['Outliers', 'Publication bias', 'Effect size', 'Sample size'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u10-L-speed-SQ11',
            question: 'Expert opinion is the _____ level of evidence.',
            options: ['Strongest', 'Weakest', 'Middle', 'Most common'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u10-L-speed-SQ12',
            question: 'Random assignment eliminates _____ differences between groups.',
            options: ['All', 'Pre-existing systematic', 'Statistical', 'Observed'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u10-L-speed-SQ13',
            question: 'The Discussion section covers interpretation and...',
            options: ['Raw data', 'Limitations', 'Participant names', 'Funding amounts'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u10-L-speed-SQ14',
            question: 'A meta-analysis is only as good as the _____ it includes.',
            options: ['Journals', 'Studies', 'Researchers', 'Funding'],
            correctIndex: 1,
          },
          {
            id: 'psy-sec17-u10-L-speed-SQ15',
            question: 'The weakest study design for causal claims is...',
            options: ['RCT', 'Correlational', 'Meta-analysis', 'Quasi-experimental'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
];
