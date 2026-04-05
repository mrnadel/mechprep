const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'course', 'professions', 'personal-finance', 'units', 'section-6-debt-part1.ts');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Map of explanationLine -> distractorExplanations to insert
// Format: [lineNumber, indentSpaces, distractorObj]
// indentSpaces is the indentation of the explanation line

const insertions = [
  // L41: true-false: "A mortgage is considered better debt than credit card debt because it builds equity." correct=true
  [42, `            distractorExplanations: { 1: 'Mortgages do build equity in appreciating assets, making them generally better than high-interest credit card debt.' },`],

  // L55: MC: "Why is credit card debt generally considered bad debt?" ci=1, opts: illegal/high interest/small items/closed after 1yr
  [55, `            distractorExplanations: {\n              0: 'Credit cards are legal worldwide; legality has nothing to do with why the debt is considered bad.',\n              2: 'Credit cards can be used for purchases of any size, not just small items.',\n              3: 'Banks do not automatically close credit card accounts after one year.',\n            },`],

  // L67: true-false: "A business loan used to start a profitable company is an example of good debt." correct=true
  [68, `            distractorExplanations: { 1: 'A profitable business generates returns that exceed the loan cost, which is the definition of good debt.' },`],

  // L104: MC: "Which is the best test to tell good debt from bad debt?" ci=2
  [105, `            distractorExplanations: {\n              0: 'Payment size alone does not determine whether debt is good or bad.',\n              1: 'Approval speed reflects bank processes, not the quality of the debt.',\n              3: 'A fixed rate threshold ignores context; a 6% loan on a depreciating asset can still be bad debt.',\n            },`],

  // L118: scenario: "What type of debt is this?" ci=2 (Alex electronics)
  [119, `            distractorExplanations: {\n              0: 'Usefulness does not make debt good if the items lose value while interest accumulates.',\n              1: 'Bank approval does not make a purchase a wise financial decision.',\n              3: 'The dollar amount is not the issue; the rapid depreciation plus high interest makes it bad debt.',\n            },`],

  // L143: true-false: "You should evaluate whether you can comfortably afford payments before taking on debt." correct=true
  [144, `            distractorExplanations: { 1: 'Unaffordable payments lead to missed payments, late fees, and credit damage, so evaluating affordability is essential.' },`],

  // L169: true-false: "A high interest rate on a loan is a signal that the lender considers it risky." correct=true
  [170, `            distractorExplanations: { 1: 'Lenders price risk into interest rates, so higher rates genuinely reflect higher perceived risk.' },`],

  // L191: MC: "Sam can afford payments on a car loan at 4% interest..." ci=2
  [192, `            distractorExplanations: {\n              0: 'Affordability alone does not make debt good; the purpose and value matter too.',\n              1: 'Not all car loans are bad; a necessary vehicle enabling income can be a reasonable use of debt.',\n              3: 'While cars do lose value, a car needed for work provides an income return that offsets depreciation.',\n            },`],

  // L210: MC: "Which factor matters most when deciding if a specific debt is worth taking on?" ci=1
  [211, `            distractorExplanations: {\n              0: 'Friends\\' opinions are irrelevant to the financial math of whether debt creates value.',\n              2: 'Getting approved only means the lender thinks you can repay, not that the debt is wise.',\n              3: 'The lowest monthly payment often means a longer term with more total interest.',\n            },`],

  // L224: scenario: "Is this a smart use of debt?" ci=1 (Priya certification)
  [225, `            distractorExplanations: {\n              0: 'Education debt that leads to higher earnings is a classic example of good debt.',\n              2: 'The dollar amount matters less than the return on investment, which here is strongly positive.',\n              3: 'A low rate helps, but the real reason is the return exceeds the cost.',\n            },`],

  // L263: MC: "A landlord borrows $200,000 at 6% interest and earns 10% from rental income." ci=1
  [264, `            distractorExplanations: {\n              0: 'Loan size alone does not make debt bad; what matters is whether returns exceed the cost.',\n              2: 'Many real estate investors earn 10% or more through rental income and appreciation.',\n              3: 'This is a calculated investment with measurable returns, not a gamble.',\n            },`],

  // L276: true-false: "Leverage can increase your losses, not just your gains." correct=true
  [277, `            distractorExplanations: { 1: 'Leverage amplifies both gains and losses because you still owe the full debt even if the asset drops in value.' },`],

  // L289: MC: "Which scenario shows leverage gone wrong?" ci=2
  [290, `            distractorExplanations: {\n              0: 'A home doubling in value is leverage working well, not going wrong.',\n              1: 'A student loan for a high-paying career is strategic debt with a positive return.',\n              3: 'A business loan that leads to profit is successful leverage.',\n            },`],

  // L318: MC: "What is the golden rule of using debt as a tool?" ci=1
  [319, `            distractorExplanations: {\n              0: 'Borrowing the maximum approved amount ignores whether the debt creates enough value to justify the cost.',\n              2: 'A salary-based limit is arbitrary and does not account for the return on the borrowed money.',\n              3: 'Longer terms increase total interest paid and do not make debt smarter.',\n            },`],

  // L332: scenario: "Should Jamie use debt here?" ci=1 (side business equipment)
  [333, `            distractorExplanations: {\n              0: 'Not every business justifies debt; the projected return must exceed the borrowing cost.',\n              2: 'Whether 8% is low depends on the return; the return here exceeds the cost, but 8% alone is not the reason.',\n              3: 'The dollar amount is less important than whether the investment generates a return above the interest cost.',\n            },`],

  // L357: true-false: "Making only minimum payments on credit cards is a warning sign of debt trouble." correct=true
  [358, `            distractorExplanations: { 1: 'Minimum payments barely cover interest, so the balance hardly shrinks, which is a clear warning sign.' },`],

  // L370: MC: "Which behavior is the biggest warning sign of a debt problem?" ci=2
  [371, `            distractorExplanations: {\n              0: 'Having one card with a low balance is normal and responsible credit use.',\n              1: 'Paying your full balance monthly is the best credit card habit, not a warning sign.',\n              3: 'Setting up autopay is a smart financial habit that prevents missed payments.',\n            },`],

  // L426: MC: "What should you do first if you notice warning signs of a debt problem?" ci=2
  [427, `            distractorExplanations: {\n              0: 'Opening a new card adds more debt capacity, which worsens the problem.',\n              1: 'Ignoring debt problems allows interest to compound and the situation to deteriorate.',\n              3: 'Taking a loan to invest in stocks adds risk on top of existing debt trouble.',\n            },`],

  // L440: scenario: "What should Dana do?" ci=1 (3 maxed cards, 4th card)
  [441, `            distractorExplanations: {\n              0: 'Using a new card to pay old ones only delays the problem while adding more debt.',\n              2: 'Balance transfers without a payoff plan just move debt around without solving it.',\n              3: 'Closing old cards and using only the new one does not reduce the total debt owed.',\n            },`],

  // L591: true-false: "Simple interest is calculated only on the original amount borrowed." correct=true
  [592, `            distractorExplanations: { 1: 'Simple interest by definition uses only the principal for calculations, not accumulated interest.' },`],

  // L604: MC: "What makes compound interest grow faster than simple interest?" ci=1
  [605, `            distractorExplanations: {\n              0: 'Compound interest does not necessarily use a higher base rate; the compounding mechanism is what accelerates growth.',\n              2: 'Compound interest growth comes from interest-on-interest, not from added fees.',\n              3: 'The frequency of calculation varies, but compound interest is faster because it charges interest on prior interest.',\n            },`],

  // L640: MC: "$1,000 at 10% compound for 2 years" ci=2
  [641, `            distractorExplanations: {\n              0: '$1,100 is only the amount after year 1; year 2 adds interest on the new $1,100 balance.',\n              1: '$1,200 would be the result of simple interest, not compound.',\n              3: '$1,300 overstates the amount; 10% compound on $1,000 for 2 years yields $1,210.',\n            },`],

  // L653: true-false: "Compound interest helps savers but hurts borrowers." correct=true
  [654, `            distractorExplanations: { 1: 'Compound interest grows both savings and debts; it benefits the side that earns it and costs the side that owes it.' },`],

  // L678: scenario: "Which loan will cost more in interest over 5 years?" ci=2
  [679, `            distractorExplanations: {\n              0: 'Simple interest is actually less expensive because it does not charge interest on interest.',\n              1: 'At the same rate, compound interest always costs more than simple interest over time.',\n              3: 'The math is deterministic; the lender does not change which type costs more.',\n            },`],

  // L703: true-false: "Most credit cards compound interest on a daily basis." correct=true
  [704, `            distractorExplanations: { 1: 'Daily compounding is the industry standard for credit cards, making them more expensive than monthly-compounding loans.' },`],

  // L716: MC: "Why does daily compounding cost more than monthly compounding?" ci=1
  [717, `            distractorExplanations: {\n              0: 'Daily and monthly compounding can use the same annual rate; the difference is how often interest is added.',\n              2: 'Banks do not charge extra fees for daily calculations; the cost comes from more frequent compounding.',\n              3: 'There is no government discount for monthly compounding; the math simply compounds less often.',\n            },`],

  // L743: MC: "When do you lose your credit card's grace period?" ci=1
  [744, `            distractorExplanations: {\n              0: 'Purchase size does not affect the grace period; carrying a balance is what eliminates it.',\n              2: 'Transaction frequency has no effect on the grace period.',\n              3: 'Card age does not determine grace period eligibility.',\n            },`],

  // L765: true-false: "Credit card interest is typically calculated on your average daily balance for the month." correct=true
  [766, `            distractorExplanations: { 1: 'The average daily balance method is the standard way credit card issuers calculate monthly interest charges.' },`],

  // L779: scenario: "Will Chris pay interest this month?" ci=2 (carrying $2,000 balance)
  [780, `            distractorExplanations: {\n              0: 'The grace period only applies when you carry no balance; Chris already has an unpaid balance.',\n              1: 'Interest applies to the entire balance, not just new purchases, once the grace period is lost.',\n              3: 'Both old and new charges accrue interest when you carry a balance from the prior month.',\n            },`],

  // L804: true-false: "Most of a minimum credit card payment goes toward reducing the actual debt." correct=false
  [805, `            distractorExplanations: { 0: 'Most of the minimum payment covers interest charges, with very little reducing the principal balance.' },`],

  // L817: MC: "$5,000 balance at 20%, minimum $100. How much reduces the debt?" ci=3
  [818, `            distractorExplanations: {\n              0: 'The full $100 does not reduce debt because about $83 goes to interest first.',\n              1: '$75 overstates principal reduction; monthly interest on $5,000 at 20% consumes most of the payment.',\n              2: '$50 is still too high; at 20% APR on $5,000, roughly $83 goes to interest each month.',\n            },`],

  // L830: true-false: "Paying only minimums on a $5,000 credit card balance could take over 25 years to pay off." correct=true
  [831, `            distractorExplanations: { 1: 'Minimum payments barely exceed interest charges, so the balance shrinks extremely slowly over decades.' },`],

  // L843: MC: "If you double your minimum payment, what happens?" ci=1
  [844, `            distractorExplanations: {\n              0: 'Doubling payments cuts payoff time dramatically but not exactly in half due to how interest compounds.',\n              2: 'Higher payments reduce the principal faster, which reduces the interest charged each month.',\n              3: 'Banks do not penalize you for paying more than the minimum; extra payments are always accepted.',\n            },`],

  // L895: scenario: "What should Taylor do?" ci=1 (owes $3,000 at 22%, extra $100)
  [896, `            distractorExplanations: {\n              0: 'Saving at 1% while owing 22% loses money because the interest cost far exceeds savings earnings.',\n              2: 'Stock market returns are uncertain, but 22% credit card interest is a guaranteed cost.',\n              3: 'A vacation fund earns nothing while 22% interest compounds daily on the debt.',\n            },`],

  // L920: true-false: "Delaying debt repayment always costs you more in total interest." correct=true
  [921, `            distractorExplanations: { 1: 'Every day a balance remains, interest compounds on it, so delay always increases total interest paid.' },`],

  // L933: MC: "Why does waiting to pay off debt cost you more?" ci=1
  [934, `            distractorExplanations: {\n              0: 'Banks typically do not increase your rate just because you wait; the existing rate compounds on its own.',\n              2: 'Forgetting the amount does not change what you owe; compounding interest is the real cost of delay.',\n              3: 'Late fees are separate from compound interest; the question is about the cost of delay, not late penalties.',\n            },`],

  // L946: true-false: "It's more urgent to pay off a 22% credit card than a 3% car loan." correct=true
  [947, `            distractorExplanations: { 1: 'Higher interest rates cost more per day, so paying off the 22% card first saves far more money.' },`],

  // L983: MC: "You have $500 to spare. Where should it go first?" ci=1
  [984, `            distractorExplanations: {\n              0: 'A 1% savings return is dwarfed by the 21% cost of credit card debt.',\n              2: 'A 4% car loan costs far less than a 21% credit card; pay the expensive debt first.',\n              3: 'A vacation fund earns no return while high-interest debt accumulates daily.',\n            },`],

  // L1008: scenario: "What's the smartest move for Jordan?" ci=1
  [1009, `            distractorExplanations: {\n              0: 'Keeping savings at 2% while paying 24% interest is a guaranteed net loss of 22% per year.',\n              2: 'Splitting the money reduces the benefit; the full $1,000 toward the card eliminates the 24% cost entirely.',\n              3: 'Stock returns are uncertain and cannot reliably beat a guaranteed 24% interest cost.',\n            },`],

  // L1076: true-false: "A credit card purchase is essentially a short-term loan from the bank." correct=true
  [1077, `            distractorExplanations: { 1: 'The bank pays the merchant on your behalf and you repay the bank, which is the definition of a short-term loan.' },`],

  // L1089: MC: "What is a credit card billing cycle?" ci=1
  [1090, `            distractorExplanations: {\n              0: 'Card delivery time is not related to the billing cycle.',\n              2: 'Card expiration is measured in years and is unrelated to billing cycles.',\n              3: 'The application-to-approval timeline is separate from the billing cycle.',\n            },`],

  // L1116: MC: "What percentage of your credit limit should you ideally stay below?" ci=1
  [1117, `            distractorExplanations: {\n              0: 'Under 10% is excellent but not the standard recommendation; 30% is the commonly cited threshold.',\n              2: '50% utilization is considered high and can negatively impact your credit score.',\n              3: '75% utilization signals heavy reliance on credit and significantly hurts your score.',\n            },`],

  // L1142: true-false: "You should pay the statement balance in full to avoid interest charges." correct=true
  [1143, `            distractorExplanations: { 1: 'Paying the full statement balance by the due date keeps you within the grace period and avoids all interest.' },`],

  // L1156: scenario: "Which amount should Morgan pay?" ci=1 ($800 statement, $1200 current)
  [1157, `            distractorExplanations: {\n              0: 'Paying only the $25 minimum triggers interest on the entire unpaid balance.',\n              2: 'Paying the full $1,200 current balance is unnecessary; the $800 statement balance avoids interest.',\n              3: '$1,000 is an arbitrary amount that does not correspond to any billing threshold.',\n            },`],

  // L1181: true-false: "APR stands for annual percentage rate." correct=true
  [1182, `            distractorExplanations: { 1: 'APR is the universally accepted abbreviation for annual percentage rate in consumer lending.' },`],

  // L1194: MC: "A card has a 24% APR. What's the approximate monthly interest rate?" ci=2
  [1195, `            distractorExplanations: {\n              0: '24% is the annual rate, not the monthly rate.',\n              1: '12% would mean a 144% annual rate, which is far too high.',\n              3: '0.24% is the approximate daily rate, not the monthly rate.',\n            },`],

  // L1207: true-false: "Cash advances on credit cards usually have a higher APR than regular purchases." correct=true
  [1208, `            distractorExplanations: { 1: 'Cash advances carry the highest APR tier and begin accruing interest immediately with no grace period.' },`],

  // L1229: MC: "What triggers the penalty APR on most credit cards?" ci=2
  [1230, `            distractorExplanations: {\n              0: 'Using the card overseas does not trigger a penalty APR, though foreign transaction fees may apply.',\n              1: 'Large purchases do not trigger a penalty rate; only payment delinquency does.',\n              3: 'Reaching your credit limit may trigger an over-limit fee but not a penalty APR.',\n            },`],

  // L1257: scenario: "What should Riley watch out for?" ci=1 (0% APR for 15 months, $4,000 transfer)
  [1258, `            distractorExplanations: {\n              0: 'Intro 0% offers always expire; the promotional period has a fixed end date.',\n              2: 'Making only minimum payments means the balance will still be large when the rate jumps.',\n              3: 'Transferring more debt does not help; the goal is to eliminate the balance before the rate increases.',\n            },`],

  // L1282: true-false: "Credit card rewards are only worth it if you pay your balance in full each month." correct=true
  [1283, `            distractorExplanations: { 1: 'Interest charges on a carried balance far exceed any rewards earned, making the rewards worthless.' },`],

  // L1295: MC: "You earn 2% cash back but carry a balance at 20% APR. What's the net result?" ci=2
  [1296, `            distractorExplanations: {\n              0: 'You do not come out ahead because 20% interest far exceeds the 2% reward.',\n              1: 'You do not break even; the 18% gap between interest and rewards is a significant net loss.',\n              3: 'Rewards do not cancel out interest; they are a tiny fraction of the cost.',\n            },`],

  // L1308: true-false: "A rewards card with a $200 annual fee is only worth it if your rewards exceed $200 per year." correct=true
  [1309, `            distractorExplanations: { 1: 'If rewards do not cover the annual fee, a no-fee card would save you more money overall.' },`],

  // L1330: MC: "Which person benefits most from a rewards credit card?" ci=1
  [1331, `            distractorExplanations: {\n              0: 'Carrying a $3,000 balance means paying hundreds in interest, wiping out any rewards.',\n              2: 'Making only minimum payments means most money goes to interest, not earning rewards.',\n              3: 'Using the card once a year earns almost no rewards, making it pointless.',\n            },`],

  // L1358: scenario: "Is this card worth the fee?" ci=1 ($150 fee, 3% back, $4,000/month)
  [1359, `            distractorExplanations: {\n              0: 'Annual fees can be worth paying when rewards significantly exceed the fee amount.',\n              2: '3% on all purchases is actually an above-average reward rate that generates substantial returns.',\n              3: 'Carrying a balance would add interest that erases the reward benefit; paying in full is what makes it work.',\n            },`],

  // L1383: true-false: "Setting up autopay for your full balance helps prevent missed payments and interest charges." correct=true
  [1384, `            distractorExplanations: { 1: 'Autopay for the full statement balance guarantees on-time payment and zero interest charges.' },`],

  // L1415: MC: "You have a $10,000 credit limit. What balance keeps your utilization in the 'good' range?" ci=1
  [1416, `            distractorExplanations: {\n              0: 'Under $1,000 is excellent utilization but not the threshold for the standard good range.',\n              2: '$5,000 is 50% utilization, which is considered high and can hurt your credit score.',\n              3: '$7,500 is 75% utilization, which significantly damages your credit score.',\n            },`],

  // L1437: MC: "Why should you avoid credit card cash advances?" ci=1
  [1438, `            distractorExplanations: {\n              0: 'Cash advances are real transactions that appear on your statement and affect your balance.',\n              2: 'Cash advances do not permanently lower your credit limit; the amount is added to your balance.',\n              3: 'Cash advances do not require a separate application; they use your existing credit line.',\n            },`],

  // L1450: true-false: "Using a credit card because you can't afford something is a warning sign of financial trouble." correct=true
  [1451, `            distractorExplanations: { 1: 'Relying on credit for things you cannot pay cash for indicates spending beyond your means.' },`],

  // L1464: scenario: "What should Avery do?" ci=1 ($4,200 of $5,000 limit, pays in full)
  [1465, `            distractorExplanations: {\n              0: 'Even though the balance is paid in full, the 84% utilization reported to credit bureaus still hurts the score.',\n              2: 'Opening 5 new cards creates multiple hard inquiries and does not solve the utilization issue responsibly.',\n              3: 'Stopping card use entirely misses the benefits of rewards and credit-building.',\n            },`],

  // L1614: true-false: "A mortgage is generally considered good debt because it builds equity in an appreciating asset." correct=true
  [1615, `            distractorExplanations: { 1: 'Homes typically appreciate over time and each mortgage payment increases your ownership stake.' },`],

  // L1627: MC: "What makes compound interest more costly than simple interest for borrowers?" ci=1
  [1628, `            distractorExplanations: {\n              0: 'Compound interest does not require a higher annual rate to be more expensive than simple interest.',\n              2: 'Less frequent calculation would actually reduce cost; compound interest is costly because it adds interest to the balance.',\n              3: 'Bank fees are separate from interest calculations and do not explain the difference.',\n            },`],

  // L1672: MC: "Which is the most dangerous sign of a debt problem?" ci=2
  [1673, `            distractorExplanations: {\n              0: 'Having one credit card is perfectly normal and not a sign of trouble.',\n              1: 'Paying your balance in full monthly is the healthiest credit card habit.',\n              3: 'Using autopay is a responsible financial practice that prevents missed payments.',\n            },`],

  // L1686: scenario: "What's the best advice for Mia?" ci=1 (20% card, 5% car, $500 savings)
  [1687, `            distractorExplanations: {\n              0: 'Splitting evenly ignores that the 20% card costs four times more in interest than the 5% car loan.',\n              2: 'Saving at low interest while paying 20% on credit card debt is a guaranteed net loss.',\n              3: 'The car loan at 5% is much cheaper than the 20% credit card and should be paid off second.',\n            },`],

  // L1717: scenario: "What should Kai do first?" ci=1 ($30K student at 5%, $4K card at 23%)
  [1718, `            distractorExplanations: {\n              0: 'Splitting equally ignores the massive interest rate difference between 5% and 23%.',\n              2: 'Paying more toward the 5% loan while the 23% card compounds costs far more in total interest.',\n              3: 'Ignoring both debts allows interest to compound unchecked, worsening the situation.',\n            },`],

  // L1730: MC: "Lin wants to buy a $300,000 home with a 30-year mortgage at 6%." ci=1
  [1731, `            distractorExplanations: {\n              0: 'The dollar amount alone does not determine whether debt is good or bad; the asset type matters.',\n              2: 'A 30-year term is standard for mortgages and does not make the debt bad.',\n              3: 'Bank approval does not make debt good; the appreciating asset and equity building do.',\n            },`],

  // L1758: MC: "Pat earns $3,000 per month and owes $2,800 in monthly debt payments." ci=1
  [1759, `            distractorExplanations: {\n              0: 'Spending 93% of income on debt leaves almost nothing for basic living expenses.',\n              2: 'Taking on more debt when already overwhelmed deepens the crisis.',\n              3: 'This extreme debt-to-income ratio is far from normal and signals a financial emergency.',\n            },`],

  // L1786: scenario: "What should Sam do?" ci=1 ($10K on 0% intro, expires 4 months, $8K savings)
  [1787, `            distractorExplanations: {\n              0: 'Intro 0% rates are never extended automatically; the promotional period has a firm end date.',\n              2: 'Minimum payments will leave most of the $10,000 balance subject to 24% interest when the rate jumps.',\n              3: 'Repeatedly transferring balances is unsustainable and new cards may not offer 0% terms.',\n            },`],

  // L1793: true-false: "It's always better to have zero debt than any debt at all." correct=false
  [1794, `            distractorExplanations: { 0: 'Strategic low-interest debt like mortgages or education loans can build wealth and should not be avoided entirely.' },`],

  // L1862: true-false: "Federal student loans generally offer more borrower protections than private loans." correct=true
  [1863, `            distractorExplanations: { 1: 'Federal loans include income-driven repayment, deferment, and forgiveness options that private loans typically lack.' },`],

  // L1875: MC: "Which is a key advantage of federal student loans over private loans?" ci=1
  [1876, `            distractorExplanations: {\n              0: 'Federal loans do charge interest; they just offer more flexible repayment options.',\n              2: 'Federal loans must be repaid unless specifically forgiven through qualifying programs.',\n              3: 'Federal loans have annual and lifetime borrowing limits set by law.',\n            },`],

  // L1911: MC: "Why should students maximize federal loans before taking private loans?" ci=2
  [1912, `            distractorExplanations: {\n              0: 'Federal loans actually have lower borrowing limits than many private lenders.',\n              1: 'Private loans are not illegal for students under 21, though a co-signer may be required.',\n              3: 'Private loans can be used for tuition and other education expenses.',\n            },`],

  // L1924: true-false: "It's generally better to take private loans before federal loans." correct=false
  [1925, `            distractorExplanations: { 0: 'Federal loans should always come first due to lower rates, fixed terms, and borrower protections like forgiveness.' },`],

  // L1958: true-false: "The standard 10-year repayment plan results in less total interest paid than income-driven plans." correct=true
  [1959, `            distractorExplanations: { 1: 'Shorter repayment periods mean less time for interest to accumulate, so the standard plan costs less overall.' },`],

  // L1971: MC: "What is the main benefit of an income-driven repayment plan?" ci=1
  [1972, `            distractorExplanations: {\n              0: 'Income-driven plans do not eliminate interest; they adjust payment amounts to be affordable.',\n              2: 'Income-driven plans usually cost more in total because the repayment period is longer.',\n              3: 'You cannot skip payments; income-driven plans adjust the amount, not the obligation to pay.',\n            },`],

  // L1999: MC: "Which repayment plan results in the most total interest paid?" ci=2
  [2000, `            distractorExplanations: {\n              0: 'The standard 10-year plan has the shortest term and therefore the least total interest.',\n              1: 'Graduated plans are still 10 years, so they cost less than extended 25-year plans.',\n              3: 'An income-driven 10-year plan costs less than a 25-year extended plan due to the shorter term.',\n            },`],

  // L2026: true-false: "Federal student loan borrowers can switch repayment plans for free." correct=true
  [2027, `            distractorExplanations: { 1: 'There is no fee to change federal loan repayment plans, giving borrowers valuable flexibility.' },`],

  // L2040: scenario: "Which plan is best for Jamie?" ci=1 ($28K salary, $350/mo standard)
  [2041, `            distractorExplanations: {\n              0: 'The standard plan saves interest but 15% of gross income on loans is unmanageable on a $28,000 salary.',\n              2: 'An extended 25-year plan adds 15 years of interest and is not the best option when income may rise.',\n              3: 'Stopping payments causes default, credit damage, and potential wage garnishment.',\n            },`],

  // L2066: true-false: "Loan forgiveness programs can cancel your remaining student loan balance after a set number of payments." correct=true
  [2067, `            distractorExplanations: { 1: 'Federal forgiveness programs do cancel remaining balances after qualifying payments are completed.' },`],

  // L2079: MC: "Which type of employer typically qualifies you for public service loan forgiveness?" ci=2
  [2080, `            distractorExplanations: {\n              0: 'Private companies do not qualify for PSLF unless they are 501(c)(3) nonprofits.',\n              1: 'Tech startups are typically for-profit and do not qualify for PSLF.',\n              3: 'Salary level is irrelevant; PSLF eligibility depends on employer type, not pay.',\n            },`],

  // L2092: true-false: "Income-driven repayment plans forgive any remaining balance after 20 to 25 years." correct=true
  [2093, `            distractorExplanations: { 1: 'Income-driven plans are designed to forgive remaining balances after 20 to 25 years of qualifying payments.' },`],

  // L2105: MC: "How many qualifying payments are typically needed for public service loan forgiveness?" ci=1
  [2106, `            distractorExplanations: {\n              0: '60 payments is only 5 years, which is too short for PSLF qualification.',\n              2: '180 payments is 15 years, which is longer than the required 10 years for PSLF.',\n              3: '240 payments is 20 years, which applies to income-driven forgiveness, not PSLF.',\n            },`],

  // L2142: scenario: "Should Casey pursue PSLF?" ci=1 (teacher, public school, $80K loans)
  [2143, `            distractorExplanations: {\n              0: 'Public school teachers work for a government employer and do qualify for PSLF.',\n              2: 'There is no maximum balance limit for PSLF; any federal loan amount can be forgiven.',\n              3: 'Switching to private loans would eliminate PSLF eligibility entirely.',\n            },`],

  // L2167: true-false: "Refinancing student loans can lower your interest rate." correct=true
  [2168, `            distractorExplanations: { 1: 'Refinancing replaces your current loan with a new one at a potentially lower rate if your creditworthiness has improved.' },`],

  // L2180: MC: "What is the biggest risk of refinancing federal loans with a private lender?" ci=1
  [2181, `            distractorExplanations: {\n              0: 'Refinancing typically locks in a lower rate, so the rate going up is unlikely with a fixed-rate refinance.',\n              2: 'You do not have to pay the full balance immediately; refinancing creates a new repayment schedule.',\n              3: 'Refinancing causes a temporary credit inquiry but does not permanently damage your score.',\n            },`],

  // L2208: MC: "What do lenders check most when you apply to refinance?" ci=1
  [2209, `            distractorExplanations: {\n              0: 'High school GPA is irrelevant to refinance applications.',\n              2: 'The university attended may be a minor factor but is far less important than credit score and income.',\n              3: 'How much you have already paid matters less than your current ability to repay the new loan.',\n            },`],

  // L2231: true-false: "Checking refinance rates with multiple lenders within 2 weeks counts as a single credit inquiry." correct=true
  [2232, `            distractorExplanations: { 1: 'Credit bureaus group rate-shopping inquiries within a short window into one inquiry to encourage comparison shopping.' },`],

  // L2245: scenario: "Should Morgan refinance?" ci=0 ($40K federal at 6.5%, offers 4.2%)
  [2246, `            distractorExplanations: {\n              1: 'Blanket rules against refinancing federal loans ignore situations where protections are unnecessary.',\n              2: 'Refinancing only half the balance reduces savings; the full balance benefits from the lower rate.',\n              3: 'A 2.3% rate reduction on $40,000 saves thousands in interest over the life of the loan.',\n            },`],
];

// Apply insertions from bottom to top so line numbers don't shift
insertions.sort((a, b) => b[0] - a[0]);

for (const [afterLine, text] of insertions) {
  lines.splice(afterLine, 0, text);
}

fs.writeFileSync(filePath, lines.join('\n'));
console.log(`Updated section-6-debt-part1.ts: inserted ${insertions.length} distractorExplanations`);
