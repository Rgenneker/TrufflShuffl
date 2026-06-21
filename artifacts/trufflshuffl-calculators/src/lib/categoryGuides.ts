export interface GuideSection {
  heading: string;
  paragraphs: string[];
}

export interface GuideFAQ {
  q: string;
  a: string;
}

export interface CategoryGuide {
  category: string;
  title: string;
  intro: string[];
  sections: GuideSection[];
  faqs: GuideFAQ[];
}

export const CATEGORY_GUIDES: CategoryGuide[] = [
  {
    category: "Financial",
    title: "How to Use Financial Calculators to Make Smarter Money Decisions",
    intro: [
      "Most people only realise how much a loan actually costs them after they've already signed. The monthly repayment looks manageable on paper, but the total interest paid over five or ten years can be shocking. Financial calculators exist to close that gap, to let you see the full picture before you commit, and to show you exactly what changes when you adjust the term, the rate, or the amount.",
      "TrufflShuffl's suite of financial tools covers the core decisions most South Africans face: taking out a loan, buying a home, growing savings through investment, pricing a bond instrument, and understanding the month-by-month structure of any repayment plan. Each calculator is designed to give you the numbers in plain language, without requiring a finance degree to interpret them.",
    ],
    sections: [
      {
        heading: "Understanding Your Loan Before You Sign",
        paragraphs: [
          "The Loan Calculator answers one central question: if I borrow this amount at this interest rate over this many months, what do I pay each month, and what do I pay in total? The monthly payment is calculated using the standard PMT formula, which takes your principal, your monthly interest rate, and your number of payments into account simultaneously. It's not a simple division of the loan amount by the number of months; interest front-loads the early payments, so you pay proportionally more interest at the start of a loan and more principal toward the end.",
          "Where the Loan Calculator becomes genuinely useful is the extra payment field. If you can contribute even R500 more per month than the minimum repayment, the calculator shows you how many months you shave off the loan and how much interest you save. On a R200,000 personal loan at 18% over 60 months, for example, a R500 monthly overpayment can save you tens of thousands of rands over the loan's life and cut the term by over a year. That's information worth having before you decide how aggressively to repay.",
          "When comparing loan offers, run each one through the calculator separately. A lower interest rate with a longer term can cost more in total than a higher rate with a shorter term. The numbers don't lie, the calculator makes the comparison objective.",
        ],
      },
      {
        heading: "Bond Repayments: What Buying a Home Actually Costs",
        paragraphs: [
          "In South Africa, a home loan is called a bond, and the Mortgage Calculator is built with that context in mind. It calculates your monthly bond repayment based on the purchase price, your deposit, the interest rate (typically prime-linked), and the loan term (usually 20 years). But it goes further than most calculators by factoring in the costs that catch first-time buyers off guard: transfer duty, conveyancing attorney fees, and the loan-to-value ratio.",
          "Transfer duty is a government tax on property purchases above R1.1 million. On a R2.5 million property, for instance, that tax alone can exceed R100,000, a significant chunk of capital that doesn't go toward the property's value. The calculator quantifies this so you can budget realistically, not just for the bond repayment but for the total cash you need to close the deal.",
          "The LTV ratio matters too. Banks in South Africa rarely lend 100% of a property's value without some form of mortgage insurance or a higher interest rate. A 90% bond on a R1.5 million property means R150,000 out of pocket before you even move in. Use the mortgage calculator to work out how different deposit amounts affect both your monthly repayment and your total interest paid, sometimes an extra R50,000 deposit saves you several times that amount in interest over 20 years.",
        ],
      },
      {
        heading: "How Compound Interest Works in Your Favour",
        paragraphs: [
          "The Investment Calculator demonstrates something that takes most people years to truly internalise: compound interest is exponential, not linear. When your returns are reinvested, you earn interest on your interest, and the longer the period, the more dramatic the effect becomes.",
          "The calculator lets you toggle between six investment types (fixed deposit, unit trusts, tax-free savings accounts, and others), set the compounding frequency (monthly, quarterly, or annually), and add regular contributions. The difference between compounding monthly versus annually on the same principal and rate might surprise you, more frequent compounding means slightly more growth over time, because you're earning interest on a growing base at shorter intervals.",
          "Use the investment calculator to answer practical questions: how long will it take R50,000 to grow to R200,000 at 9% annual return with R2,000 monthly contributions? The calculator gives you that answer instantly, along with a growth projection you can use to plan milestones. If you're saving for a specific target, a deposit, a car, school fees, work backward: enter the target, the rate, and the time frame, then see what monthly contribution you need.",
        ],
      },
      {
        heading: "Bond Instruments: Pricing and Yield to Maturity",
        paragraphs: [
          "The Bond Calculator (not to be confused with a home loan) prices fixed-income instruments, the kind of bonds issued by governments and corporations that pay a regular coupon. Understanding bond pricing is useful for investors who hold RSA Retail Bonds, corporate notes, or who want to understand how interest rate changes affect the market value of a fixed-income investment.",
          "Bond prices move inversely to interest rates. When rates rise, existing bonds paying a lower coupon become worth less in the secondary market, because new bonds now offer better returns. The calculator quantifies this by computing the present value of all future cash flows, coupons plus the face value at maturity, discounted at the current market rate. Enter the face value, coupon rate, years to maturity, and market interest rate, and the calculator tells you what the bond is worth today.",
          "Yield to maturity (YTM) is the annualised return you'd earn if you bought the bond at its current price and held it to maturity. It accounts for both coupon payments and the difference between purchase price and face value. Duration, also shown, measures the bond's sensitivity to interest rate changes. A higher duration means the price moves more when rates shift, which matters if you might need to sell before maturity.",
        ],
      },
      {
        heading: "Reading an Amortization Schedule",
        paragraphs: [
          "An amortization schedule is the full month-by-month breakdown of a loan, every payment, split into how much goes to interest and how much reduces the principal. Most people never see this; they just pay the monthly installment and assume the math works out. Looking at the schedule for the first time can be eye-opening.",
          "In the early months of a 20-year home loan, the vast majority of each payment is interest. On a R1.5 million bond at 11.75%, your first payment might be around R15,700, of which R14,700 is interest and only R1,000 reduces what you owe. Twelve months later, you've paid nearly R190,000 and your balance has barely moved. The schedule makes this visible and motivates extra payments.",
          "The Amortization Calculator also shows the impact of overpayments in specific months. If you make a lump-sum payment, a tax refund, a bonus, an inheritance, the calculator re-projects the remaining schedule and shows you the new payoff date and total interest saved. You can experiment with different lump-sum amounts to find the point where the impact is most meaningful for your financial situation.",
          "If you're comparing a 15-year versus a 20-year bond term, run both through the amortization calculator. The 15-year option has a higher monthly payment, but the total interest paid over the life of the loan is substantially lower. For many homeowners, the difference in total interest between a 15-year and 20-year bond on the same amount is equivalent to buying another car.",
        ],
      },
      {
        heading: "Using All Five Tools Together",
        paragraphs: [
          "Financial decisions rarely happen in isolation. Before buying a property, you'd typically use the Mortgage Calculator to check affordability, the Amortization Schedule to understand the repayment structure, and the Investment Calculator to evaluate whether renting and investing the difference might outperform buying over the same period. These are legitimate comparisons, and having the tools side by side makes them accessible without a financial advisor for every question.",
          "For business owners and professionals, the Loan Calculator and ROI Calculator (in the Business section) work well together: if you're borrowing to fund equipment or expansion, you can calculate both the repayment cost and the projected return, then see whether the net gain justifies the debt.",
          "None of these tools replace personalised financial advice for major decisions, but they give you a solid foundation, the kind of numerical grounding that lets you walk into a bank meeting or a broker conversation knowing what you're talking about.",
        ],
      },
    ],
    faqs: [
      {
        q: "How is the monthly loan repayment calculated?",
        a: "The monthly payment uses the standard PMT formula: PMT = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the principal, r is the monthly interest rate (annual rate ÷ 12), and n is the number of monthly payments. The calculator handles all of this automatically.",
      },
      {
        q: "What's the difference between a fixed and variable interest rate on a bond?",
        a: "A fixed rate stays the same for the loan term regardless of what the prime rate does. A variable rate is typically expressed as prime plus or minus a margin, so your repayment changes whenever the Reserve Bank adjusts the repo rate. Most South African home loans are variable rate.",
      },
      {
        q: "How much deposit do I need to buy a property in South Africa?",
        a: "There's no legal minimum, but most banks prefer a 10% deposit and offer better rates with 20% or more. A higher deposit reduces your loan-to-value ratio, which lowers both your monthly repayment and the total interest paid. The Mortgage Calculator lets you compare different deposit amounts side by side.",
      },
      {
        q: "What is transfer duty and when does it apply?",
        a: "Transfer duty is a government tax on property purchases. In South Africa, it applies to properties valued above R1,100,000 (as of 2024). Below that threshold, no transfer duty is payable. The rate is tiered, starting at 3% on the portion above R1.1 million and increasing to 13% on amounts above R10 million.",
      },
      {
        q: "Does making extra loan repayments really make a big difference?",
        a: "Yes, and the earlier you make them, the bigger the impact. Because most of your early repayments go to interest, extra payments in the first few years reduce the principal before interest accumulates on it. Even an extra few hundred rands per month can save years and significant amounts in interest over a 20-year bond.",
      },
      {
        q: "What compounding frequency gives the best investment returns?",
        a: "More frequent compounding gives marginally higher returns on the same nominal interest rate. Monthly compounding beats quarterly, which beats annual, because you're earning interest on a growing balance at shorter intervals. The difference is small at lower rates but becomes meaningful over long time periods.",
      },
      {
        q: "What is yield to maturity and why does it matter?",
        a: "Yield to maturity is the total annualised return you'd earn if you bought a bond today at its current price and held it until it matures. It accounts for coupon payments and any difference between the purchase price and the face value. It's the fairest way to compare bonds with different prices, coupons, and terms.",
      },
      {
        q: "Why does the early part of my amortization schedule show so little principal reduction?",
        a: "Because interest is calculated on the outstanding balance. At the start, your balance is highest, so more of each payment goes to interest. As the balance falls, the interest portion decreases and more of each payment goes to principal. This is a feature of standard amortizing loans, not an error.",
      },
      {
        q: "Can I use these calculators to compare renting vs buying?",
        a: "Yes. Use the Mortgage Calculator to determine the monthly cost of ownership (bond + rates + levies + maintenance), then compare that with your current rent. The Investment Calculator can help you model what investing the difference in rent savings would grow to over the same period, giving you a more complete comparison than just comparing bond repayment to rent.",
      },
      {
        q: "Are the results from these calculators accurate enough to use for real decisions?",
        a: "The calculations are mathematically precise, the formulas used are the same ones banks and financial institutions use. However, they're based on the inputs you provide and don't account for rate changes, fees, or individual credit assessments. Use them as an informed starting point, not as a final answer for major financial commitments.",
      },
    ],
  },

  {
    category: "Business",
    title: "Business Calculators: A Working Guide for Entrepreneurs and Employees",
    intro: [
      "Running a business or managing your personal finances in South Africa involves a specific set of calculations that come up constantly, VAT on invoices, margins on products, the salary someone actually takes home versus what they cost the company, and whether a particular investment of time or money actually paid off. These aren't abstract financial concepts; they're the numbers you need every day.",
      "The Business category on TrufflShuffl brings together six calculators that cover these scenarios: VAT, percentages, retirement projections, ROI, savings goals, and salary breakdowns. This guide explains how each one works, when to use it, and what the results are actually telling you.",
    ],
    sections: [
      {
        heading: "VAT: Getting the 15% Right Every Time",
        paragraphs: [
          "South Africa's standard VAT rate is 15%, and it affects nearly every transaction a business makes. The VAT Calculator handles two distinct calculations: adding VAT to an amount (to work out the VAT-inclusive price a customer pays) and removing VAT from an amount (to extract the VAT portion from a price that already includes it).",
          "Adding VAT is straightforward, multiply the net amount by 1.15. But removing VAT is where people frequently make mistakes. Many business owners calculate 15% of the inclusive price and subtract it, which gives the wrong answer. The correct formula is: net amount = inclusive amount ÷ 1.15. If a customer pays R460, the net amount is R400, and the VAT is R60, not R69 (which is 15% of R460).",
          "For invoicing, always show the net amount, the VAT amount, and the VAT-inclusive total as separate line items. SARS requires this on tax invoices for VAT vendors. If your business is VAT-registered and your annual turnover exceeds R1 million, you're required to register for VAT. Below that threshold, registration is voluntary but may make sense if your input credits would exceed your output tax.",
          "The calculator also lets you set a custom VAT rate, which is useful if you're working with transactions in countries with different rates, the UK charges 20%, Germany 19%, and the EU average sits around 21%.",
        ],
      },
      {
        heading: "Percentage Calculations: More Than Just Tips",
        paragraphs: [
          "The Percentage Calculator is one of the most used tools on TrufflShuffl because percentage questions come up in almost every business context. It handles four distinct types of calculation: finding X% of a number, determining what percentage one number is of another, calculating percentage change between two values, and working out a value after a percentage increase or decrease.",
          "For retailers and wholesalers, the percentage change calculation is particularly useful. If your cost of goods increases from R85 to R102, the calculator tells you that's a 20% increase, which helps you decide how much of that to pass on to customers. If you want to maintain a 35% gross margin, enter your cost price and the desired margin, and the calculator gives you the selling price.",
          "Profit margin and markup are often confused. A 25% markup means you add 25% to cost price. A 25% margin means profit is 25% of the selling price. On a R100 cost: a 25% markup gives a R125 selling price (R25 profit on R100 cost); a 25% margin gives a R133.33 selling price (R33.33 profit on R133.33 revenue). The Percentage Calculator makes it easy to convert between the two.",
        ],
      },
      {
        heading: "Retirement Planning: Starting Earlier Is Not a Cliché",
        paragraphs: [
          "The Retirement Calculator projects how much your savings will grow by a target retirement age, adjusting for inflation to show you the real purchasing power of your nest egg, not just the nominal rand value. This matters because R3 million in 30 years is not the same as R3 million today.",
          "In South Africa, contributions to a retirement annuity (RA) are tax-deductible up to 27.5% of your taxable income (capped at R350,000 per year). This means every R1,000 you contribute to an RA costs you significantly less in after-tax money, depending on your marginal tax rate. The calculator lets you model this as an effective contribution rate.",
          "The most important variable in retirement planning is not the return rate, it's time. A 25-year-old who saves R2,000 per month will retire with far more than a 40-year-old who saves R5,000 per month at the same rate, simply because compound growth has more years to work. Use the calculator to run these scenarios side by side and you'll understand immediately why starting early, even with smaller amounts, is such consistent advice.",
          "The inflation-adjusted result is the one that matters. If the calculator shows your projected value in today's money (real terms), you can directly compare it to your current living expenses and judge whether your target is realistic.",
        ],
      },
      {
        heading: "Return on Investment: Cutting Through the Noise",
        paragraphs: [
          "ROI is one of the most misused metrics in business. People cite it without specifying the time period, or they include irrelevant costs, or they compare ROIs across investments of vastly different durations as if they're equivalent. The ROI Calculator on TrufflShuffl gives you both the raw ROI percentage and the annualised ROI, which is the version that actually allows fair comparisons.",
          "The basic formula is: ROI = (Net Profit ÷ Cost) × 100. If you spent R50,000 on a marketing campaign and generated R80,000 in attributable revenue, your net profit from that campaign is R30,000 and your ROI is 60%. But if that campaign ran over two years, your annualised ROI is roughly 27%, a very different number.",
          "Use the break-even field to understand how much revenue or return you need to just recover your investment. For capital purchases, equipment, software, training, the break-even point tells you the minimum performance required to justify the spend. Anything above that is actual return.",
          "One honest caveat: ROI doesn't capture risk. Two investments with the same ROI can have very different risk profiles. A 30% ROI from a government bond and a 30% ROI from a startup investment are not equivalent choices. Use ROI as a ranking tool alongside your own assessment of risk and liquidity.",
        ],
      },
      {
        heading: "Building a Savings Target",
        paragraphs: [
          "The Savings Calculator uses future value calculations to project what a lump sum or regular contributions will grow to over time. It's useful for setting specific goals, a deposit, school fees, a vehicle purchase, an emergency fund, and working out the contribution required to hit them.",
          "A practical starting point for most South Africans is the emergency fund: three to six months of living expenses, held in an accessible high-interest account. If your monthly expenses are R25,000, your target is R75,000 to R150,000. Enter that target, your expected interest rate (a money market account currently pays around 8–9%), and your starting amount, and the calculator tells you what monthly contribution gets you there and when.",
          "For longer-term goals, the savings calculator demonstrates the real impact of starting amounts versus contribution rates. If you already have R50,000 saved, its growth over 10 years at 9% contributes nearly as much as starting from zero and contributing R1,000 per month for the same period. Understanding this helps you prioritise: sometimes lump-sum savings matter more than contribution frequency.",
        ],
      },
      {
        heading: "What Your Salary Package Actually Means",
        paragraphs: [
          "The Salary Calculator breaks down a gross annual package into its after-tax components. In South Africa, employees pay income tax according to SARS's progressive brackets, plus UIF contributions (1% of gross, capped at the UIF ceiling). The calculator estimates the monthly and annual take-home after these deductions.",
          "Cost-to-company (CTC) is the total cost to the employer, which typically includes salary, employer UIF, employer contributions to medical aid and pension, and any other benefits. The take-home pay is always lower than CTC, often significantly so. If an employer offers R600,000 CTC, the actual monthly salary might be R35,000–R40,000 depending on how benefits are structured.",
          "The calculator also provides hourly, daily, and weekly breakdowns, useful for freelancers and contractors quoting their time, or for employees comparing a salaried role to a contract rate. A R600,000 annual package works out to R288 per hour on a standard 40-hour week, a number that's useful context when you're negotiating or comparing options.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I remove VAT from a price that already includes it?",
        a: "Divide the VAT-inclusive amount by 1.15 (for South Africa's 15% rate) to get the net amount. Then subtract the net amount from the inclusive price to find the VAT portion. Do not take 15% of the inclusive price, that gives the wrong answer.",
      },
      {
        q: "At what turnover must a business register for VAT?",
        a: "In South Africa, VAT registration is compulsory once your taxable supplies exceed R1 million in a 12-month period. Voluntary registration is possible from R50,000. Once registered, you charge VAT on sales and can claim back VAT paid on business expenses.",
      },
      {
        q: "What's the difference between profit margin and markup?",
        a: "Margin is profit as a percentage of the selling price. Markup is profit as a percentage of the cost. A 40% margin on a R100 cost gives a selling price of R166.67. A 40% markup gives R140. They're not interchangeable, always clarify which one you mean when discussing pricing.",
      },
      {
        q: "How much should I be saving for retirement?",
        a: "A widely used guideline is 15% of gross income, starting as early as possible. The actual amount depends on your target retirement age, expected lifestyle, and existing savings. The Retirement Calculator lets you input these variables and see whether your current savings rate gets you to your target.",
      },
      {
        q: "What tax deduction do I get for contributing to a retirement annuity?",
        a: "SARS allows you to deduct contributions to an RA (and pension/provident fund) up to 27.5% of your taxable income, with a maximum of R350,000 per year. If you pay income tax at 36%, contributing R10,000 to an RA effectively only costs you R6,400 in after-tax money.",
      },
      {
        q: "Is a high ROI always a good sign?",
        a: "Not necessarily. ROI doesn't account for time, risk, or opportunity cost. A 100% ROI over five years is not as impressive as it sounds when compared to a lower-risk investment returning 9% annually (which compounds to about 54% over the same period). Always annualise ROI before comparing.",
      },
      {
        q: "What's a good monthly savings rate for an emergency fund?",
        a: "It depends on your income and expenses. The goal is three to six months of living expenses. If that's R120,000, saving R5,000 per month gets you there in two years. Use the Savings Calculator to find the contribution that fits your timeline and budget.",
      },
      {
        q: "What does CTC mean and how does it differ from take-home pay?",
        a: "CTC (cost-to-company) is the total cost to your employer, including salary, UIF, medical aid, pension contributions, and any other benefits. Your take-home pay is what's left after tax, UIF, and any benefit deductions. CTC can be 30–50% higher than take-home pay, depending on your tax bracket and benefit structure.",
      },
      {
        q: "How do I compare a salaried position with a freelance day rate?",
        a: "Use the Salary Calculator to find your effective hourly rate from the salaried position, including benefits. Then compare this to your freelance rate, remembering that as a freelancer you pay both the employee and employer portions of UIF, don't receive benefits, and have no paid leave, so your day rate needs to be meaningfully higher to be equivalent.",
      },
      {
        q: "Can the percentage calculator help with currency discounts?",
        a: "Yes. Enter the original price and the discount percentage to find the final price, or enter the original and discounted prices to find the percentage reduction. This works for any percentage-based pricing scenario, discounts, price increases, currency adjustments, or commission calculations.",
      },
    ],
  },

  {
    category: "Fuel & Travel",
    title: "Fuel Costs and Trip Planning: How to Use the Fuel Calculator",
    intro: [
      "Fuel is one of South Africa's most volatile household expenses. With petrol prices adjusted monthly by the Department of Mineral and Petroleum Resources and driven by a combination of global crude oil prices, the rand/dollar exchange rate, and local levies, the cost of driving can change substantially from one month to the next. That makes it worth knowing exactly what your vehicle costs to run, and what any planned trip will actually cost before you leave.",
      "The TrufflShuffl Fuel & Trip Calculator takes the guesswork out of this. Enter your vehicle's fuel consumption, the trip distance, and the current fuel price, and it returns the exact cost of the journey, as well as the time it'll take based on your expected speed. This guide explains how to get the most out of the calculator, why fuel consumption figures matter, and what you can do to stretch every litre further.",
    ],
    sections: [
      {
        heading: "Why Fuel Costs Are Harder to Estimate Than They Should Be",
        paragraphs: [
          "Ask most drivers what their car costs to run per kilometre and you'll get a shrug. People know roughly what they spend at the pump each month, but few can tell you their vehicle's actual consumption in L/100km or what a specific journey will cost. This uncertainty makes budgeting for travel difficult and means most people underestimate the true cost of driving.",
          "The challenge is that fuel consumption is rarely constant. Highway driving at a steady 120 km/h uses significantly less fuel per kilometre than stop-start urban traffic. Air conditioning, roof racks, vehicle load, tyre pressure, and driving style all affect consumption. The figure on your car's spec sheet, called the manufacturer's combined cycle, is measured under controlled laboratory conditions and almost never matches what you'll see in real-world driving.",
          "The Fuel Calculator works with your real consumption figure, not the manufacturer's estimate. If you know your vehicle uses 9.5 L/100km in your typical driving conditions (which you can calculate by filling up, noting the odometer, driving until nearly empty, and dividing the litres refuelled by the kilometres driven), that's the number to use. It will give you a far more accurate cost estimate than the spec sheet figure.",
        ],
      },
      {
        heading: "How the Fuel Calculator Works",
        paragraphs: [
          "The calculator requires three inputs: the trip distance in kilometres, your vehicle's fuel consumption in L/100km, and the current fuel price in rand per litre. From these three numbers, it calculates the fuel needed (distance × consumption ÷ 100) and the total fuel cost (litres × price per litre).",
          "It also calculates estimated travel time based on an average speed you specify, useful for planning arrival times, scheduling stops, and working out how many drivers you might need on a long haul. Enter 120 km/h for highway travel or 60 km/h for a mix of in-town and intercity driving.",
          "If you're travelling with others and want to split costs, the calculator shows total fuel cost which you can then divide by the number of passengers. For commercial use, fleet vehicles, delivery operations, sales reps, this per-trip cost is also the direct input cost for pricing your service or reimbursing travel at the SARS-approved rate (R4.84 per km for the 2024/25 tax year for privately owned vehicles used for business).",
        ],
      },
      {
        heading: "Understanding L/100km: The Number That Actually Matters",
        paragraphs: [
          "South Africa uses litres per 100 kilometres (L/100km) as the standard measure of fuel consumption. A lower number means better fuel efficiency, 5.0 L/100km is very economical, while 14.0 L/100km is high consumption. To put it in context: a vehicle using 8.0 L/100km on a 400 km trip needs 32 litres; at R24/litre that's R768. The same trip in a vehicle using 12.0 L/100km costs R1,152, 50% more.",
          "Some countries use miles per gallon (MPG) instead. To convert MPG to L/100km, divide 282.5 by the MPG figure. A car rated at 35 MPG is approximately 8.1 L/100km. The Fuel Calculator works in L/100km, which is the figure you'll see on South African vehicle spec sheets and fuel cost comparison tools.",
          "If you've never calculated your actual consumption, the next fill-up is the right time to start. Note your odometer reading when you fill up, then drive until the tank is low and fill up again. Divide the litres added by the kilometres driven and multiply by 100. Do this two or three times to get a reliable average, a single fill-up can be skewed by driving conditions.",
        ],
      },
      {
        heading: "The South African Petrol Price: How It's Set",
        paragraphs: [
          "South Africa's fuel price is set by the government at the beginning of each month. It's not a market price, it's a regulated price based on a complex formula that accounts for the import parity price of fuel (essentially what it would cost to import refined fuel), the rand/dollar exchange rate, and a basket of fixed and variable levies.",
          "The levies make up a substantial portion of what you pay at the pump. As of 2024, these include the general fuel levy (around R4.10/litre for petrol), the Road Accident Fund levy (R2.18/litre), and smaller contributions to customs and excise. These fixed levies don't change with the oil price, which is why fuel prices never fall as much as you might expect when the oil price drops, the levy portion remains constant.",
          "What this means practically: when planning trips around petrol prices, the month-to-month changes in the consumer price tend to be in the range of 30–80 cents per litre. On a full tank of 50 litres, that's R15–R40, meaningful over many fill-ups, but not usually a reason to delay a specific trip. Use the Fuel Calculator with current prices rather than speculating about next month's adjustment.",
        ],
      },
      {
        heading: "Planning a Long-Distance Road Trip in South Africa",
        paragraphs: [
          "South Africa is a large country by any measure, and road trips are a way of life for many families. The Johannesburg to Cape Town route via the N1 is roughly 1,400 km. In a vehicle consuming 9.0 L/100km at R24/litre, that's 126 litres and R3,024 in fuel, one way. Return is R6,048. Adding passengers divides this cost, making the per-person comparison to a flight much more favourable than most people realise.",
          "For a trip of this length, also factor in accommodation, toll fees (the N1 has several toll plazas), and meals. The Fuel Calculator handles the fuel portion; for a complete trip budget, use its output as the foundation and add those additional costs manually.",
          "A practical route-planning tip: on the N1 between Johannesburg and Cape Town, you'll pass through Johannesburg, Three Sisters, Beaufort West, and eventually Paarl before reaching Cape Town. Fuel stations are widely spaced in the Karoo, so it's worth filling up before entering remote stretches rather than risking running low. The calculator can tell you exactly how far a full tank will take you based on your vehicle's consumption and tank size.",
        ],
      },
      {
        heading: "Fuel-Saving Habits That Actually Make a Difference",
        paragraphs: [
          "Some fuel-saving advice is theoretical, the kind of thing that makes a marginal difference in a laboratory and almost none on a real commute. But a few habits genuinely cut consumption by 10–20% in everyday driving.",
          "Speed is the biggest lever. Aerodynamic drag increases with the square of velocity, which means driving at 140 km/h uses roughly 25% more fuel than driving at 120 km/h over the same distance. If your budget allows only one change, it's keeping a steady highway speed below 120 km/h.",
          "Tyre pressure is the second most impactful variable. Under-inflated tyres create more rolling resistance, which the engine has to overcome, meaning more fuel for the same movement. Check tyre pressure monthly and inflate to the vehicle manufacturer's recommended level (found on the door jamb or in the owner's manual), not the maximum pressure listed on the tyre sidewall.",
          "Air conditioning increases fuel consumption by 5–15% depending on conditions. At highway speeds with the windows closed, A/C may actually be more efficient than open windows (which increase drag), but at lower urban speeds, opening windows is usually more economical. Roof racks and crossbars, even empty ones, add meaningful drag at highway speeds.",
        ],
      },
      {
        heading: "Comparing Petrol, Diesel, and Electric Running Costs",
        paragraphs: [
          "The Fuel Calculator is primarily designed for petrol and diesel vehicles, the inputs work the same for both, since both measure consumption in L/100km. Diesel typically costs slightly less per litre than petrol in South Africa and tends to offer better fuel economy in larger vehicles, particularly on highways. Running cost comparisons between a petrol and a diesel version of the same model are straightforward with the calculator.",
          "For electric vehicles, the equivalent calculation uses kilowatt-hours per 100 km (kWh/100km). A typical EV uses around 15–20 kWh/100km. At a home charging rate of R2.50/kWh, the cost per 100 km is R37.50–R50.00, compared to R144–R216 for a petrol vehicle at 6–9 L/100km and R24/litre. The running cost advantage for EVs in South Africa is significant, though the purchase price premium and charging infrastructure limitations need to be factored in for a complete comparison.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I find my vehicle's actual fuel consumption?",
        a: "Fill up completely, note the odometer reading. Drive normally until you need to fill up again. Divide the litres added by the kilometres driven and multiply by 100. For example: 45 litres over 480 km = 45 ÷ 480 × 100 = 9.375 L/100km. Repeat this a few times to get a reliable average.",
      },
      {
        q: "Why does my car use more fuel than the spec sheet says?",
        a: "Manufacturer consumption figures are measured under laboratory conditions, constant temperature, no air conditioning, no load, specific driving cycles. Real-world factors like traffic, air conditioning, hills, passenger load, and driving style all increase consumption. It's normal to use 10–25% more than the official figure.",
      },
      {
        q: "How is the South African petrol price calculated each month?",
        a: "DMPR calculates it based on the international price of refined petroleum (import parity pricing), the rand/dollar exchange rate at the time, and a set of fixed levies. The levies, including the fuel levy and Road Accident Fund levy, are fixed per litre and don't move with the oil price.",
      },
      {
        q: "How much cheaper is it to travel by car than by plane within South Africa?",
        a: "It depends on passengers and distance. Johannesburg to Cape Town by road costs roughly R3,000–R4,000 in fuel for a typical vehicle. Split between four people, that's R750–R1,000 per person, often well below flight prices, though the 14-hour drive time is a significant difference. The Fuel Calculator makes this comparison easy.",
      },
      {
        q: "What is the SARS rate for private vehicle travel on company business?",
        a: "For the 2024/25 tax year, SARS set the deemed cost per kilometre at R4.84 for private vehicles used for business purposes. This is the maximum rate you can claim tax-free from your employer. Rates above this are treated as taxable income.",
      },
      {
        q: "Does driving speed really affect fuel consumption that much?",
        a: "Yes, substantially. Most vehicles reach peak efficiency around 80–100 km/h. Above that, aerodynamic drag increases sharply. Driving at 140 km/h versus 120 km/h typically uses 20–30% more fuel over the same distance. The Fuel Calculator shows the cost impact when you adjust for different consumption rates.",
      },
      {
        q: "Is there a fuel calculator for diesel vehicles?",
        a: "The same calculator works for diesel, just enter your diesel vehicle's L/100km consumption and the current diesel price per litre. The underlying calculation is identical.",
      },
      {
        q: "How many litres does a typical South African vehicle tank hold?",
        a: "Most passenger cars have tanks between 50–65 litres. SUVs and bakkies typically hold 65–80 litres. With a 9 L/100km consumption rate, a 60-litre tank gives a range of around 667 km, enough for most intercity trips with a margin for error.",
      },
      {
        q: "How do I split fuel costs fairly among passengers?",
        a: "Use the calculator to find the total fuel cost for the trip, then divide by the number of people sharing the vehicle (including the driver, who also benefits from sharing). If you want to factor in vehicle depreciation and wear, add a reasonable per-kilometre amount on top of the fuel cost.",
      },
      {
        q: "Can I use the fuel calculator for fleet management?",
        a: "Yes. Enter the vehicle's consumption and the distance for each route to calculate the fuel budget per trip. Over time, comparing actual fuel spend to calculated fuel cost helps identify inefficiencies, detours, or vehicles that are consuming more than expected, a useful flag for maintenance.",
      },
    ],
  },

  {
    category: "Home & Garden",
    title: "Plan It Before You Build It: A Guide to Home Improvement Calculators",
    intro: [
      "Home improvement projects in South Africa have a well-earned reputation for costing more than expected. It's not always contractor dishonesty or poor project management, sometimes it's just that the numbers weren't worked out properly at the start. How many pavers do you actually need? How many litres of pool water will you be treating? How many tins of paint will cover the lounge ceiling? These aren't complicated calculations, but getting them wrong means either running out of materials or buying far too much.",
      "TrufflShuffl's Home & Garden calculators are built around four of the most common project types: pool sizing, paving, renovation cost estimation, and paint coverage. This guide explains what each calculator produces, what inputs matter most, and how to interpret the results when you're getting quotes or managing a project yourself.",
    ],
    sections: [
      {
        heading: "Why Home Projects Go Over Budget",
        paragraphs: [
          "The most common reason home improvement projects exceed their budget is that the scope changes during the build. Someone adds a feature, the contractor discovers a hidden problem, or the quoted materials turn out to be unavailable and a more expensive substitute is needed. Calculators can't prevent scope creep, but they can give you an accurate baseline, which is the difference between a project that goes 10% over budget and one that doubles.",
          "The second most common reason is materials wastage. Tiles, pavers, and paint are typically sold in units (boxes, square-metre packs, or tins of fixed sizes), and real-world surfaces aren't perfectly sized to match those units. Cutting creates offcuts; irregular rooms create awkward corners. The TrufflShuffl calculators include wastage factors, typically 10% for paving and 5% for paint, to account for this, so the quantity they recommend is the quantity you should actually buy, not the bare minimum.",
          "Labour cost estimation is the hardest part to calculate precisely, because it varies by region, trade, and individual contractor. The Renovation Cost Calculator provides estimates per square metre based on renovation type and quality grade, which gives you a benchmark for comparing quotes, not a fixed price.",
        ],
      },
      {
        heading: "Pool Volume: The Number That Drives Everything Else",
        paragraphs: [
          "The Pool Size Calculator computes the volume of your pool in litres and gallons based on shape and dimensions. This is the foundational number for everything pool-related: chemical dosing, pump sizing, fill time estimation, and even insurance valuations.",
          "For a rectangular pool, volume is simply length × width × average depth. For an oval pool, the calculator uses the appropriate geometric formula automatically. A typical South African suburban pool, say 8m × 4m × 1.5m average depth, holds 48,000 litres. That's roughly 48 tonnes of water, which helps explain why pool construction requires substantial foundations.",
          "Chemical dosing is always expressed per 10,000 litres, so knowing your pool volume precisely matters for water chemistry. Adding the right amount of chlorine or pH adjuster to a 30,000-litre pool versus a 45,000-litre pool is a meaningful difference, too little and the water turns green, too much and you're wasting chemicals or creating an irritant. The calculator also estimates fill time: at a typical municipal supply rate of 15–20 litres per minute, a 48,000-litre pool takes 40–53 hours to fill from empty.",
          "If you're considering a pool installation, the volume calculation is also the input for heating costs. An unheated pool in Johannesburg loses roughly 2–5 degrees Celsius overnight. Heating 48,000 litres by 3 degrees requires about 56 kWh of energy, at R3.50/kWh, that's nearly R200 per heating cycle. Gas heating and solar heating have different cost profiles; knowing your pool volume lets you calculate these costs before choosing a heating method.",
        ],
      },
      {
        heading: "Paving: Getting the Quantities Right",
        paragraphs: [
          "The Paving Calculator takes the dimensions of the area to be paved and the size of each paver, and returns the total number of pavers needed, the number of packs or bags required, and a cost estimate if you enter the price per unit. It includes a 10% wastage factor, which accounts for cuts at edges, broken pavers, and the inevitable few that get cracked during laying.",
          "Paving project costs in South Africa vary enormously depending on the paver material. Plain concrete pavers start at around R180–R250 per square metre supplied and laid by a contractor. Clay brick pavers, tumbled cobbles, and natural stone can reach R600–R1,200 per square metre or more. The calculator produces a quantity estimate; you use that quantity with the supplier's price to get the materials cost.",
          "One thing the calculator highlights is the difference between the nominal area and the actual number of pavers needed. If your driveway is 40 square metres and each paver covers 0.09 square metres (a 30cm × 30cm paver), you need approximately 444 pavers before wastage, 489 with the 10% factor. Pavers typically come in packs of 25, so you'd need 20 packs. Knowing this before you go to the builder's merchant means you can negotiate a volume price rather than running back for more.",
        ],
      },
      {
        heading: "Renovation Cost Estimation: What a Square Metre Actually Costs",
        paragraphs: [
          "The Renovation Cost Calculator covers 15 renovation types, from a full kitchen remodel to a bathroom retile, a room addition, or a garage conversion, and lets you select three quality grades: standard, mid-range, and premium. The result is an estimated cost range per square metre for the specified renovation type and quality.",
          "These figures are benchmarks based on typical South African contractor pricing, and they'll vary by city (Cape Town generally runs higher than other metros), by the specific finishes chosen, and by market conditions. Use them to reality-check quotes you receive, not as a fixed budget. If a contractor's quote comes in 50% below the benchmark, ask detailed questions. If it comes in 30% above, ask what's driving the premium.",
          "The quality grade has a significant effect on cost. A standard bathroom renovation might run R12,000–R18,000 per square metre, while a premium renovation with imported tiles, custom joinery, and designer fixtures can reach R40,000 per square metre or more. Define the grade clearly before getting quotes, showing a contractor a photo of what you want eliminates most of the ambiguity.",
          "Don't forget to include professional fees if your renovation requires an architect or structural engineer. Work that changes load-bearing walls, adds a new structure, or requires building plan approval typically requires a registered professional. In South Africa, professional fees for residential work are typically negotiated rather than fixed, but 8–12% of the construction cost is a reasonable starting point.",
        ],
      },
      {
        heading: "Paint Coverage: Never Run Out Mid-Wall Again",
        paragraphs: [
          "The Paint Calculator computes the total area to be painted, accounts for windows and doors, and divides by the coverage rate of the paint type selected to give you the exact quantity required per coat. Multiply by the number of coats (typically two for walls, three for ceilings or very dark colours) and you have your shopping list.",
          "Paint coverage varies significantly by product. Economy interior PVA typically covers 8–10 m² per litre. High-quality interior acrylic covers 10–12 m². Primers and sealers generally cover less, around 6–8 m²/litre, because they're designed to penetrate and bond rather than just coat the surface. The calculator includes these coverage rates, but always check the specific product label since formulations vary by brand.",
          "The calculator also estimates the number of tins based on standard tin sizes (1L, 5L, 20L). This is where the practical value lies, instead of buying six 5-litre tins and finding out you needed seven, you know in advance. For large projects, buying the correct quantity upfront is also usually cheaper; most hardware stores charge more per litre for small tins than large ones.",
          "One practical note on colour: if you're changing from a dark to a light colour (or the reverse), budget for an extra coat and potentially a tinted primer. The calculator's default of two coats is appropriate for repainting the same colour or a similar shade; dramatic colour changes often need three or even four coats for complete coverage.",
        ],
      },
      {
        heading: "How to Use These Tools When Getting Quotes",
        paragraphs: [
          "The best use of these calculators is as preparation for contractor conversations. Before a paving quote arrives, know how many square metres you need covered and roughly how many pavers that requires. Before a painting quote, know the total painted area and the expected litres of paint. This context lets you interrogate a quote intelligently rather than accepting the materials list at face value.",
          "Legitimate contractors won't be put off by a client who's done their homework, they'll usually appreciate it. It reduces misunderstandings about scope and helps you compare quotes that might use different quantities or specifications. A quote that includes significantly more materials than the calculator suggests either includes appropriate contingency (ask why) or is padding the margin (also worth a conversation).",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I calculate the volume of an irregular-shaped pool?",
        a: "For pools with non-rectangular shapes, the calculator uses standard geometric formulas for oval, round, and L-shaped pools. For truly irregular shapes, break the pool into simpler sections (rectangles, half-circles), calculate each section's volume separately, and add them together.",
      },
      {
        q: "How much does it cost to fill a pool in South Africa?",
        a: "Municipal water rates vary by city and consumption tier. A typical suburban rate is around R25–R45 per kilolitre (1,000 litres). Filling a 48,000-litre pool costs R1,200–R2,160 in water alone, plus any applicable sewage charges (some municipalities charge sewage rates on all water, even if it goes into a pool).",
      },
      {
        q: "What does the 10% wastage factor in the paving calculator cover?",
        a: "Cuts at edges and corners, broken pavers during handling and laying, and pavers set aside as spare stock for future repairs. Some laying patterns, herringbone, for example, create more offcuts than a simple grid pattern and may need 12–15% wastage rather than 10%.",
      },
      {
        q: "Can I paint over an existing colour without sanding or priming?",
        a: "Usually yes, for interior walls in reasonable condition. However, if you're making a major colour change, painting over glossy surfaces, or covering stains, a primer coat significantly improves adhesion and coverage. The Paint Calculator assumes the surface is in paintable condition.",
      },
      {
        q: "How accurate are the renovation cost estimates?",
        a: "They're benchmarks based on typical South African market rates and are useful for budgeting and quote comparison. Actual costs vary by city, contractor, specific materials, and site conditions. Always get at least three quotes for any renovation above R20,000.",
      },
      {
        q: "What are the most common pool chemical treatments?",
        a: "Chlorine (granular or liquid) for sanitisation, pH increaser or decreaser, algaecide, and clarifier are the core chemicals. Dosing is always based on pool volume in litres. Knowing your pool volume from the calculator lets you dose accurately rather than guessing.",
      },
      {
        q: "How long does exterior paint last in South Africa?",
        a: "Quality exterior acrylic paint on a well-prepared surface lasts 7–10 years in most South African conditions. Harsh coastal environments (salt air, humidity) or extreme sun exposure (Highveld) can reduce this to 5–7 years. Cheaper paint may need repainting every 3–4 years.",
      },
      {
        q: "How do I measure an irregular-shaped room for paving?",
        a: "Divide the area into rectangles or other regular shapes, measure each, and add the areas together. Use the calculator's total area input rather than trying to input complex shapes, it's designed to work with total square metres.",
      },
      {
        q: "Do I need building plans for a pool installation?",
        a: "In most South African municipalities, yes. A pool is a permanent structure and typically requires building plan approval. The requirements vary by municipality; check with your local council or use a contractor who handles the plan submission as part of the installation.",
      },
      {
        q: "What's the difference between standard, mid-range, and premium renovation grades?",
        a: "Standard uses off-the-shelf fittings, tiles, and finishes from major hardware chains. Mid-range includes better-quality materials, custom elements, and more skilled labour. Premium involves imported materials, specialist artisans, bespoke joinery, and high-end appliances. The cost difference between standard and premium can be five to ten times per square metre.",
      },
    ],
  },

  {
    category: "Health",
    title: "BMI and Calories: A Practical Guide to the Health Calculators",
    intro: [
      "Body weight and energy intake are two of the most measured things in healthcare, and also two of the most misunderstood. BMI gets reduced to a single number that people either feel defined by or dismiss entirely. Calorie counting gets treated as a diet strategy rather than an energy management tool. Both metrics are genuinely useful, not as verdicts, but as reference points that help you understand what your body needs and how far your current habits are from where you want to be.",
      "TrufflShuffl's Health calculators, the BMI Calculator and the Calorie/TDEE Calculator, give you access to the same calculations that doctors, dietitians, and personal trainers use. This guide explains what the numbers mean, where they fall short, and how to use them practically rather than obsessively.",
    ],
    sections: [
      {
        heading: "What BMI Actually Measures",
        paragraphs: [
          "Body Mass Index is a ratio of weight to height, calculated as weight in kilograms divided by height in metres squared. It was developed in the 1830s by a Belgian mathematician as a population-level statistical tool, not as a clinical diagnostic. That origin is worth remembering, because it explains both why BMI is useful at scale and why it falls short for individuals.",
          "At the population level, BMI correlates reasonably well with body fat percentage and health risk. Higher BMI is associated with higher rates of cardiovascular disease, type 2 diabetes, hypertension, and several cancers. These correlations are well established across large studies. At the individual level, however, BMI can be significantly misleading because it doesn't distinguish between fat mass and lean mass.",
          "A professional rugby player who weighs 110 kg at 1.80 m has a BMI of 34, firmly in the 'obese' category, but may have very low body fat and exceptional cardiovascular health. Conversely, a sedentary person with a normal BMI of 22 may carry a disproportionate amount of visceral fat, which is a significant health risk. This is sometimes called 'normal weight obesity' or 'metabolically obese normal weight.'",
        ],
      },
      {
        heading: "Reading Your BMI Result",
        paragraphs: [
          "The WHO classifies BMI as follows: under 18.5 is underweight; 18.5–24.9 is normal weight; 25–29.9 is overweight; 30 and above is obese (with further subdivisions at 35 and 40 for Class II and Class III obesity). These thresholds are the ones used by most health systems globally, including South Africa.",
          "The BMI Calculator also provides your healthy weight range, the range of body weights that would put you within the 18.5–24.9 band for your height. This is useful as a target range rather than a single target weight: it acknowledges that 'healthy' isn't a precise number.",
          "For children, BMI is age- and sex-specific (because body composition changes significantly during growth) and expressed as a percentile rather than a fixed category. The adult BMI chart doesn't apply to children under 18. If you're calculating for a child, the calculator will use age-appropriate reference data.",
          "South African context: obesity rates in South Africa are high by global standards. According to the 2016 South African Demographic and Health Survey, 68% of women and 31% of men are overweight or obese. This makes these calculators particularly relevant for understanding where you sit relative to health guidelines, not just relative to the people around you.",
        ],
      },
      {
        heading: "Calories and Energy Balance",
        paragraphs: [
          "Your body requires energy to exist, to breathe, circulate blood, maintain body temperature, and perform every function from blinking to thinking. This baseline energy requirement, called the Basal Metabolic Rate (BMR), is the number of calories your body would burn if you lay completely still for 24 hours. For most adults, it's somewhere between 1,200 and 2,000 calories per day.",
          "BMR is calculated using one of several formulas; the Calorie Calculator uses the Mifflin-St Jeor equation, which is currently considered the most accurate for most people. It factors in your age, sex, height, and weight. As you age, BMR typically decreases, partly because lean mass (which is metabolically active) tends to decline with age, and partly because hormonal changes affect energy expenditure.",
          "Total Daily Energy Expenditure (TDEE) is your BMR multiplied by an activity factor, accounting for the calories you burn through movement, exercise, and daily physical activity. TDEE is the number that actually matters for weight management: eat consistently below TDEE and you'll lose weight over time; eat consistently above it and you'll gain weight.",
        ],
      },
      {
        heading: "Activity Levels and What They Really Mean",
        paragraphs: [
          "The Calorie Calculator asks you to select an activity level, which is used to multiply your BMR into TDEE. The standard categories are: sedentary (desk job, minimal exercise), lightly active (light exercise 1–3 days/week), moderately active (exercise 3–5 days/week), very active (hard exercise 6–7 days/week), and extra active (physical job plus hard exercise, or twice-daily training).",
          "Most people underestimate their activity level or overestimate it. 'Three gym sessions per week' doesn't make you 'very active' if you sit at a desk for the other 23 hours each day. Research into what's called NEAT (non-exercise activity thermogenesis), the calories burned through fidgeting, standing, walking around the office, and other incidental movement, shows it varies by as much as 1,000 calories per day between individuals, even without formal exercise.",
          "If you're uncertain which category applies, choose the lower one and observe your weight over 3–4 weeks. If your weight is stable while eating at your calculated TDEE, the estimate was accurate. If you're gaining weight, your actual TDEE is lower than calculated; if you're losing, it's higher. This feedback loop is more accurate than any formula.",
        ],
      },
      {
        heading: "Macronutrients and How to Use the Calorie Goal",
        paragraphs: [
          "Once you know your TDEE, the Calorie Calculator suggests target macronutrient ratios: protein, carbohydrates, and fat. These are expressed in grams per day, based on standard recommended ratios, typically around 25–35% protein, 45–55% carbohydrates, and 20–30% fat for a balanced diet. For weight loss, a higher protein ratio helps preserve muscle mass. For endurance athletes, carbohydrates are often prioritised.",
          "Protein is 4 calories per gram; carbohydrates are 4 calories per gram; fat is 9 calories per gram. Alcohol is 7 calories per gram and provides no nutritional value. These conversions let you map any food's macronutrient content to its calorie contribution, which is what nutritional labels are doing when they show both grams and calories.",
          "For weight loss, a daily calorie deficit of 500–750 calories typically produces 0.5–0.75 kg of fat loss per week, a rate that's sustainable and doesn't trigger the adaptive metabolic responses that crash diets tend to cause. A very aggressive deficit (more than 1,000 calories below TDEE) accelerates fat loss but also causes muscle loss, fatigue, and often rebound eating. Use the calculator's suggested calorie target as your daily goal, not the minimum number you can tolerate.",
        ],
      },
      {
        heading: "Using the Numbers Without Obsessing Over Them",
        paragraphs: [
          "These tools are most useful when they inform habits, not when they replace judgment. Tracking calories precisely for a few weeks can be illuminating, it often reveals that portions are larger than assumed, or that snacks are contributing more to daily intake than recognised. But permanent, granular tracking isn't sustainable for most people and can contribute to an unhealthy relationship with food.",
          "BMI and TDEE are starting points. They're useful for setting targets, for monitoring broad trends (weight increasing over months, not days), and for having informed conversations with a doctor or dietitian. They don't replace medical advice, account for individual health conditions, or tell you what to eat, just how much energy your food represents.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is a healthy BMI range?",
        a: "The WHO classifies 18.5–24.9 as a healthy BMI for adults. Below 18.5 is underweight; 25–29.9 is overweight; 30 and above is obese. These are population-level guidelines and don't account for muscle mass, age-related body composition changes, or ethnicity.",
      },
      {
        q: "Is BMI an accurate measure of health?",
        a: "At the population level, yes, BMI correlates with health risk across large groups. For individuals, it's imprecise. It can classify muscular individuals as overweight and miss visceral fat in people with normal weight. It's a useful screening tool, not a diagnosis.",
      },
      {
        q: "What is TDEE and how is it different from BMR?",
        a: "BMR (Basal Metabolic Rate) is the calories your body burns at complete rest, just keeping you alive. TDEE (Total Daily Energy Expenditure) is your BMR multiplied by an activity factor, representing the total calories you actually burn in a day including movement and exercise. You should eat at or near TDEE to maintain your current weight.",
      },
      {
        q: "How many calories should I eat to lose weight?",
        a: "A deficit of 500–750 calories per day below your TDEE typically produces 0.5–0.75 kg of fat loss per week. Most adults should not eat below 1,200 calories (women) or 1,500 calories (men) without medical supervision, as very low calorie intake can cause muscle loss and nutritional deficiencies.",
      },
      {
        q: "Which BMR formula does the Calorie Calculator use?",
        a: "The Mifflin-St Jeor equation, which is currently considered the most accurate for most non-athlete adults. It uses age, sex, height, and weight. For athletes with very high muscle mass, the Katch-McArdle formula (which requires body fat percentage) may be more accurate.",
      },
      {
        q: "What counts as a sedentary activity level?",
        a: "Sedentary means minimal deliberate exercise, a desk job, limited walking, and no regular workout routine. If you're sedentary but go for occasional walks, 'lightly active' might be more appropriate. When in doubt, choose the lower option and adjust based on real-world results.",
      },
      {
        q: "Does age affect how many calories I need?",
        a: "Yes. BMR decreases with age, primarily because lean muscle mass tends to decline from the mid-30s onward, and muscle is more metabolically active than fat. This is why calorie needs typically decrease as people get older, even with the same activity level.",
      },
      {
        q: "Are calories from different sources equal?",
        a: "From a pure weight management perspective, a calorie is a calorie. But different macronutrients affect satiety, muscle protein synthesis, and blood sugar differently. Protein is more satiating and preserves muscle during weight loss. Carbohydrates provide quick energy. Fat supports hormone production. The source of calories matters for health and body composition, even if not for the simple equation of weight change.",
      },
      {
        q: "Should I recalculate TDEE as I lose weight?",
        a: "Yes, every 5–10 kg of weight change. As you lose weight, your BMR decreases because a smaller body requires less energy to maintain. This is why weight loss typically slows as you approach your goal, your deficit becomes smaller as your maintenance calories decrease.",
      },
      {
        q: "Is BMI calculated differently for children?",
        a: "Yes. For children and adolescents under 18, BMI is plotted on age- and sex-specific growth charts and expressed as a percentile, not a category. A BMI at or above the 95th percentile for age and sex is considered obese; at or above the 85th percentile is overweight. Adult BMI categories don't apply to children.",
      },
    ],
  },

  {
    category: "Dates & Time",
    title: "The Age Calculator: Every Situation Where Your Exact Age Actually Matters",
    intro: [
      "Age seems simple, you were born on a certain date and you count the years. But the moment a specific number of years, months, or days is required for a legal, financial, or medical purpose, the calculation becomes precise. How many days old is a newborn? How many complete months have elapsed in a lease agreement? What is someone's exact age in years and months for a legal document? These aren't questions most people need to answer daily, but when they come up, they need to be exactly right.",
      "The TrufflShuffl Age Calculator computes age in years, months, weeks, and days from any date to any other date. It's useful for personal milestone tracking, legal and administrative calculations, lease and contract date differences, and anywhere an exact age or time interval is needed. This guide covers the practical contexts where this precision matters most.",
    ],
    sections: [
      {
        heading: "When Your Exact Age Matters Legally",
        paragraphs: [
          "South Africa's legal system, like most, attaches specific rights and obligations to age thresholds. The most significant is majority, South African law sets the age of majority at 18. On the day you turn 18, you can vote, enter into contracts without parental consent, marry without parental permission, and are fully responsible for your own legal acts. The day before your 18th birthday, you're still a minor in the eyes of the law.",
          "For many legal purposes, the exact date of reaching a threshold matters, not just the year. Someone turning 18 in December is a minor in November, even if they're in the same school year as someone who turned 18 in January. If you're working with legal documents, affidavits, or anything that requires confirmation of majority, the Age Calculator gives you a precise date-based answer.",
          "The Children's Act defines different categories of children with different rights at different ages. Children can consent to medical treatment at 12. The age of sexual consent is 16 in South Africa. Learner driver licences are available at 17. These aren't just numbers, the exact date of reaching each threshold has administrative and legal consequences.",
        ],
      },
      {
        heading: "How the Age Calculator Works",
        paragraphs: [
          "The calculator takes a date of birth and a reference date (defaulting to today's date) and breaks down the difference into complete years, remaining months, and remaining days. This three-part breakdown, for example, '34 years, 7 months, and 12 days', is more precise than a simple year count and is the format required on many official forms.",
          "It also outputs the age in weeks and in total days, which are useful for different contexts. A 6-month-old baby is approximately 26 weeks old, and paediatric development milestones are often tracked by weeks rather than months for the first two years. A lease that expires after 730 days runs for exactly two years. A financial product that matures in 1,095 days matures in exactly three years, regardless of how many leap years fall within that period.",
          "You can set the reference date to any date, future or past. If you want to know how old someone was at a historical event, or what age you'll be on a future date, the calculator handles both. This is useful for planning: if a specific product or service requires a minimum age of 25 and you're 24 today, the calculator tells you exactly when you qualify.",
        ],
      },
      {
        heading: "Age Milestones in South Africa",
        paragraphs: [
          "Beyond the legal age of majority at 18, several other milestones are significant in South Africa's regulatory framework. At 16, children can start receiving a driver's learner's licence and, in some contexts, legally work in non-hazardous employment with parental consent. At 21, some financial products and services historically used this as a threshold, though it now carries less legal significance than 18.",
          "The South African Social Security Agency (SASSA) administers a range of grants with age-based eligibility. The Old Age Grant becomes available at 60 for women (previously 55, adjusted over time) and 60 for men. The Disability Grant requires qualifying under 60. The Child Support Grant is available for children under 18 in the care of a primary caregiver who meets income thresholds. For all of these, the exact date of reaching the qualifying age determines when applications can be submitted.",
          "Pension and retirement fund rules also depend on precise age calculations. Most South African retirement funds allow members to retire from age 55 (some earlier with specific conditions), but tax treatment differs depending on whether you've reached 55 at the time of withdrawal. The Age Calculator is useful for planning these milestones months in advance.",
        ],
      },
      {
        heading: "Contract and Lease Date Differences",
        paragraphs: [
          "Beyond personal age, the date difference function is useful for any scenario where you need the exact interval between two dates. Lease agreements are a common example. A 12-month lease signed on 15 March runs until 14 March of the following year, but a 365-day lease signed on the same date runs until 14 March in a non-leap year and 14 March of the following year minus one day in a leap year. These are technically different, and for commercial leases with break clauses or escalation triggers tied to specific intervals, the distinction matters.",
          "Fixed-term employment contracts, loan agreements, insurance policies, and service agreements all have start and end dates that may need to be verified precisely. If a supplier gives you 30 days from invoice date to pay, and the invoice is dated on a Friday, the due date isn't just 'a month later', it's the specific date 30 days from the invoice date, which the calculator gives you immediately.",
          "In property law, the date of transfer (when ownership passes from seller to buyer) triggers various timelines, municipal notice requirements, transfer duty payment deadlines, and occupation date calculations if these are linked to transfer rather than to a fixed date. The calculator makes verifying these timelines simple.",
        ],
      },
      {
        heading: "For Parents: Tracking Age in Weeks and Months",
        paragraphs: [
          "The first two years of a child's life are tracked far more precisely than any subsequent period. Paediatric growth charts use weeks for the first three months, then months up to 24 months, and years thereafter. When a nurse or paediatrician asks how old a baby is, the answer 'three and a half months' is less useful than '15 weeks, 2 days', which is what the calculator provides.",
          "Developmental milestones (rolling over, sitting, crawling, first words) are benchmarked by week and month. Vaccination schedules follow specific age criteria, the 6-week vaccinations should happen at exactly 6 weeks, not 'about a month and a half.' The calculator removes the arithmetic from these conversations so you can focus on the child.",
          "Growth percentile charts also use exact age in months. If you're plotting a child's weight on the Road to Health chart and they're 8 months and 3 weeks old, using 8 months versus 9 months when reading the chart gives you a different percentile reading. The Age Calculator's output in months and remaining days helps you pick the right point on the chart.",
        ],
      },
      {
        heading: "Anniversary and Milestone Planning",
        paragraphs: [
          "Beyond formal and legal contexts, the Age Calculator is simply useful for planning. How many days until a 50th birthday? What day of the week is a 25th wedding anniversary? If a company was founded on a specific date, when does it reach its 10-year anniversary? These are questions the calculator answers instantly.",
          "The week-count output is useful for pregnancy tracking, pregnancies are measured in weeks, and 40 weeks is the standard full term. Knowing you're 28 weeks and 4 days pregnant is more informative than 'about 7 months.' Similarly, the days-from-reference output is used in some cultural and religious contexts to count specific intervals from significant dates.",
        ],
      },
      {
        heading: "Time Zones and Scheduling Across Borders",
        paragraphs: [
          "South Africa operates on SAST (South African Standard Time), which is UTC+2. There's no daylight saving time in South Africa, which simplifies local calculations but can create confusion when dealing with international counterparts. The UK operates on GMT (UTC+0) in winter and BST (UTC+1) in summer. New York is UTC-5 in winter and UTC-4 in summer. When scheduling meetings or determining when a contract signed in the US becomes effective in South Africa, these offsets matter.",
          "The World Clock on the TrufflShuffl homepage shows current times in major cities, which is useful for quickly determining the offset between your location and any other timezone. Combined with the Age Calculator's date arithmetic, you can determine not just what date a document was signed, but what the equivalent local time and date was.",
        ],
      },
    ],
    faqs: [
      {
        q: "At what age does a person become a legal adult in South Africa?",
        a: "18 years of age, according to the Children's Act (Act 38 of 2005). On your 18th birthday, you gain full legal capacity to enter contracts, vote, marry without parental consent, and are fully responsible for your own legal acts.",
      },
      {
        q: "How is age calculated when the birth month hasn't been reached yet in the current year?",
        a: "The calculator counts complete years (only if your birthday has already passed in the current year), then complete months beyond that, then remaining days. If you were born on 20 November 1990 and today is 5 August 2025, you are 34 years, 8 months, and 15 days old, not 35.",
      },
      {
        q: "Can the calculator tell me what day of the week a future date falls on?",
        a: "Indirectly, it shows the number of days from today to any future date. To find the day of the week, count forward from today's known day using the day count. Many calendar apps also show this directly.",
      },
      {
        q: "How are leap years handled in date difference calculations?",
        a: "The calculator accounts for leap years automatically. When calculating intervals that cross 29 February in a leap year, that day is included in the count. This is particularly important for contract durations expressed in days.",
      },
      {
        q: "What is the minimum age to access the SASSA Old Age Grant?",
        a: "The Old Age Grant is available to South African citizens and permanent residents aged 60 or older who meet the means test. The age threshold was previously 65 for men and 60 for women; it was equalised at 60 for both.",
      },
      {
        q: "When do paediatric growth charts switch from weeks to months?",
        a: "WHO growth standards typically track infants in weeks from birth to 13 weeks (3 months), then switch to months up to 24 months, and years thereafter. Your paediatrician or clinic may follow a slightly different convention; the Age Calculator can output the age in any unit.",
      },
      {
        q: "How do I calculate the exact number of days in a lease period?",
        a: "Enter the lease start date as the date of birth and the end date as the reference date. The calculator shows the total number of days in the interval, accounting for leap years, which is the legally relevant figure if the lease specifies a number of days rather than months.",
      },
      {
        q: "What time zone is South Africa in?",
        a: "South Africa uses South African Standard Time (SAST), which is UTC+2. South Africa does not observe daylight saving time, so this offset is constant throughout the year.",
      },
      {
        q: "At what age can a learner driver's licence be obtained in South Africa?",
        a: "At 17 years of age. A learner's licence allows you to drive under the supervision of a licensed driver. A professional driving permit (PrDP) has additional age requirements depending on the vehicle category.",
      },
      {
        q: "Can I calculate how old someone was at a historical event?",
        a: "Yes. Enter the person's date of birth as the birth date and the date of the historical event as the reference date. The calculator will show their exact age at that date in years, months, and days.",
      },
    ],
  },

  {
    category: "Fashion",
    title: "Online Shopping and International Sizing: How to Get It Right the First Time",
    intro: [
      "Buying clothes and shoes online from international retailers is one of the most common sources of fashion frustration. You order what you think is your size, it arrives, and it either won't go on or fits like a tent. International sizing systems weren't designed to be compatible with each other, they developed independently in the UK, the US, Europe, and elsewhere, using different base measurements and size labels. A UK 14, a US 10, and a European 42 all refer to roughly the same size, but the exact fit varies by brand, country of manufacture, and garment type.",
      "The TrufflShuffl Fashion calculators, Clothing Size, Shoe Size, and Belt & Ring Size, provide conversion charts across the major sizing systems. This guide explains how each calculator works, how to take accurate measurements, and how to apply the results to real shopping decisions.",
    ],
    sections: [
      {
        heading: "Why Online Shopping Gets Sizing Wrong",
        paragraphs: [
          "The fundamental problem is that clothing sizes are labelled, not measured. A label says 'Medium' or '42' or '14', but what body measurements that corresponds to varies enormously. There's no international standard requiring that a size 12 from one brand fits the same body as a size 12 from another. Vanity sizing (making sizes run larger so shoppers feel good about the number) has shifted sizing systems further in recent decades, meaning a size 10 today often corresponds to what was a size 12 or 14 in the 1980s.",
          "International retailers complicate this further. A size 'M' on an Asian-manufactured garment often runs significantly smaller than a European or American 'M'. A UK 16 is not the same as a US 16. European 40 in shoes is not the same as UK 6.5 or US 7. The conversion tables in the TrufflShuffl calculators are based on standard size chart equivalencies, they give you the label to look for in each system, but fit still depends on the specific brand and cut.",
          "The most reliable approach to online sizing is to ignore the label size entirely and compare your body measurements directly against the garment's size guide. Most reputable international retailers provide a size guide with the measurements (in cm or inches) for each size in their specific range. Measure yourself, compare to their chart, and order accordingly, even if the resulting size label seems unfamiliar.",
        ],
      },
      {
        heading: "How to Measure Yourself Accurately",
        paragraphs: [
          "For clothing, the three primary measurements are: chest/bust (the fullest part of the chest, measured horizontally around the body), waist (the narrowest part of the torso, usually about 2 cm above the navel), and hips (the fullest part of the hips and seat, usually 20–23 cm below the waist). Inseam length (from the crotch to the ankle) is needed for trousers. Shoulder width (from the end of one shoulder to the other across the back) is useful for jackets and structured tops.",
          "Use a soft measuring tape (the kind used in tailoring, not a rigid builder's tape). Measure in your underwear or a fitted layer, standing straight and relaxed. Don't pull the tape tight or let it sag, it should lie flat against the body without compressing. Have someone help if measuring the back or the fullest part of the hips.",
          "Measurements fluctuate slightly depending on the time of day and your posture. Take each measurement twice and use the average. If you're between two sizes on a brand's chart, consider the garment type: for structured items (blazers, formal shirts), size up; for stretchy items (jersey dresses, knitwear), sizing down is often appropriate.",
        ],
      },
      {
        heading: "Clothing Sizes: Translating Between UK, US, and EU",
        paragraphs: [
          "South Africa generally uses UK sizing for women's and children's clothing, which is the system you'll see at most local retailers. When shopping from US or European brands, the conversion table is the starting point.",
          "For women: UK size 8 is approximately US 4 and EU 36. UK 10 is US 6 and EU 38. UK 12 is US 8 and EU 40. UK 14 is US 10 and EU 42. UK 16 is US 12 and EU 44. These conversions are consistent across most brands, though the fit within a size will vary.",
          "For men: UK and US sizes for shirts, trousers, and suits are often expressed in body measurements (chest in inches, waist in inches) rather than labelled sizes, making conversion more straightforward. A men's medium in most US brands corresponds to a chest of 38–40 inches and is labelled 'M' in both UK and US markets. European men's suits use chest measurement directly, a European 48 corresponds to a UK/US 38.",
          "Children's sizing is even less standardised, age ranges are used as labels, but children of the same age vary enormously in size. When shopping for children online, always use the height and weight measurements to find the right size on the specific retailer's chart rather than relying on age ranges.",
        ],
      },
      {
        heading: "Shoe Sizes: The Most Confusing Conversion of All",
        paragraphs: [
          "Shoe sizing involves three completely different systems: UK (based on historical barleycorn measurements), US (which differs between men and women by 1.5 sizes), and European (based on the Paris Point, which is one-third of a centimetre). South Africa primarily uses UK sizing.",
          "A UK men's size 9 is EU 43 and US 10. A UK women's 7 is EU 40 and US 9. Women's US sizes run 1.5 sizes larger than UK, which is why a UK 7 women's is a US 9, not 8. This asymmetry is one of the most common sources of online shoe ordering errors.",
          "When shopping internationally, the safest approach is to measure your foot length in centimetres and match to the retailer's own size guide. Foot length for a UK men's 9 is approximately 27.5 cm; for a UK women's 7, approximately 25.4 cm. Foot width is usually not captured in standard sizing (width categories like B, D, E, and EE are used by some brands for wide-fit ranges).",
          "Athletic shoes and running shoes often come with their own sizing nuances. Many runners size up 0.5 from their regular shoe size to allow toe room during long runs. If you're buying running shoes without trying them on, check the brand's size guide rather than assuming your usual size transfers.",
        ],
      },
      {
        heading: "Belt Sizing: It's Simpler Than You Think",
        paragraphs: [
          "Belt sizes are measured in inches (in UK and US markets) or centimetres (European markets), and they refer to the length of the belt to the middle hole, not the total belt length. The general rule: buy a belt 2 inches (or 5 cm) larger than your trouser waist size. If you wear 32-inch waist trousers, buy a 34-inch belt.",
          "The Belt & Ring Size Calculator converts between inches and centimetres and provides both the trouser waist to belt size conversion and the direct measurement approach, measuring the existing belt from the fold to the middle hole, or measuring the waist directly with a tape. Either input gives you the right belt size to order.",
          "Belt widths are not captured in size charts, they vary from narrow (2 cm) formal belts to wide (4–5 cm) casual leather belts. This is a style choice rather than a sizing one, but it's worth noting that some belt loops are designed for specific widths and may not accommodate a very wide belt.",
        ],
      },
      {
        heading: "Ring Sizing: Getting It Exactly Right",
        paragraphs: [
          "Ring sizes are notoriously difficult to get right from a distance, which matters most when ordering engagement rings or gifts. UK and South African ring sizes use letters (J through Z+); US and Canadian sizing uses numbers (4 through 13); European sizing uses circumference in millimetres.",
          "The most accurate home method is to wrap a strip of paper around the finger, mark where it overlaps, and measure the length of that strip, that's the circumference of the finger. Divide by 3.14159 to get the diameter in millimetres. From there, the calculator maps the measurement to the corresponding UK letter size and US number size.",
          "Ring size varies throughout the day and with temperature, fingers are typically smallest in the morning when cold and largest in the late afternoon after activity. For an accurate ring size, measure in the late afternoon on a day of average temperature. If the finger knuckle is significantly wider than the base, size for the knuckle (the ring needs to pass over it), and look for rings that can be sized down slightly or fitted with a resizing clip.",
        ],
      },
      {
        heading: "Sizing for Children: A Different Approach Entirely",
        paragraphs: [
          "Children's clothing sizes are particularly inconsistent because they're marketed by age but should be chosen by measurement. A 5-year-old who's tall for their age wears a different size from a 5-year-old of average height. Most reliable children's retailers now offer size guidance by height in centimetres, which is a far more useful reference than age.",
          "For shoes, children's sizes run from EU 16 (approximately 9 cm foot length) through EU 38/39, where they merge with adult sizing. UK children's sizes run from 0 to 13.5 before switching to adult sizes. Getting children's shoes right is more important than adults' because ill-fitting shoes during growth affect foot development, always measure foot length before ordering and check the retailer's size guide.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a South African clothing size the same as a UK size?",
        a: "Generally, yes. South African retailers have historically followed UK sizing conventions for most clothing categories. When shopping locally, you should find that your usual size corresponds to the UK size in the conversion chart.",
      },
      {
        q: "A garment fits at the hips but is too small at the waist, should I size up?",
        a: "If possible, yes, and then have a tailor take in the waist. Sizing for the largest measurement point (usually hips or chest) and adjusting elsewhere is usually easier and less expensive than letting out a too-small garment. Many fashion retailers also sell separates or adjustable waistbands for exactly this reason.",
      },
      {
        q: "Why does a US women's shoe size 9 correspond to a UK 7?",
        a: "US and UK shoe sizes for women are offset by 1.5 sizes, with US running larger. This is a historical convention with no logical modern basis, it's simply how the two systems developed. Always check the conversion chart rather than assuming a direct relationship.",
      },
      {
        q: "How do I measure my ring size at home?",
        a: "Wrap a thin strip of paper around the base of the finger, mark where it overlaps, and measure the length of the strip in millimetres, that's the circumference. Divide by π (3.14159) to get the diameter. Match to the ring size chart in the calculator.",
      },
      {
        q: "Should I buy a shoe half-size up for online purchases?",
        a: "It depends on the shoe type. For formal shoes and everyday footwear, your standard size is usually correct. For running shoes or shoes that will be worn with thick socks, going half a size up is common advice. When in doubt, check if the retailer has a generous returns policy.",
      },
      {
        q: "What does EU ring size mean?",
        a: "European (EU) ring sizes are measured in circumference in millimetres, which is why they appear as larger numbers (EU 50 = approximately UK L = US 5.75). The circumference measurement is the most direct: measure the finger, read the EU size directly.",
      },
      {
        q: "Do men's and women's belts use the same size chart?",
        a: "The measurement method is the same (add 2 inches/5 cm to trouser waist), but the sizes are sold separately and often in different increments. Women's belts tend to come in a broader range of widths and styles. The calculation is the same for both.",
      },
      {
        q: "Why does clothing from Asian retailers run small?",
        a: "Body measurement averages differ by region, and size labels are calibrated to local averages. Clothing sized for the average Korean or Chinese consumer uses smaller base measurements than clothing sized for the average European or South African consumer. Always size up or use the measurement chart rather than going by label size.",
      },
      {
        q: "What's the difference between US and EU children's shoe sizes?",
        a: "US children's sizes run from Toddler (T) sizes (1–10T) through Little Kid (K) sizes (10.5–3) through Big Kid sizes (3.5–7), before merging with adult sizes. EU sizes run continuously. A US 10T is approximately EU 27; a US 5 (big kid) is approximately EU 37.",
      },
      {
        q: "How often do sizing standards change?",
        a: "Infrequently in terms of official standards, but brands adjust their sizing regularly, this is why 'your size' from one collection might not fit the same way in the next season. Always check measurements rather than relying on size labels from previous purchases, especially when buying from a new brand.",
      },
    ],
  },

  {
    category: "Unit Conversions",
    title: "Unit Conversions in Plain Language: A Complete Guide to the Converter",
    intro: [
      "Unit conversion comes up in more situations than most people expect. A recipe from an American food blog uses cups and ounces when you're working in millilitres and grams. An imported product's specs are in pounds per square inch and you need bar. A property listing gives square footage when you think in square metres. A child's height is described in feet and inches at the doctor in the US but recorded in centimetres at the local clinic. These conversions are simple in principle and tedious in practice, which is exactly what the TrufflShuffl Unit Converter is built to handle.",
      "The converter covers 12 measurement categories with 76 conversion pairs, each with a formula, a results table, and a live calculator. This guide explains the most important conversion categories, why each system exists, and when you're most likely to need each type of conversion in everyday South African life.",
    ],
    sections: [
      {
        heading: "Two Systems, One World",
        paragraphs: [
          "Most countries have adopted the International System of Units (SI), which is the modern, standardised version of the metric system. South Africa adopted metric in 1970. The SI system is coherent, its units relate to each other in powers of ten, making conversions within the system straightforward. Converting metres to kilometres is a matter of moving a decimal point.",
          "The United States, Myanmar, and Liberia are the only countries that haven't fully adopted metric as their primary measurement system. The US Customary system (a descendant of the British Imperial system) uses miles, feet, inches, pounds, gallons, and Fahrenheit, none of which relate to each other in any logical mathematical way. Twelve inches in a foot, three feet in a yard, 1,760 yards in a mile. Eight pints in a gallon, but a US pint is different from a UK pint. This system persists primarily because of the enormous cost of changing ingrained habits across a continental economy.",
          "The practical consequence is that South Africans encounter imperial units primarily through American media, products, and websites, recipes, car specs, imported goods, building materials, and occasionally through interactions with Zimbabwean or Zambian contexts where older UK conventions persist. The converter handles all of these crossings efficiently.",
        ],
      },
      {
        heading: "Length: The Conversions You'll Use Most",
        paragraphs: [
          "Metres and kilometres are the everyday length units in South Africa. Road distances, property boundaries, and most construction measurements use metric. The conversions you'll need most often are with miles (for interpreting American road distances or treadmill settings), feet and inches (for height, ceiling heights, and imported door frames), and centimetres to inches (for screen sizes, luggage dimensions, and body measurements).",
          "Key reference points: 1 kilometre is 0.6214 miles; 1 mile is 1.6093 kilometres. 1 foot is 30.48 centimetres; 1 inch is 2.54 centimetres exactly. Screen sizes are measured diagonally in inches in most markets, a 55-inch TV is 139.7 cm across the diagonal.",
          "The less common length conversions in the TrufflShuffl tool, nautical miles, yards, and millimetres, come up in specific contexts. Nautical miles are used in aviation and maritime navigation. Yards appear in American football dimensions and sometimes in American-sourced fabric quantities. Millimetres are the standard unit in engineering drawings, precision machining, and many construction specifications.",
        ],
      },
      {
        heading: "Weight: Kilograms, Pounds, and Everything In Between",
        paragraphs: [
          "South Africa uses kilograms as the primary unit of mass for almost everything, body weight, food packaging, cargo, and produce. The most common conversion need is to pounds (for products sourced from the US or for interpreting American body weight references), and to grams or milligrams (for cooking and medicine).",
          "1 kilogram is 2.2046 pounds. 1 pound is 453.6 grams. A useful shortcut: multiply kilograms by 2.2 for an approximate pound equivalent. A 70 kg person weighs approximately 154 pounds.",
          "Troy ounces (oz t) are a distinct unit used exclusively for precious metals, gold, silver, platinum. One troy ounce is 31.1 grams, compared to a standard (avoirdupois) ounce of 28.35 grams. When you see gold prices quoted in US dollars per ounce, that's per troy ounce. The weight conversions in the Unit Converter use standard (avoirdupois) ounces unless otherwise specified.",
          "Stones are a British unit of body weight (1 stone = 14 pounds = 6.35 kg) that persists in informal usage in the UK and sometimes in South African conversations with older British-influenced generations. If you encounter weight expressed in stones and pounds, the converter handles this combination.",
        ],
      },
      {
        heading: "Temperature: Celsius, Fahrenheit, and Kelvin",
        paragraphs: [
          "South Africa uses Celsius as its temperature scale universally, weather forecasts, cooking instructions, medical contexts, and industrial applications. The US uses Fahrenheit. Kelvin is used in scientific and engineering contexts and is the SI base unit for temperature.",
          "The conversion from Celsius to Fahrenheit is: F = (C × 9/5) + 32. From Fahrenheit to Celsius: C = (F − 32) × 5/9. A few reference points worth memorising: 0°C = 32°F (water freezes), 100°C = 212°F (water boils), 37°C = 98.6°F (normal body temperature), 180°C = 356°F (typical baking temperature, American recipes often specify 350°F, which is 177°C).",
          "Kelvin is Celsius plus 273.15, with no negative values (0 K is absolute zero, −273.15°C). You're unlikely to encounter Kelvin outside of chemistry, physics, or engineering contexts, but the converter handles all three scales.",
        ],
      },
      {
        heading: "Volume: Litres, Gallons, and Cooking Measures",
        paragraphs: [
          "Volume conversions are common in cooking (when using American recipes that specify cups, fluid ounces, or pints), in fuel context (miles per gallon versus litres per 100 km), and in industrial applications (pool chemicals, paint coverage, liquid cargo).",
          "1 litre is 0.264 US gallons; 1 US gallon is 3.785 litres. Note that US and UK gallons are different, a UK gallon is 4.546 litres, larger than the US gallon. Most modern references to 'gallons' in international commerce mean US gallons.",
          "Cooking volume: 1 US cup is 236.6 ml; 1 tablespoon is 14.8 ml; 1 teaspoon is 4.9 ml. South African standard metric measurements use 250 ml for a cup and 5 ml for a teaspoon, which means American and South African tablespoons and cups are marginally different. For most recipes the difference is negligible, but in baking where precision matters, it's worth knowing.",
        ],
      },
      {
        heading: "Speed, Data, Pressure, and Energy",
        paragraphs: [
          "Speed conversions are needed when dealing with international specifications, American cars rated in mph, UK speed limits in mph, aviation speeds in knots. 1 mph is 1.609 km/h; 1 knot is 1.852 km/h. Speed limits on South African highways are 120 km/h, approximately 74.6 mph.",
          "Digital data units, kilobytes, megabytes, gigabytes, terabytes, are used constantly but often misunderstood. The prefix system works in powers of 1,000 (by SI convention) or powers of 1,024 (in computing memory). A 1 TB hard drive is 1,000 GB in marketing terms, but only about 931 GB in the operating system's binary measurement. The converter uses the SI convention (1,000-based), which is how storage is marketed and how internet speeds are measured.",
          "Pressure: bar and psi (pounds per square inch) are the main conversion pair. Tyre pressure in South Africa is sometimes given in bar, sometimes in psi, and sometimes in kPa. 1 bar = 100 kPa = 14.504 psi. Standard car tyre pressure is typically 30–35 psi, or 2.1–2.4 bar.",
          "Energy: kilojoules and kilocalories (food calories) are the nutrition conversion pair, South African food labelling uses kJ (and sometimes kCal alongside). 1 kilocalorie = 4.184 kilojoules. A 2,000-calorie daily diet is approximately 8,368 kJ. Kilowatt-hours (kWh) to megajoules is the energy conversion relevant to electricity, 1 kWh = 3.6 MJ.",
        ],
      },
      {
        heading: "When These Conversions Actually Matter",
        paragraphs: [
          "The Unit Converter is most valuable in specific real-world situations: interpreting American recipes, understanding imported product specifications, comparing vehicle fuel economy across markets, reading international news about sports or weather, and verifying measurements when purchasing online from international retailers.",
          "For South Africans, some conversions come up routinely: Celsius to Fahrenheit (when using American-sourced cooking apps or when travelling), kilograms to pounds (when checking in at airports with baggage weight limits expressed in pounds, or when corresponding with US-based family), and kilometres to miles (when using older road maps or American GPS apps).",
          "The 76 conversion pairs available in the tool cover the full range, from the everyday to the technical. Each conversion page also shows a reference table of common values (e.g., 1 through 100 km in miles), which is useful as a quick-reference without needing to enter each value manually.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why are there two different gallon measurements, US and UK?",
        a: "The US gallon (3.785 litres) and the UK gallon (4.546 litres) diverged when the US adopted its own customary measurement system after independence, codified in 1832. Most modern global references to 'gallon' in commerce and fuel economy mean US gallons.",
      },
      {
        q: "Is 1 kilobyte equal to 1,000 bytes or 1,024 bytes?",
        a: "By SI convention, 1 kilobyte = 1,000 bytes. In binary computing memory, 1 kibibyte (KiB) = 1,024 bytes. Storage manufacturers use the SI convention (1,000-based), which is why a '1 TB' drive shows as about 931 GB in your operating system, which uses the binary convention.",
      },
      {
        q: "What is a nautical mile and when is it used?",
        a: "A nautical mile (1.852 km) is based on one minute of arc of latitude on the Earth's surface. It's used in maritime and aviation navigation because it relates directly to geographic coordinates, making chart calculations straightforward. Speed in nautical miles per hour is called a 'knot.'",
      },
      {
        q: "What is the exact conversion from Celsius to Fahrenheit?",
        a: "F = (C × 9/5) + 32. For quick estimates, multiply Celsius by 2 and add 30, this is less accurate but useful for mental arithmetic. To convert Fahrenheit to Celsius: C = (F − 32) × 5/9.",
      },
      {
        q: "Why does my phone show storage in GB but the manufacturer spec says different GB?",
        a: "Manufacturers measure storage in decimal gigabytes (1 GB = 1 billion bytes). Your operating system measures in binary gibibytes (1 GiB ≈ 1.074 billion bytes). A 128 GB phone actually has 128,000,000,000 bytes of storage, which the OS displays as about 119 GiB. Both numbers are correct, they use different unit definitions.",
      },
      {
        q: "What unit is used for tyre pressure in South Africa?",
        a: "Petrol stations and tyre fitters in South Africa use kPa (kilopascals) or bar most commonly, though older gauges may show psi. Standard passenger car tyre pressure is typically 200–240 kPa (2.0–2.4 bar or 30–35 psi). Check your vehicle's door jamb for the manufacturer's recommended pressure.",
      },
      {
        q: "How many calories are in a kilojoule?",
        a: "1 kilocalorie (food calorie, written as kcal or Cal) = 4.184 kilojoules. South African food labels are required to list both kJ and kCal. A typical 2,000 kCal daily intake is approximately 8,368 kJ.",
      },
      {
        q: "Is a US cup the same as a South African cup?",
        a: "Not exactly. A US cup is 236.6 ml. A South African metric cup is 250 ml. The difference is about 5.7%, which is negligible in most cooking but can matter in precision baking. When using American recipes, be aware your 'cup' is slightly larger than theirs.",
      },
      {
        q: "How do I convert miles per gallon to litres per 100 km?",
        a: "Divide 282.5 by the MPG figure to get L/100km. A car rated at 35 MPG is approximately 8.1 L/100km. This is a US MPG conversion; for UK MPG (which uses the larger UK gallon), divide 282.5 by the MPG and multiply by (4.546/3.785) ≈ divide 235 by the UK MPG figure.",
      },
      {
        q: "Why do some countries still use the imperial system?",
        a: "Primarily the United States, where the cost and disruption of switching an entire economy, road signs, product labelling, consumer education, industrial standards, has made full metrication politically and economically impractical despite multiple attempts. The UK completed a partial conversion and uses a hybrid: metric for science and industry, but miles on road signs and pints for draught beer.",
      },
    ],
  },
];
