const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'course', 'professions', 'personal-finance', 'units', 'section-7-credit-part1.ts');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// [afterLine, text] - afterLine is the line number of the explanation field (0-indexed)
const insertions = [
  // L42: TF "A credit score tells lenders how likely you are to repay borrowed money." correct=true
  [42, `            distractorExplanations: { 1: 'A credit score is specifically designed to predict repayment likelihood, which is its core purpose.' },`],

  // L55: MC "What is a credit score?" ci=0 opts: 3-digit number / total owed / income/age / tax ID
  [55, `            distractorExplanations: {\n              1: 'The total amount you owe is your debt balance, not your credit score.',\n              2: 'Income divided by age is not how any credit metric is calculated.',\n              3: 'A tax ID is a government identifier unrelated to creditworthiness.',\n            },`],

  // L68: TF "People with higher credit scores usually get lower interest rates on loans." correct=true
  [68, `            distractorExplanations: { 1: 'Lenders consistently offer lower rates to borrowers with higher scores because they represent less default risk.' },`],

  // L111: MC "Why might a landlord check your credit score?" ci=1
  [111, `            distractorExplanations: {\n              0: 'Identity verification for taxes uses tax IDs, not credit scores.',\n              2: 'Utility bills are calculated based on usage, not credit scores.',\n              3: 'Apartment size is determined by floor plans and availability, not a tenant\\'s credit.',\n            },`],

  // L136: TF "Credit bureaus are companies that collect data about your borrowing history." correct=true
  [136, `            distractorExplanations: { 1: 'Credit bureaus exist specifically to gather and maintain borrowing and payment data on consumers.' },`],

  // L169: MC "Which scoring model do most lenders use?" ci=1
  [169, `            distractorExplanations: {\n              0: 'VantageScore is used by some lenders but FICO dominates with about 90% market share.',\n              2: 'Equifax is a credit bureau that collects data, not a scoring model.',\n              3: 'BankRate is a financial media company, not a credit scoring model.',\n            },`],

  // L196: MC "Why might your credit score differ between bureaus?" ci=2
  [196, `            distractorExplanations: {\n              0: 'All three major bureaus use the same 300-to-850 scale for FICO scores.',\n              1: 'Bureaus use systematic data collection, not random assignment.',\n              3: 'All three bureaus can be accurate; differences come from varying data, not accuracy issues.',\n            },`],

  // L233: TF "A FICO score of 300 is the lowest possible score." correct=true
  [233, `            distractorExplanations: { 1: 'The FICO scale officially ranges from 300 to 850, with 300 being the absolute minimum.' },`],

  // L262: MC "What score range is considered 'good' by FICO standards?" ci=1
  [262, `            distractorExplanations: {\n              0: '580 to 669 is the fair range, one tier below good.',\n              2: '740 to 799 is the very good range, one tier above good.',\n              3: '800 to 850 is the exceptional range, the highest tier.',\n            },`],

  // L276: scenario "Which outcome is most likely for Priya?" ci=1 (score 580, mortgage)
  [276, `            distractorExplanations: {\n              0: 'A 580 score is in the fair range and would not qualify for the lowest available rates.',\n              2: 'Credit scores are always checked during the mortgage application process.',\n              3: 'A fair credit score does not guarantee automatic approval for any loan amount.',\n            },`],

  // L295: MC "Someone with a score of 760 falls into which tier?" ci=2
  [295, `            distractorExplanations: {\n              0: 'Good is 670 to 739; a 760 score exceeds that range.',\n              1: 'Fair is 580 to 669; a 760 score is far above that range.',\n              3: 'Poor is 300 to 579; a 760 score is nowhere near that range.',\n            },`],

  // L336: TF "A 2% difference in mortgage rate can cost over $100,000 in extra payments on a 30-year loan." correct=true
  [336, `            distractorExplanations: { 1: 'On a $250,000 loan over 30 years, even a small rate difference compounds into tens of thousands of dollars.' },`],

  // L349: MC "Which of these is NOT typically affected by your credit score?" ci=1
  [349, `            distractorExplanations: {\n              0: 'Car loan interest rates are directly influenced by your credit score.',\n              2: 'Landlords commonly check credit scores as part of the rental application process.',\n              3: 'Many insurance companies use credit-based scores to set premium rates.',\n            },`],

  // L369: scenario "What's the best approach for Marcus?" ci=0 (score 620, landlord requires 650)
  [369, `            distractorExplanations: {\n              1: 'Lying on applications is fraud and can result in eviction or legal consequences.',\n              2: 'Most landlords require credit checks regardless of payment method.',\n              3: 'Ignoring the requirement will likely result in a denial without any negotiation.',\n            },`],

  // L402: MC "When does your credit score update?" ci=2
  [402, `            distractorExplanations: {\n              0: 'Scores update continuously throughout the year as new data arrives, not just on birthdays.',\n              1: 'Scores update whenever any creditor reports new data, not only during loan applications.',\n              3: 'There is no annual reset date; scores change whenever new information is reported.',\n            },`],

  // L566: TF "Payment history makes up the largest portion of your FICO score." correct=true
  [566, `            distractorExplanations: { 1: 'At 35%, payment history outweighs all other FICO factors including amounts owed at 30%.' },`],

  // L579: MC "What percentage of your FICO score comes from payment history?" ci=3
  [579, `            distractorExplanations: {\n              0: '10% is the weight for new credit or credit mix, not payment history.',\n              1: '15% is the weight for length of credit history.',\n              2: '30% is the weight for amounts owed, the second largest factor.',\n            },`],

  // L606: MC "Which payment behavior helps your score the most?" ci=1
  [606, `            distractorExplanations: {\n              0: 'Paying once a year means missing 11 monthly on-time payment opportunities.',\n              2: 'Paying double every other month still results in missed months that count as late.',\n              3: 'Waiting for a reminder means you are already past due, which damages your score.',\n            },`],

  // L620: scenario "What should Aisha do?" ci=0 (25 days past due)
  [620, `            distractorExplanations: {\n              1: 'Waiting until next month means the payment crosses the 30-day threshold and gets reported as late.',\n              2: 'Closing the account does not eliminate the late payment and removes available credit.',\n              3: 'The damage is not yet done at 25 days; paying now prevents a negative mark on her report.',\n            },`],

  // L633: TF "A late payment from 6 years ago hurts your score as much as one from last month." correct=false
  [633, `            distractorExplanations: { 0: 'FICO weighs recent activity more heavily, so an older late payment has much less impact than a recent one.' },`],

  // L657: TF "Amounts owed is the second largest factor in your FICO score." correct=true
  [657, `            distractorExplanations: { 1: 'At 30%, amounts owed is second only to payment history (35%) in the FICO formula.' },`],

  // L670: MC "What is credit utilization?" ci=1
  [670, `            distractorExplanations: {\n              0: 'The number of cards you own is not a ratio; utilization measures balance relative to limit.',\n              2: 'The interest rate on your card is a cost metric, not a usage metric.',\n              3: 'Months of credit history relates to length of history, not amounts owed.',\n            },`],

  // L690: MC "You have a $5,000 credit limit and a $2,000 balance. What's your utilization?" ci=2
  [690, `            distractorExplanations: {\n              0: '20% would mean a $1,000 balance on a $5,000 limit.',\n              1: '25% would mean a $1,250 balance on a $5,000 limit.',\n              3: '50% would mean a $2,500 balance on a $5,000 limit.',\n            },`],

  // L733: MC "Which utilization percentage is generally best for your score?" ci=1
  [733, `            distractorExplanations: {\n              0: 'Zero utilization shows no recent credit activity, which gives lenders no evidence of responsible use.',\n              2: '50% to 60% utilization is considered high and would hurt your score.',\n              3: '90% to 100% signals maxed-out credit and severely damages your score.',\n            },`],

  // L757: TF "Having credit accounts open for many years helps your score." correct=true
  [757, `            distractorExplanations: { 1: 'Length of credit history is 15% of your FICO score, and longer histories demonstrate more experience.' },`],

  // L770: MC "Which scenario would give the best length of history score?" ci=2
  [770, `            distractorExplanations: {\n              0: 'One card opened last month provides almost no credit history.',\n              1: 'Three cards opened recently all have short histories and lower the average age.',\n              3: 'Five new cards drastically reduce average account age, hurting this factor.',\n            },`],

  // L790: scenario "What advice would you give?" ci=0 (Derek applied for 4 cards in 2 weeks)
  [790, `            distractorExplanations: {\n              1: 'Opening many cards quickly generates multiple hard inquiries and lowers average account age.',\n              2: 'Each credit application triggers a hard inquiry that can lower your score by several points.',\n              3: 'More applications would compound the damage from hard inquiries even further.',\n            },`],

  // L853: TF "Having perfect payment history guarantees a score above 750." correct=false
  [853, `            distractorExplanations: { 0: 'Payment history is only 35% of your score; high utilization, short history, or many new accounts can still drag it down.' },`],

  // L867: scenario "Which factor is likely hurting Sam's score the most?" ci=1 (85% utilization)
  [867, `            distractorExplanations: {\n              0: 'Sam always pays on time, so payment history is not the problem.',\n              2: 'Eight years of credit history is solid and would help, not hurt, the score.',\n              3: 'Sam has no new applications, so new credit inquiries are not an issue.',\n            },`],

  // L901: MC "Which 2 actions would improve a credit score the fastest?" ci=1
  [901, `            distractorExplanations: {\n              0: 'Opening 5 new accounts creates hard inquiries and lowers average age, both hurting your score.',\n              2: 'Closing old accounts shortens credit history and applying for new ones adds hard inquiries.',\n              3: 'Checking your score does not change it, and disputing accurate information will not help.',\n            },`],

  // L915: scenario "What should Leila prioritize?" ci=1 (620 score, maxed cards, 1 missed payment)
  [915, `            distractorExplanations: {\n              0: 'Opening new cards adds hard inquiries, lowers average age, and does not fix utilization.',\n              2: 'Closing the oldest card shortens credit history, which would further hurt her score.',\n              3: 'A personal loan adds an inquiry and more debt without addressing the core issues.',\n            },`],

  // L928: MC "Why is closing your oldest credit card usually a bad idea?" ci=0
  [928, `            distractorExplanations: {\n              1: 'Most cards do not charge a cancellation fee for closing an account.',\n              2: 'Reward points policies vary by issuer; many allow redemption before or after closing.',\n              3: 'Closing a card does not trigger a collections report if the balance is paid off.',\n            },`],

  // L996: TF "Credit utilization is calculated by dividing your balance by your credit limit." correct=true
  [996, `            distractorExplanations: { 1: 'The utilization formula is specifically balance divided by credit limit, expressed as a percentage.' },`],

  // L1009: MC "$6,000 limit, $1,500 balance. What's your utilization?" ci=1
  [1009, `            distractorExplanations: {\n              0: '15% would require a $900 balance on a $6,000 limit.',\n              2: '40% would require a $2,400 balance on a $6,000 limit.',\n              3: '60% would require a $3,600 balance on a $6,000 limit.',\n            },`],

  // L1028: MC "Which utilization level would concern a lender the most?" ci=3
  [1028, `            distractorExplanations: {\n              0: '8% utilization is excellent and signals very responsible credit use.',\n              1: '22% is within the healthy range and would not concern lenders.',\n              2: '45% is above ideal but far less alarming than 85% utilization.',\n            },`],

  // L1049: TF "Past high utilization continues to hurt your score even after you pay it down." correct=false
  [1049, `            distractorExplanations: { 0: 'Utilization is a snapshot with no memory; once you lower your balance, only the new lower ratio is scored.' },`],

  // L1062: MC "$4,000 on $4,000 limit. What's your utilization?" ci=3
  [1062, `            distractorExplanations: {\n              0: '25% would mean owing only $1,000 of a $4,000 limit.',\n              1: '50% would mean owing $2,000 of a $4,000 limit.',\n              2: '75% would mean owing $3,000 of a $4,000 limit.',\n            },`],

  // L1086: TF "FICO only looks at your total utilization across all cards combined." correct=false
  [1086, `            distractorExplanations: { 0: 'FICO checks both per-card and overall utilization, so one maxed card hurts even if others are empty.' },`],

  // L1100: scenario "What's Robin's overall utilization?" ci=2 (2 cards: $500/$2K + $1000/$3K)
  [1100, `            distractorExplanations: {\n              0: '20% does not match the math; $1,500 total balance divided by $5,000 total limit is 30%.',\n              1: '25% would require a $1,250 balance, not $1,500.',\n              3: '50% would require a $2,500 balance on $5,000 total limit.',\n            },`],

  // L1120: MC "Which situation is better for your score?" ci=1
  [1120, `            distractorExplanations: {\n              0: 'One card at 60% has damaging per-card utilization even if overall is moderate.',\n              2: 'One card at 90% severely hurts per-card utilization regardless of other empty cards.',\n              3: 'Three cards each at 40% means every card exceeds the 30% threshold.',\n            },`],

  // L1142: MC "$10K limit at $8K + $5K limit at $0. Overall utilization?" ci=1
  [1142, `            distractorExplanations: {\n              0: '40% would mean $6,000 total balance on $15,000, not $8,000.',\n              2: '67% does not match; $8,000 divided by $15,000 is approximately 53%.',\n              3: '80% is the per-card utilization of the first card, not the overall ratio.',\n            },`],

  // L1155: TF "Getting a higher credit limit can lower your utilization without changing your spending." correct=true
  [1155, `            distractorExplanations: { 1: 'A higher limit increases the denominator in the utilization formula, lowering the percentage with the same balance.' },`],

  // L1179: TF "The optimal credit utilization for the highest scores is between 1% and 9%." correct=true
  [1179, `            distractorExplanations: { 1: 'Research consistently shows top scorers maintain utilization in the 1% to 9% range.' },`],

  // L1192: MC "Why is 0% utilization not the best for your score?" ci=1
  [1192, `            distractorExplanations: {\n              0: 'Having 0% utilization is completely legal; the issue is lack of demonstrated credit use.',\n              2: 'Bureaus can calculate a score with 0% utilization, but it signals inactivity.',\n              3: 'Banks do not charge fees for unused credit on most consumer credit cards.',\n            },`],

  // L1226: scenario "What should Nadia do before her statement closes?" ci=0 ($4,200 on $10K)
  [1226, `            distractorExplanations: {\n              1: 'Letting the full $4,200 report means 42% utilization, well above the optimal range.',\n              2: 'Maxing out the card would report 100% utilization, severely damaging her score.',\n              3: 'Decreasing her credit limit would increase her utilization percentage, not lower it.',\n            },`],

  // L1255: TF "If you had 80% utilization last month but 5% this month, only 5% affects your current score." correct=true
  [1255, `            distractorExplanations: { 1: 'Utilization has no memory and only the most recently reported balance is used in score calculations.' },`],

  // L1280: TF "The balance reported to credit bureaus is based on your statement date, not your due date." correct=true
  [1280, `            distractorExplanations: { 1: 'The statement closing date determines the balance snapshot sent to bureaus, not the payment due date.' },`],

  // L1293: MC "When should you pay to get the lowest utilization reported?" ci=2
  [1293, `            distractorExplanations: {\n              0: 'Paying on the due date is too late because the balance was already reported on the statement date.',\n              1: 'Paying after the due date incurs a late fee and damages payment history.',\n              3: 'The card opening anniversary has no connection to when balances are reported.',\n            },`],

  // L1313: scenario "What's the best strategy for Kai?" ci=0 (statement closes 15th, spends $2K on $5K)
  [1313, `            distractorExplanations: {\n              1: 'Paying on the 5th means the full $2,000 balance was already reported on the 15th.',\n              2: 'Switching to minimum payments would cause interest charges and higher reported balances.',\n              3: 'Stopping card use entirely means 0% utilization, which is not optimal either.',\n            },`],

  // L1345: MC "Why does paying before the statement close improve your score?" ci=1
  [1345, `            distractorExplanations: {\n              0: 'Interest charges are avoided by paying in full by the due date, not specifically by early payment.',\n              2: 'Making multiple payments in a month is fine, but it does not count as extra on-time payments.',\n              3: 'Banks do not give bonus rewards for early payments; the benefit is a lower reported balance.',\n            },`],

  // L1504: TF "FICO scores range from 100 to 900." correct=false
  [1504, `            distractorExplanations: { 0: 'FICO scores actually range from 300 to 850, not 100 to 900.' },`],

  // L1517: MC "Which FICO factor has the greatest weight?" ci=3
  [1517, `            distractorExplanations: {\n              0: 'Credit mix at 10% is one of the smallest factors, not the greatest.',\n              1: 'Length of history at 15% is a mid-weight factor.',\n              2: 'Amounts owed at 30% is the second largest, but payment history at 35% is the biggest.',\n            },`],

  // L1575: scenario "Which factor is most likely causing the low score?" ci=2 (Chen: 590, missed 4 payments, 70% utilization)
  [1575, `            distractorExplanations: {\n              0: 'Chen has 12 years of credit history, which is strong and not the problem.',\n              1: 'Chen has no recent applications, so new credit inquiries are not dragging down the score.',\n              3: 'Chen has 3 different account types, which is adequate credit mix.',\n            },`],

  // L1606: scenario "What should Tara do first?" ci=0 (660 score, 55% utilization, missed payment)
  [1606, `            distractorExplanations: {\n              1: 'Opening new cards would add hard inquiries and lower average account age before a mortgage.',\n              2: 'Closing the oldest card shortens credit history and reduces available credit.',\n              3: 'Waiting until after the mortgage means getting a worse rate or being denied.',\n            },`],

  // L1619: MC "Alex has a 720 score and is offered a credit limit increase. Should he accept?" ci=1
  [1619, `            distractorExplanations: {\n              0: 'Higher limits do not automatically lead to more debt if spending habits stay the same.',\n              2: 'Many banks offer limit increases without a hard inquiry when the customer requests or is offered one.',\n              3: 'Using the extra credit immediately would raise utilization, which defeats the purpose.',\n            },`],

  // L1651: MC "Which combination of scores across 3 bureaus suggests a data error?" ci=2
  [1651, `            distractorExplanations: {\n              0: 'Scores of 718, 722, and 715 are very close and reflect normal variation between bureaus.',\n              1: 'Scores of 680, 685, and 678 show small differences that are typical across bureaus.',\n              3: 'Scores of 690, 695, and 688 are closely grouped and suggest consistent data.',\n            },`],

  // L1667: TF "Paying your full credit card balance every month means utilization is always 0%." correct=false
  [1667, `            distractorExplanations: { 0: 'Your balance is reported on the statement date, so charges during the cycle appear even if you pay in full by the due date.' },`],

  // L1735: TF "A secured credit card requires a cash deposit upfront." correct=true
  [1735, `            distractorExplanations: { 1: 'Secured cards specifically require a cash deposit that serves as collateral and sets the credit limit.' },`],

  // L1748: MC "What typically determines the credit limit on a secured card?" ci=1
  [1748, `            distractorExplanations: {\n              0: 'Income level may affect approval but the credit limit on a secured card is set by the deposit amount.',\n              2: 'With no existing credit score, the deposit amount is what determines the limit.',\n              3: 'The bank\\'s current interest rate affects borrowing costs, not the secured card limit.',\n            },`],

  // L1761: TF "Credit bureaus can tell the difference between secured and unsecured credit cards." correct=false
  [1761, `            distractorExplanations: { 0: 'Most secured cards report identically to unsecured cards, so bureaus do not distinguish between them.' },`],

  // L1782: MC "What happens to your deposit when you close a secured card in good standing?" ci=2
  [1782, `            distractorExplanations: {\n              0: 'The deposit is refundable and not a processing fee; it is returned when the account is closed in good standing.',\n              1: 'Security deposits do not convert into reward points; they are cash returned to you.',\n              3: 'Deposits are returned to the cardholder, not donated to any organization.',\n            },`],

  // L1825: TF "Being added as an authorized user can help build your credit history." correct=true
  [1825, `            distractorExplanations: { 1: 'The primary cardholder\\'s account history gets added to your credit report, helping establish your track record.' },`],

  // L1838: MC "Who is responsible for paying the bill on an authorized user account?" ci=2
  [1838, `            distractorExplanations: {\n              0: 'The authorized user is not legally responsible for paying the bill.',\n              1: 'Responsibility is not split equally; the primary cardholder bears full legal obligation.',\n              3: 'Credit bureaus track data but have no role in bill payments.',\n            },`],

  // L1859: scenario "Which person should Jamal ask?" ci=1 (mom 780 vs friend 610)
  [1859, `            distractorExplanations: {\n              0: 'Age similarity is irrelevant; the friend\\'s poor credit habits would hurt Jamal\\'s score.',\n              2: 'Authorized user accounts do appear on credit reports and can build credit.',\n              3: 'Adding accounts with poor history would hurt Jamal rather than provide double benefit.',\n            },`],

  // L1888: TF "You must actively use the credit card to benefit from being an authorized user." correct=false
  [1888, `            distractorExplanations: { 0: 'Just being listed on the account is enough; the account history reports to your file regardless of card use.' },`],

  // L1901: MC "What's a risk of the authorized user strategy?" ci=1
  [1901, `            distractorExplanations: {\n              0: 'Authorized users are not typically charged separate annual fees.',\n              2: 'Most authorized user accounts do appear on credit reports at all three bureaus.',\n              3: 'Your identity does not become permanently linked; you can be removed from the account.',\n            },`],

  // L1926: TF "With a credit-builder loan, you receive the money after you finish making payments." correct=true
  [1926, `            distractorExplanations: { 1: 'Credit-builder loans hold the funds in a savings account until all payments are completed, by design.' },`],

  // L1939: MC "How does a credit-builder loan differ from a regular loan?" ci=1
  [1939, `            distractorExplanations: {\n              0: 'Getting money upfront is how a regular loan works, not a credit-builder loan.',\n              2: 'Credit-builder loans do charge interest, though the rates are typically low.',\n              3: 'Monthly payments are required; that payment history is the whole point of the product.',\n            },`],

  // L1986: MC "What's the primary benefit of a credit-builder loan?" ci=1
  [1986, `            distractorExplanations: {\n              0: 'Credit-builder loans do not provide money upfront; funds are released after all payments.',\n              2: 'Earning interest on the deposit is minimal; the real benefit is credit history building.',\n              3: 'The loan specifically reports to credit bureaus, which is its entire purpose.',\n            },`],

  // L2000: scenario "Which combination would be most effective?" ci=0 (Priya, no history, $500 savings)
  [2000, `            distractorExplanations: {\n              1: 'Applying for 5 regular cards generates multiple hard inquiries and likely rejections with no history.',\n              2: 'Lending money to a friend does not get reported to credit bureaus and builds no credit.',\n              3: 'A savings account alone does not build credit; you need active credit accounts.',\n            },`],

  // L2039: TF "You need to carry a balance on your credit card to build credit." correct=false
  [2039, `            distractorExplanations: { 0: 'Paying in full every month still generates on-time payment history and builds credit without paying interest.' },`],

  // L2058: MC "How long does it typically take to go from no credit to a scoreable credit file?" ci=1
  [2058, `            distractorExplanations: {\n              0: 'One to two weeks is far too short; scoring models need months of payment data.',\n              2: 'Three to five years is how long it takes to build a solid history, not just a scoreable file.',\n              3: 'Ten or more years is far longer than needed to generate an initial credit score.',\n            },`],

  // L2088: scenario "What's the best next step for Marco?" ci=1 (secured card 8 months, 650 score)
  [2088, `            distractorExplanations: {\n              0: 'Applying for 5 cards creates multiple hard inquiries and lowers average account age.',\n              2: 'Closing the secured card removes his only credit history and would hurt his score.',\n              3: 'Stopping credit use entirely provides no new positive data and stalls progress.',\n            },`],

  // L2107: MC "Which is a red flag for a credit repair scam?" ci=1
  [2107, `            distractorExplanations: {\n              0: 'Suggesting free report checks is legitimate advice, not a scam indicator.',\n              2: 'Recommending a secured credit card is standard advice from legitimate credit counselors.',\n              3: 'Explaining that building credit takes months is honest and accurate guidance.',\n            },`],
];

// Apply insertions from bottom to top
insertions.sort((a, b) => b[0] - a[0]);
for (const [afterLine, text] of insertions) {
  lines.splice(afterLine, 0, text);
}

fs.writeFileSync(filePath, lines.join('\n'));
console.log(`Updated section-7-credit-part1.ts: inserted ${insertions.length} distractorExplanations`);
