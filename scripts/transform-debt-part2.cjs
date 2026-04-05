const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'course', 'professions', 'personal-finance', 'units', 'section-6-debt-part2.ts');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const insertions = [
  // L42: TF: "A lower monthly car payment always means a better deal." correct=false
  [42, `            distractorExplanations: { 0: 'Lower monthly payments often come from longer loan terms, which cost more in total interest.' },`],

  // L55: MC: "How do dealers lower your monthly payment without giving you a real discount?" ci=1
  [55, `            distractorExplanations: {\n              0: 'Reducing the car\\'s price would be a genuine discount, not a dealer trick.',\n              2: 'Lowering the rate to 0% is rare and would be a real benefit, not a deceptive tactic.',\n              3: 'Dealers do not waive all fees and taxes; those are typically non-negotiable costs.',\n            },`],

  // L68: TF: "Dealers may shift numbers between trade-in value and purchase price to confuse buyers." correct=true
  [68, `            distractorExplanations: { 1: 'Dealers commonly use the four-square technique to shift numbers between categories and obscure the real deal.' },`],

  // L90: MC: "What should you always ask for instead of focusing on the monthly payment?" ci=1
  [90, `            distractorExplanations: {\n              0: 'Employee discounts are not available to regular customers.',\n              2: 'MSRP is the starting point, not the final cost; it excludes taxes, fees, and dealer markups.',\n              3: 'Color options have nothing to do with the financial terms of the deal.',\n            },`],

  // L119: scenario: "What should Reese do?" ci=1
  [119, `            distractorExplanations: {\n              0: 'Affordability of the monthly payment does not justify paying $5,400 above the car\\'s fair market value.',\n              2: 'A longer term would lower payments further but increase total cost even more.',\n              3: 'Buying now and hoping to refinance later does not fix the inflated purchase price.',\n            },`],

  // L143: TF: "A shorter car loan results in less total interest paid." correct=true
  [143, `            distractorExplanations: { 1: 'Fewer years of payments means less time for interest to accumulate, even though monthly payments are higher.' },`],

  // L156: MC: "$25,000 car at 6%, 4yr=$3,150, 7yr=$5,600. How much saved?" ci=2
  [156, `            distractorExplanations: {\n              0: '$1,000 is too low; the difference is $5,600 minus $3,150 which equals $2,450.',\n              1: '$1,750 understates the savings; the actual math shows $2,450.',\n              3: '$3,200 overstates the savings; the correct calculation is $2,450.',\n            },`],

  // L192: MC: "Why are car loans over 60 months generally risky?" ci=1
  [192, `            distractorExplanations: {\n              0: 'Banks do offer loans longer than 60 months; the issue is not availability but risk.',\n              2: 'Cars do not stop running after 5 years; they depreciate in value while the loan remains.',\n              3: 'Insurance companies cover cars regardless of loan length.',\n            },`],

  // L205: TF: "Being underwater on a car loan means you owe more than the car is currently worth." correct=true
  [205, `            distractorExplanations: { 1: 'Owing more than the car\\'s value is the precise definition of being underwater or in negative equity.' },`],

  // L219: scenario: "Which loan is the better deal for Alex?" ci=2
  [219, `            distractorExplanations: {\n              0: 'No money upfront means borrowing more at a higher rate for longer, costing thousands extra.',\n              1: 'The total costs are very different; Option A saves thousands due to lower principal, rate, and shorter term.',\n              3: 'A lower monthly payment with Option B hides the much higher total cost over 7 years.',\n            },`],

  // L244: TF: "A new car typically loses about 20% of its value in the first year." correct=true
  [244, `            distractorExplanations: { 1: 'Depreciation data consistently shows new cars lose approximately 20% of their value in year one.' },`],

  // L257: MC: "$30,000 car loses 50% over 5 years. Worth at year 5?" ci=2
  [257, `            distractorExplanations: {\n              0: '$20,000 would represent only a 33% loss, not the stated 50%.',\n              1: '$18,000 represents a 40% loss, not the stated 50%.',\n              3: '$10,000 would represent a 67% loss, more than the stated 50%.',\n            },`],

  // L270: TF: "Buying a 2-year-old car lets someone else absorb the biggest depreciation loss." correct=true
  [270, `            distractorExplanations: { 1: 'The steepest depreciation happens in years one and two, so a used-car buyer avoids that value drop.' },`],

  // L292: MC: "Which buying strategy saves the most money over 10 years?" ci=1
  [292, `            distractorExplanations: {\n              0: 'Buying new every 3 years maximizes depreciation losses and is the most expensive strategy.',\n              2: 'Leasing means paying for depreciation with no ownership; it is the costliest long-term option.',\n              3: 'Trading in every year maximizes depreciation loss and transaction costs.',\n            },`],

  // L331: scenario: "What should Sam do?" ci=1 (new $28K vs CPO $19K)
  [331, `            distractorExplanations: {\n              0: 'A car that has never been driven does not justify $9,000 more when the CPO has a warranty.',\n              2: 'Waiting for a deal on a new car still costs more than the CPO option available now.',\n              3: 'The cheapest car may not be reliable; the CPO balances cost savings with warranty protection.',\n            },`],

  // L356: TF: "The total cost of owning a car is much higher than the purchase price alone." correct=true
  [356, `            distractorExplanations: { 1: 'Insurance, fuel, maintenance, and depreciation add thousands per year beyond the car payment.' },`],

  // L369: MC: "Which is typically the largest hidden cost of car ownership?" ci=1
  [369, `            distractorExplanations: {\n              0: 'Car washes are a trivial expense compared to depreciation.',\n              2: 'Air fresheners cost a few dollars and are negligible.',\n              3: 'Parking meters are a minor occasional expense, not a major ownership cost.',\n            },`],

  // L397: MC: "You can afford a $400 monthly car payment. What should you budget?" ci=2
  [397, `            distractorExplanations: {\n              0: 'The payment alone does not cover insurance, fuel, or maintenance.',\n              1: '$500 to $600 accounts for insurance but ignores fuel and maintenance costs.',\n              3: '$400 plus $50 for gas ignores insurance and maintenance, which are significant costs.',\n            },`],

  // L440: scenario: "Which car is really cheaper?" ci=1 (Car A $22K vs Car B $18K)
  [440, `            distractorExplanations: {\n              0: 'The lower purchase price is offset by $1,200 more per year in insurance and $700 more in fuel.',\n              2: 'The running costs differ significantly; Car A saves about $1,900 per year in insurance and fuel.',\n              3: 'The $4,000 upfront savings is erased within 3 years by Car B\\'s higher insurance and fuel costs.',\n            },`],

  // L591: TF: "With a mortgage, the home serves as collateral for the loan." correct=true
  [591, `            distractorExplanations: { 1: 'The home is legally pledged as collateral, and the lender can foreclose if payments are not made.' },`],

  // L604: MC: "What are the two most common mortgage lengths?" ci=2
  [604, `            distractorExplanations: {\n              0: '5 and 10 year terms exist but are not the most common mortgage lengths.',\n              1: '10 and 20 year terms are available but far less popular than 15 and 30 year options.',\n              3: '20 and 40 year terms are uncommon; 15 and 30 years are the industry standard.',\n            },`],

  // L640: MC: "What happens if you stop making mortgage payments?" ci=2
  [640, `            distractorExplanations: {\n              0: 'Mortgages are not optional; failing to pay has severe legal consequences.',\n              1: 'A small late fee is only the beginning; continued non-payment leads to foreclosure.',\n              3: 'Missing payments severely damages your credit score rather than improving it.',\n            },`],

  // L654: TF: "A larger down payment results in a smaller mortgage loan." correct=true
  [654, `            distractorExplanations: { 1: 'More money paid upfront directly reduces the loan amount and the total interest paid over time.' },`],

  // L668: scenario: "How much will Kim need to borrow?" ci=2 ($250K home, 20% down)
  [668, `            distractorExplanations: {\n              0: '$250,000 ignores the 20% down payment that reduces the loan amount.',\n              1: '$225,000 assumes only a 10% down payment instead of the stated 20%.',\n              3: '$175,000 would require a 30% down payment, more than the stated 20%.',\n            },`],

  // L692: TF: "A fixed-rate mortgage keeps the same interest rate for the life of the loan." correct=true
  [692, `            distractorExplanations: { 1: 'Fixed-rate mortgages lock in the rate at origination, providing payment stability for the entire term.' },`],

  // L705: MC: "Why do most homebuyers choose a fixed-rate mortgage?" ci=1
  [705, `            distractorExplanations: {\n              0: 'Fixed-rate mortgages do not always have the lowest rate; ARMs often start lower.',\n              2: 'Banks offer multiple mortgage types including ARMs and government-backed loans.',\n              3: 'Fixed-rate mortgages still require a down payment.',\n            },`],

  // L741: MC: "When might an adjustable-rate mortgage make sense?" ci=1
  [741, `            distractorExplanations: {\n              0: 'Living in the home for 30 years means facing decades of potential rate increases with an ARM.',\n              2: 'Nobody wants the highest possible rate; ARMs offer lower initial rates.',\n              3: 'Bad credit does not make ARMs a better choice; it typically means higher rates regardless of type.',\n            },`],

  // L755: TF: "Government-backed mortgages can offer lower down payment requirements." correct=true
  [755, `            distractorExplanations: { 1: 'Government programs like FHA and VA loans are specifically designed to reduce down payment barriers.' },`],

  // L789: TF: "Your credit score affects the interest rate you receive on a mortgage." correct=true
  [789, `            distractorExplanations: { 1: 'Higher credit scores qualify for lower rates, and a 1% difference on a mortgage can cost tens of thousands over time.' },`],

  // L802: MC: "Which credit score range typically gets the best mortgage rates?" ci=3
  [802, `            distractorExplanations: {\n              0: '500 to 600 is considered poor credit and may not even qualify for a mortgage.',\n              1: '600 to 700 is fair to good but does not get the best available rates.',\n              2: '700 to 750 is good but not the top tier; 750 and above gets the lowest rates.',\n            },`],

  // L828: MC: "DTI calc: $6,000 income, $1,500 existing debt. Max new mortgage payment?" ci=1
  [829, `            distractorExplanations: {\n              0: '$1,000 is too conservative; 43% of $6,000 minus $1,500 leaves about $1,080.',\n              2: '$2,500 would put total debt at $4,000, or 67% DTI, which far exceeds the 43% limit.',\n              3: '$4,000 in mortgage alone would be 67% of income, which no lender would approve.',\n            },`],

  // L856: TF: "PMI is required when your down payment is less than 20%." correct=true
  [856, `            distractorExplanations: { 1: 'PMI is standard when equity is below 20% and protects the lender against borrower default.' },`],

  // L870: scenario: "Will Jordan get a good mortgage rate?" ci=2
  [870, `            distractorExplanations: {\n              0: 'The price being $300,000 does not determine rate eligibility; income, credit, and DTI do.',\n              1: 'Mortgage rates are based on objective criteria like credit score and DTI, not the lender\\'s mood.',\n              3: '$7,000 per month is sufficient to support a $300,000 mortgage within healthy DTI limits.',\n            },`],

  // L894: TF: "In the early years of a mortgage, most of your payment goes toward interest." correct=true
  [894, `            distractorExplanations: { 1: 'Amortization schedules are front-loaded with interest, and principal reduction accelerates over time.' },`],

  // L907: MC: "$200K mortgage at 6%, first payment $1,199. How much reduces the balance?" ci=2
  [907, `            distractorExplanations: {\n              0: '$599 assumes an even split, but early payments are heavily weighted toward interest.',\n              1: '$400 overstates the principal portion; monthly interest on $200,000 at 6% is about $1,000.',\n              3: '$1,000 is approximately the interest portion, not the principal reduction.',\n            },`],

  // L948: MC: "Why does making extra payments early in a mortgage save so much money?" ci=1
  [948, `            distractorExplanations: {\n              0: 'Banks do not give discounts for early payments; the savings come from reduced interest.',\n              2: 'The interest rate does not change when you pay early; the principal reduction stops future interest on that amount.',\n              3: 'Banks do not extend your loan term as a reward; extra payments shorten the loan.',\n            },`],

  // L962: TF: "On a 30-year mortgage, total interest paid can exceed the original loan amount." correct=true
  [962, `            distractorExplanations: { 1: 'At moderate to high rates over 30 years, total interest can indeed exceed the principal borrowed.' },`],

  // L987: scenario: "How much will Pat save by choosing a 15-year mortgage?" ci=2
  [987, `            distractorExplanations: {\n              0: '$50,000 significantly understates the savings; the difference is $231,000 minus $104,000.',\n              1: '$95,000 is closer but still below the actual $127,000 difference.',\n              3: 'The two options cost very different amounts in total interest; they are not the same.',\n            },`],

  // L1055: TF: "The snowball method pays off the smallest balance first." correct=true
  [1055, `            distractorExplanations: { 1: 'The snowball method specifically targets the smallest balance to create quick wins and build motivation.' },`],

  // L1068: MC: "Why does the snowball method start with the smallest debt?" ci=1
  [1068, `            distractorExplanations: {\n              0: 'Small debts do not necessarily have the highest rates; the snowball method ignores rates.',\n              2: 'Banks do not require any particular payoff order; this is a personal strategy choice.',\n              3: 'Small debts are not inherently more dangerous; the method is about psychological motivation.',\n            },`],

  // L1081: TF: "In the snowball method, when one debt is paid off, its payment is added to the next debt's payment." correct=true
  [1081, `            distractorExplanations: { 1: 'Rolling payments forward is the core mechanism of the snowball method that accelerates each subsequent payoff.' },`],

  // L1108: MC: "Alex has 3 debts. Using snowball, which gets extra payments first?" ci=2
  [1108, `            distractorExplanations: {\n              0: 'The $8,000 car note is the largest balance and would be targeted last in the snowball method.',\n              1: 'The $2,000 loan is the middle balance; snowball targets the smallest first.',\n              3: 'Splitting evenly defeats the purpose of the snowball method, which focuses all extra on one debt.',\n            },`],

  // L1136: scenario: "Is the snowball method working for Jamie?" ci=1
  [1136, `            distractorExplanations: {\n              0: 'Paying off 2 of 5 debts in 6 months is strong progress for the snowball method.',\n              2: 'The method is clearly working since Jamie feels motivated and is making progress.',\n              3: 'Jamie\\'s success comes from a structured method, not luck.',\n            },`],

  // L1160: TF: "The avalanche method pays off the highest interest rate debt first." correct=true
  [1160, `            distractorExplanations: { 1: 'The avalanche method prioritizes the highest interest rate to minimize total interest paid.' },`],

  // L1173: MC: "Why does the avalanche method save more money than the snowball method?" ci=1
  [1173, `            distractorExplanations: {\n              0: 'There is no special bank program; the savings come from the mathematical order of payoff.',\n              2: 'Avalanche does not require higher payments; it simply directs extra payments to the highest rate.',\n              3: 'Avalanche does not pay all debts simultaneously; it focuses extra payments on one debt at a time.',\n            },`],

  // L1187: TF: "The avalanche method can be harder to stick with because the first payoff may take longer." correct=true
  [1187, `            distractorExplanations: { 1: 'If the highest-rate debt has a large balance, it takes time to eliminate, which can reduce motivation.' },`],

  // L1209: MC: "Riley's debts: $8K at 24%, $2K at 10%, $500 at 15%. Avalanche targets?" ci=2
  [1209, `            distractorExplanations: {\n              0: 'The $500 at 15% has a lower rate than the $8,000 at 24% and would not be the avalanche priority.',\n              1: 'The $2,000 at 10% has the lowest rate and would be targeted last by avalanche.',\n              3: 'Splitting evenly defeats the purpose of the avalanche method, which focuses on the highest rate.',\n            },`],

  // L1237: scenario: "Which method should Morgan choose?" ci=1
  [1237, `            distractorExplanations: {\n              0: 'Avalanche saves the most only when rate differences are large; with similar rates the savings are small.',\n              2: 'Paying minimums and saving the rest allows expensive debt to compound unnecessarily.',\n              3: 'Ignoring debts allows interest to compound and the situation to worsen.',\n            },`],

  // L1261: TF: "Both snowball and avalanche methods will eventually pay off all debts completely." correct=true
  [1261, `            distractorExplanations: { 1: 'Both methods systematically eliminate all debts; they only differ in the order of payoff and total interest cost.' },`],

  // L1275: scenario: "How much more does snowball cost here?" ci=2
  [1275, `            distractorExplanations: {\n              0: '$200 understates the difference; the scenario states avalanche saves $800.',\n              1: '$500 is less than the stated $800 savings from avalanche.',\n              3: 'They do not cost the same because the different payoff orders result in different total interest.',\n            },`],

  // L1294: MC: "When does the avalanche method save the most compared to snowball?" ci=1
  [1294, `            distractorExplanations: {\n              0: 'When all debts have the same rate, the payoff order does not matter and savings are zero.',\n              2: 'With only one debt there is no ordering decision, so neither method has an advantage.',\n              3: 'When the smallest debt has the highest rate, both methods agree on the same first target.',\n            },`],

  // L1316: MC: "What if your smallest balance also has the highest rate?" ci=2
  [1316, `            distractorExplanations: {\n              0: 'When the smallest balance has the highest rate, both methods produce the same result.',\n              1: 'Both methods work in this situation and both would pay this debt first.',\n              3: 'Ignoring any debt allows interest to compound and should never be the strategy.',\n            },`],

  // L1329: TF: "You can combine the snowball and avalanche methods into a hybrid approach." correct=true
  [1329, `            distractorExplanations: { 1: 'Many people successfully start with a snowball quick win and then switch to avalanche for the remaining debts.' },`],

  // L1354: scenario: "What strategy should Pat use?" ci=1
  [1354, `            distractorExplanations: {\n              0: 'Straight avalanche skips the easy $300 win that would boost Pat\\'s motivation.',\n              2: 'Straight snowball ignores that the $1,500 at 24% is more expensive than the $4,000 at 19%.',\n              3: 'Paying minimums and saving extra cash allows high-interest debt to compound unnecessarily.',\n            },`],

  // L1378: TF: "Debt consolidation combines multiple debts into a single loan with one monthly payment." correct=true
  [1378, `            distractorExplanations: { 1: 'Consolidation merges multiple debts into one new loan, simplifying payments and potentially lowering the rate.' },`],

  // L1391: MC: "When does debt consolidation save you money?" ci=1
  [1391, `            distractorExplanations: {\n              0: 'Consolidating at a higher rate than your current debts would actually cost you more.',\n              2: 'There is no minimum debt amount required for consolidation to make sense.',\n              3: 'A bank suggesting consolidation does not automatically mean it saves you money.',\n            },`],

  // L1405: TF: "Balance transfer cards offer 0% interest permanently." correct=false
  [1405, `            distractorExplanations: { 0: 'The 0% rate is always promotional and expires after 12 to 18 months, after which normal rates apply.' },`],

  // L1427: MC: "What is the biggest risk after consolidating credit card debt?" ci=1
  [1427, `            distractorExplanations: {\n              0: 'Consolidation may cause a temporary dip but does not permanently damage your credit score.',\n              2: 'A personal consolidation loan is reported as a personal loan, not a mortgage.',\n              3: 'You can still get loans after consolidation; it does not permanently disqualify you.',\n            },`],

  // L1455: scenario: "Is this consolidation a good idea?" ci=1 (Chen: $12K at 22% avg -> 10%)
  [1455, `            distractorExplanations: {\n              0: 'There is no threshold where consolidation becomes unavailable; $12,000 is a reasonable amount.',\n              2: 'Personal loans at 10% are significantly cheaper than credit cards at 22%.',\n              3: 'Maxing out the credit cards again would double the debt and defeat the purpose of consolidating.',\n            },`],

  // L1606: TF: "DTI ratio is calculated by dividing monthly debt payments by gross monthly income." correct=true
  [1606, `            distractorExplanations: { 1: 'The DTI formula is monthly debt payments divided by gross monthly income, expressed as a percentage.' },`],

  // L1619: MC: "You earn $5,000/mo, pay $1,500 in debt. What is your DTI?" ci=2
  [1619, `            distractorExplanations: {\n              0: '15% would mean only $750 in debt payments on $5,000 income.',\n              1: '25% would mean $1,250 in debt payments, not $1,500.',\n              3: '35% would mean $1,750 in debt payments, more than the stated $1,500.',\n            },`],

  // L1632: TF: "A DTI ratio over 43% makes it very difficult to get approved for new loans." correct=true
  [1632, `            distractorExplanations: { 1: 'Most lenders use 43% as the maximum acceptable DTI threshold for loan approval.' },`],

  // L1689: scenario: "What is Morgan's DTI after paying off the car loan?" ci=2
  [1689, `            distractorExplanations: {\n              0: '30% was the DTI before paying off the car loan; removing $400 changes the calculation.',\n              1: '27% does not match the math: ($1,200 + $200) / $6,000 = 23.3%.',\n              3: '20% would require even lower debt payments than $1,400 on $6,000 income.',\n            },`],

  // L1713: TF: "Lenders check your DTI to see if you can handle additional debt payments." correct=true
  [1713, `            distractorExplanations: { 1: 'DTI directly measures how much income is already committed to debt, indicating capacity for more.' },`],

  // L1726: MC: "Which borrower is most likely to be approved for a mortgage?" ci=1
  [1726, `            distractorExplanations: {\n              0: 'A 50% DTI is far above the 43% threshold, making approval very unlikely despite a good credit score.',\n              2: 'A 60% DTI is dangerously high and would be rejected regardless of an excellent credit score.',\n              3: 'A 45% DTI exceeds the standard maximum of 43%, making approval difficult.',\n            },`],

  // L1754: MC: "You earn $8,000/mo. Max housing costs using the 28% rule?" ci=2
  [1754, `            distractorExplanations: {\n              0: '$1,600 is only 20% of $8,000, below the 28% guideline.',\n              1: '$2,000 is 25% of $8,000, below the 28% guideline.',\n              3: '$2,800 is 35% of $8,000, which exceeds the 28% front-end guideline.',\n            },`],

  // L1780: TF: "A lower DTI can help you get a lower interest rate on a loan." correct=true
  [1780, `            distractorExplanations: { 1: 'Lenders reward lower-risk borrowers with better rates, and lower DTI signals less financial strain.' },`],

  // L1794: scenario: "What should Alex do before applying for a mortgage?" ci=1
  [1794, `            distractorExplanations: {\n              0: 'Applying at 45% DTI is very likely to result in rejection or unfavorable terms.',\n              2: 'Taking on more debt increases DTI and makes approval less likely, not more.',\n              3: 'Quitting a job eliminates income, making mortgage approval impossible.',\n            },`],

  // L1819: TF: "Bankruptcy can legally eliminate debts you can't pay." correct=true
  [1819, `            distractorExplanations: { 1: 'Bankruptcy laws provide a legal mechanism to discharge or restructure debts that are truly unmanageable.' },`],

  // L1832: MC: "How long does bankruptcy stay on your credit report?" ci=2
  [1832, `            distractorExplanations: {\n              0: '1 to 2 years is far too short; bankruptcy has long-lasting credit consequences.',\n              1: '3 to 5 years understates the duration; it remains on record longer.',\n              3: 'Bankruptcy does not stay on your credit report forever; it is removed after 7 to 10 years.',\n            },`],

  // L1861: MC: "Which debts typically cannot be eliminated through bankruptcy?" ci=2
  [1861, `            distractorExplanations: {\n              0: 'Credit card debt can generally be discharged through bankruptcy.',\n              1: 'Medical bills are typically dischargeable in bankruptcy.',\n              3: 'Personal loans can generally be eliminated through bankruptcy.',\n            },`],

  // L1903: scenario: "Is bankruptcy the right choice for Lee?" ci=1
  [1903, `            distractorExplanations: {\n              0: 'Lee has already tried negotiating and credit counseling; continuing the same approach is not productive.',\n              2: 'Bankruptcy exists as a legal option precisely for situations like this where debt is unmanageable.',\n              3: 'Student loan forgiveness is a separate program unrelated to medical debt bankruptcy.',\n            },`],

  // L1970: TF: "A mortgage is generally considered good debt because homes typically appreciate in value." correct=true
  [1970, `            distractorExplanations: { 1: 'Homes tend to appreciate over time, and mortgage payments build equity, making it a wealth-building form of debt.' },`],

  // L1983: MC: "Key difference between snowball and avalanche?" ci=2
  [1983, `            distractorExplanations: {\n              0: 'Snowball typically costs more in interest because it ignores rates.',\n              1: 'Avalanche targets the highest rate, not the smallest balance.',\n              3: 'They are different methods with different ordering criteria and different total costs.',\n            },`],

  // L2028: MC: "Which is the most expensive way to borrow money?" ci=1
  [2028, `            distractorExplanations: {\n              0: 'A mortgage at 6% is one of the least expensive borrowing options.',\n              2: 'A student loan at 5% is a relatively low-cost borrowing option.',\n              3: 'A car loan at 4% is a relatively affordable borrowing option.',\n            },`],

  // L2072: scenario: "What should Kim do first?" ci=1
  [2072, `            distractorExplanations: {\n              0: 'The mortgage at 4% is the cheapest debt and should be a low priority for extra payments.',\n              2: 'Extra payments on student loans at 5% would not save as much as eliminating the 24% card.',\n              3: 'Splitting equally ignores the massive rate difference, costing more in total interest.',\n            },`],

  // L2085: MC: "Jordan wants to buy a $350K home. Income $6K/mo. DTI 35%. What needs to change?" ci=1
  [2085, `            distractorExplanations: {\n              0: 'At 35% DTI before adding a mortgage, Jordan cannot handle the additional housing payment.',\n              2: 'A longer mortgage does not change DTI; it is calculated from monthly payments, which are still added.',\n              3: 'Reducing income would worsen the ability to pay and is counterproductive.',\n            },`],

  // L2114: scenario: "Should Pat take this deal?" ci=1 (1yr old $18K at 5% vs new $26K at 3%)
  [2114, `            distractorExplanations: {\n              0: 'The lower rate on the new car does not offset the $8,000 higher purchase price.',\n              2: 'A 1-year-old car is nearly as reliable as new and does not justify $8,000 more.',\n              3: 'Walking is impractical as a car replacement and does not address the financial comparison.',\n            },`],

  // L2136: MC: "Single most important habit for staying out of debt trouble?" ci=1
  [2136, `            distractorExplanations: {\n              0: 'Credit cards are useful tools when used responsibly; avoiding them entirely is not necessary.',\n              2: 'A high credit score helps with borrowing terms but does not prevent overspending.',\n              3: 'Owning a home is a financial goal, not a habit that prevents debt trouble.',\n            },`],

  // L2143: TF: "Strategic use of low-interest debt can help build long-term wealth." correct=true
  [2143, `            distractorExplanations: { 1: 'Mortgages, education loans, and business loans can create value exceeding their cost when used wisely.' },`],
];

// Apply insertions from bottom to top
insertions.sort((a, b) => b[0] - a[0]);

for (const [afterLine, text] of insertions) {
  lines.splice(afterLine, 0, text);
}

fs.writeFileSync(filePath, lines.join('\n'));
console.log(`Updated section-6-debt-part2.ts: inserted ${insertions.length} distractorExplanations`);
