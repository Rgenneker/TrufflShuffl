import type { PageGuide } from "@/components/CalculatorPageGuide";

export const CALCULATOR_GUIDES: Record<string, PageGuide> = {

  gst: {
    title: "GST Calculator: Complete Guide",
    intro: [
      "GST (Goods and Services Tax) is a broad-based consumption tax levied on most goods and services in countries including Australia (10%), New Zealand (15%), Canada (5%), Singapore (9%), and India (multiple rates). Whether you are a business owner invoicing clients, a freelancer quoting project fees, or a consumer trying to understand a receipt, this calculator handles the three core GST tasks: adding GST to a net price, removing GST from a gross price, and isolating the GST component from a total.",
      "This guide explains how the calculations work, what each mode does, which rate to use for your country, and how GST interacts with invoicing requirements. All calculations apply equally whether you call it GST, HST (Canada), or any equivalent consumption tax in your jurisdiction.",
    ],
    sections: [
      {
        heading: "Three Modes: Add, Remove, and Split",
        paragraphs: [
          "Add GST is for when you have a net (ex-GST) price and need to calculate the GST-inclusive price to charge your customer. Example: you charge $500 for a service. At 10% GST: $500 × 1.10 = $550 GST-inclusive. This is the mode to use when building a quote or invoice from your base rate.",
          "Remove GST is for when you have a gross (GST-inclusive) price and need to extract the net price and GST component separately. Example: you receive a $550 invoice and need to know how much is GST for your accounts. Net = $550 ÷ 1.10 = $500. GST = $550 − $500 = $50. This is critical for businesses registered for GST input tax credits — you can only claim back the actual GST component, not the full amount.",
          "Split GST produces the same result as Remove GST — both start from a gross amount and return the net and GST breakdown. Use whichever label makes more intuitive sense for your workflow. The mathematics behind both is identical: divide the gross by (1 + rate) to get the net, and subtract net from gross to get the GST.",
        ],
      },
      {
        heading: "GST Rates by Country",
        paragraphs: [
          "Australia: 10% on most goods and services. Introduced 1 July 2000. Administered by the ATO. Most fresh food, medical services, and educational services are GST-free. Financial services are input-taxed (GST applies to the margin, not the full amount). Businesses with annual turnover over AUD 75,000 must register for GST.",
          "New Zealand: 15% on virtually all goods and services. One of the broadest-base GST systems in the world — very few exemptions. Businesses with annual turnover over NZD 60,000 must register. New Zealand's GST is also applied to imported goods and services, including digital services from offshore suppliers.",
          "Canada: The federal GST is 5%. However, most provinces combine it with a provincial sales tax into the Harmonised Sales Tax (HST): Ontario and Maritime provinces charge 13–15% HST; British Columbia, Saskatchewan, and Manitoba have separate 5% GST and provincial taxes. Quebec has the QST (9.975%) alongside GST. Use the combined rate for your province when calculating total tax on a purchase.",
          "Singapore: 9% as of 2024 (increased from 8% in January 2024, and from 7% to 8% in 2023). Registered businesses with annual taxable turnover above SGD 1 million must register for GST. India: GST replaced multiple state taxes in 2017. India uses a tiered system: 0% (essential goods), 5% (basic necessities), 12%, 18% (standard rate for most goods and services), and 28% (luxury items). Use the rate specific to the good or service category in question.",
        ],
      },
      {
        heading: "GST and Business Invoicing",
        paragraphs: [
          "In Australia and New Zealand, a GST-registered business must issue a tax invoice for supplies over AUD/NZD 82.50 (inc. GST). The tax invoice must show the seller's ABN (Australia) or GST number (NZ), the amount of GST included (or the statement that the price is GST-inclusive), and the date. A recipient cannot claim an input tax credit without a valid tax invoice.",
          "The standard presentation on a business invoice is to show the net amount, a separate GST line, and the gross total — exactly the format this calculator's results section produces. For a service invoiced at $1,000 net: Line item $1,000.00 + GST $100.00 = Total $1,100.00. This makes it unambiguous to the recipient which portion is GST and claimable as an input tax credit.",
          "When you receive a supplier invoice, use the Remove GST mode to verify the GST amount matches what the supplier has stated. If the supplier has made a calculation error and the amounts do not reconcile, your input tax credit claim may be disallowed on audit. A quick check with this calculator before paying and lodging takes seconds.",
        ],
      },
      {
        heading: "Input Tax Credits and the GST Cycle",
        paragraphs: [
          "GST is a value-added tax: each business in the supply chain collects GST from its customers and remits it to the tax authority, but can offset (credit) the GST it paid on its own business inputs. The net effect is that GST is paid only on the value added at each stage, and the final consumer bears the entire GST cost.",
          "For a GST-registered business: GST payable = GST collected on sales − GST paid on business purchases (input tax credits). If you collected $10,000 in GST from customers and paid $6,000 in GST on business purchases and expenses, you remit $4,000 to the tax authority. If input credits exceed collected GST in a period (common in early-stage businesses with high setup costs), you receive a refund.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I calculate GST in Australia?",
        a: "To add 10% GST: multiply the net amount by 1.10. To find the GST component in a gross amount: divide the gross by 11 (which equals gross ÷ 1.10 × 0.10). To remove GST from a gross amount: divide by 1.10. Example: a $330 GST-inclusive price contains $330 ÷ 11 = $30 of GST, and the net price is $300.",
      },
      {
        q: "What is the formula to extract GST from a GST-inclusive price?",
        a: "GST amount = Gross ÷ (1 + rate) × rate, which simplifies to Gross × rate ÷ (1 + rate). For 10%: GST = Gross × 0.10 ÷ 1.10 = Gross ÷ 11. For 15%: GST = Gross × 0.15 ÷ 1.15 = Gross ÷ 7.667. For 5%: GST = Gross × 0.05 ÷ 1.05 = Gross ÷ 21. The net amount is simply Gross − GST.",
      },
      {
        q: "What is the difference between GST and VAT?",
        a: "GST and VAT are economically identical consumption taxes — both are collected at each stage of the supply chain, with businesses crediting the tax they paid on inputs against the tax they collect on sales, so only the final consumer bears the full tax. The name differs by country: GST in Australia, New Zealand, Canada, Singapore, and India; VAT in the UK, EU, South Africa, and most of the world. The calculator works for both — simply enter the applicable rate.",
      },
      {
        q: "Does GST apply to all goods and services in Australia?",
        a: "No. GST-free categories in Australia include: most basic food (fresh fruit, vegetables, bread, meat, milk — but not restaurant meals or hot takeaway food); medical, health, and dental services; educational courses and childcare; exports; certain financial supplies; and water, sewerage, and drainage services. Input-taxed supplies (no GST charged, but no input credit either) include residential rental, financial services, and precious metals.",
      },
      {
        q: "When do I need to register for GST in Australia?",
        a: "You must register for GST if your annual GST turnover is AUD 75,000 or more (or AUD 150,000 for non-profit bodies). For ride-share and taxi drivers, registration is compulsory from the first dollar of income, regardless of turnover. Voluntary registration below the threshold is possible and beneficial if you have significant business input costs with GST you want to claim back.",
      },
      {
        q: "How is Canadian GST different from HST?",
        a: "The federal GST is 5% across Canada. The Harmonised Sales Tax (HST) combines federal GST and a provincial sales tax into a single tax collected and remitted to the federal government. HST provinces (Ontario 13%, Nova Scotia/PEI/New Brunswick/Newfoundland 15%) use HST in place of separate GST and PST. Other provinces (BC, Saskatchewan, Manitoba, Quebec) retain separate GST and provincial taxes. For Canadian calculations, use the combined rate applicable in the province of sale.",
      },
      {
        q: "Can I claim GST back on all business purchases?",
        a: "No. You can only claim input tax credits on purchases made for a creditable business purpose. Non-creditable purchases include: private or domestic use, entertainment expenses (subject to FBT — partially or fully non-deductible), purchases from non-GST-registered suppliers (no GST charged, so nothing to claim), and GST-free or input-taxed purchases. Keep tax invoices for all creditable purchases — the ATO requires them for any input tax credit claim.",
      },
      {
        q: "Why does dividing a GST-inclusive amount by 1.10 give the net, not multiplying by 0.90?",
        a: "Because GST at 10% was added to the net price, not to the gross. If the net was $100, GST of $10 was added to give a gross of $110. To reverse this: $110 ÷ 1.10 = $100. If you multiplied $110 by 0.90 instead, you'd get $99 — wrong. The 0.90 approach would only be correct if the 10% was calculated on the gross (it is not). Always divide by (1 + rate) to reverse GST.",
      },
      {
        q: "Do I need to charge GST to overseas clients?",
        a: "Generally, exports of goods and cross-border services to overseas clients are GST-free in Australia and New Zealand (zero-rated). This means you charge 0% GST on the invoice, but you can still claim input tax credits on related business costs. The rules for digital services and intangibles vary — both Australia and NZ require offshore digital service providers to register and charge local GST to local consumers if turnover exceeds the threshold. Check the ATO or IRD guidelines for your specific service type.",
      },
    ],
  },

  investment: {
    title: "Investment Calculator: Complete Guide",
    intro: [
      "Putting money to work is one of the most important financial habits you can build, yet most people have only a vague sense of how their money actually grows. This guide explains when an investment calculator is genuinely useful, walks through every input on TrufflShuffl's Investment Calculator, and gives you enough background on how investments work to make confident decisions rather than guessing.",
      "Whether you are deciding between a fixed deposit and a unit trust, planning how much to invest monthly to reach a specific target, or simply curious about the difference between simple and compound interest, this page has the answers. Real South African examples and SARS-relevant considerations are included throughout.",
    ],
    sections: [
      {
        heading: "When Should You Use an Investment Calculator?",
        paragraphs: [
          "The clearest time to open an investment calculator is when you are comparing two or more options and need to see actual rand amounts, not just percentages. For instance, if your bank offers a 9.5% fixed deposit and a competing platform offers 9.2% in a money market fund with monthly compounding, the calculator shows you the difference in rands over your chosen period so you can make a fact-based decision.",
          "It is also valuable when you are setting a goal and working backward. Say you want R500,000 for a property deposit in seven years. The calculator tells you exactly how much to invest each month at your expected rate to hit that figure, which is far more practical than a rough mental estimate.",
          "Another good time to use it is before making a lump-sum investment. A retrenchment payout, an inheritance, or proceeds from selling an asset can feel overwhelming without context. Plugging the amount into the calculator and adjusting the term and rate gives you a realistic picture of where that money could be in five, ten, or twenty years.",
          "Finally, use the calculator any time you are reviewing an existing investment and want to check whether actual performance is tracking the original projection. If your stated return was 11% per year and the calculator shows your balance should be higher than what your statement shows, that gap deserves investigation.",
        ],
      },
      {
        heading: "How to Use TrufflShuffl's Investment Calculator",
        paragraphs: [
          "Start by selecting your currency. South African users will keep it at ZAR, but the calculator handles any world currency so it is useful if you are investing in US dollar-denominated assets or comparing performance across currencies.",
          "Enter the principal amount. This is the lump sum you are starting with. If you are starting fresh with no lump sum and only making monthly contributions, enter zero here. If you have both a starting amount and monthly contributions, enter both.",
          "Set the annual interest rate. Use the annual rate quoted by the institution or product. For unit trusts, use the average expected return, often around 8 to 12 percent per year for a balanced fund in South Africa. For a fixed deposit at a major bank in mid-2025, rates typically fall between 8.5 and 10.5 percent per year depending on the term.",
          "Choose the investment term in years. The calculator handles anything from one to forty years. For retirement planning, use the number of years to your planned retirement age. For a medium-term goal like a vehicle or education, use the actual time available.",
          "Select whether interest compounds monthly, quarterly, or annually. Most South African savings products compound monthly, so that is the most common setting. Fixed deposits sometimes compound at maturity (annually). Unit trusts and retirement annuities effectively compound continuously through reinvested growth.",
          "Enter the monthly contribution if you plan to add money regularly. This single field often has the biggest impact on the final value, especially over long periods, because of how contributions accumulate on top of each other with compounding.",
          "Choose between simple and compound interest. Compound interest is the default for almost all investment products. Simple interest is mainly used for short-term instruments or when you want to understand the base calculation without the compounding effect.",
          "Click Calculate and review the results. The calculator shows your total value, total contributions, and total interest or growth earned. The chart shows growth over time so you can see the acceleration that compounding produces in later years.",
        ],
      },
      {
        heading: "Compound vs Simple Interest: Why It Matters More Than You Think",
        paragraphs: [
          "Simple interest calculates return only on the original principal. If you invest R100,000 at 10% simple interest for 10 years, you earn R10,000 per year and end up with R200,000. The calculation is straightforward and the growth is linear.",
          "Compound interest calculates return on the principal plus all previously earned interest. The same R100,000 at 10% compounded annually grows to R259,374 after 10 years. That extra R59,374 comes purely from earning interest on interest. The gap widens dramatically over longer periods: after 20 years, simple interest gives you R300,000 while compound interest gives you R672,750.",
          "The compounding frequency matters too. Monthly compounding versus annual compounding on the same 10% rate produces different results because with monthly compounding you are effectively earning 0.833% each month, which then compounds again the following month. Over time, monthly compounding consistently outperforms annual compounding at the same stated rate.",
          "The Rule of 72 is a quick mental check you can use without a calculator: divide 72 by the annual interest rate to get the approximate number of years it takes to double your money. At 9% per year, your money doubles roughly every 8 years. At 12%, it doubles every 6 years. This rule only applies to compound interest.",
        ],
      },
      {
        heading: "Investment Products in South Africa",
        paragraphs: [
          "South Africa has a well-developed investment market with options ranging from bank-issued fixed deposits to listed exchange-traded funds. Understanding the main categories helps you use the investment calculator with realistic inputs.",
          "Fixed deposits at major South African banks currently offer between 8.5% and 11% per year depending on the amount and term. The rate is guaranteed, which makes them low-risk, but the money is locked in for the agreed period with penalties for early withdrawal. They are suitable for short-term goals of one to three years where capital preservation is the priority.",
          "Money market funds are collective investment schemes that invest in short-term debt instruments. They offer better liquidity than fixed deposits and currently yield around 8.5 to 9.5 percent per year for retail investors. They are not guaranteed but are very low risk historically.",
          "Unit trusts (also called mutual funds) spread money across a basket of shares, bonds, or property. A balanced fund typically targets returns of 3 to 5 percentage points above inflation, which in the current South African environment means 11 to 14 percent per year over rolling five-year periods, though actual returns vary. Equity funds can return more or less than this in any given year.",
          "Retirement annuities (RAs) are tax-efficient long-term investment vehicles regulated under the Pension Funds Act. Contributions are deductible from taxable income up to 27.5% of the greater of taxable income or remuneration, capped at R350,000 per year. Investment growth is tax-free within the fund. These are the primary vehicle for retirement savings outside of employer pension funds.",
          "Tax-Free Savings Accounts (TFSAs) allow contributions of up to R36,000 per year, with a lifetime limit of R500,000. Growth, dividends, and withdrawals are completely tax-free. They are excellent for medium to long-term investing if you want maximum flexibility alongside tax efficiency.",
        ],
      },
      {
        heading: "Industries That Use Investment Calculations Daily",
        paragraphs: [
          "Financial advisors use investment calculators constantly when preparing proposals for clients. The Financial Sector Conduct Authority (FSCA) requires that advisors provide clients with projected values under different scenarios, making accurate projection tools essential.",
          "Corporate treasury teams in South Africa use investment modeling to manage cash reserves. When a company holds R50 million in working capital, deciding whether to place it in a call account or a 30-day fixed deposit requires knowing the exact rand difference over the expected holding period.",
          "Human resources and employee benefits teams use investment projections when communicating pension fund performance to employees. Showing someone how their current fund balance will grow to retirement age, with different contribution scenarios, is a powerful tool for improving savings rates.",
          "Property developers use investment calculations to model equity returns on projects. If a R20 million development is expected to sell for R28 million in 18 months, the annualised return needs to be compared against alternative uses of that capital.",
          "Individual investors preparing for retirement are the largest group of users. The transition from working income to living off investments is one of the most significant financial events in a person's life, and getting the numbers right in advance gives people the confidence to make good decisions years before they need to.",
        ],
      },
      {
        heading: "Worked Examples with Real South African Numbers",
        paragraphs: [
          "Example 1: A 35-year-old invests a R200,000 retrenchment payout into a balanced unit trust expected to return 11% per year, compounded monthly, and adds R3,000 per month until age 65. After 30 years, the total value would be approximately R12.4 million. Total contributions (lump sum plus monthly) amount to R1.28 million. The remaining R11.12 million is investment growth. This is the power of starting early with compound growth.",
          "Example 2: The same 35-year-old delays starting for just five years. At 40, they invest R200,000 with the same R3,000 monthly contributions. With only 25 years to grow, the total at 65 drops to approximately R7.1 million. The five-year delay costs R5.3 million in final value, despite total contributions being only R300,000 less.",
          "Example 3: A couple wants to save R500,000 for a deposit on a holiday home within 8 years. They invest R150,000 now in a fixed deposit at 10% compounded monthly. After 8 years, that grows to approximately R332,000. To reach R500,000 they also need monthly contributions. Adding R1,500 per month at the same rate gets them to roughly R498,000. A slight increase to R1,550 per month comfortably reaches the target.",
          "Example 4: Comparing a TFSA versus a taxable investment. If you invest R36,000 per year into a TFSA returning 10% for 13 years (reaching the R500,000 lifetime cap), the full growth and withdrawals are tax-free. In a taxable account, dividends are subject to 20% dividends tax and any profit above the annual R40,000 capital gains exclusion is taxed. Over 20 years, the tax-free compounding in a TFSA can mean tens of thousands of rands in additional wealth.",
        ],
      },
      {
        heading: "Common Mistakes to Avoid",
        paragraphs: [
          "Using nominal returns without adjusting for inflation is one of the most common errors. If your investment returns 10% per year but inflation averages 5%, your real purchasing power only grows at roughly 5% per year. For retirement planning especially, think in real (inflation-adjusted) terms. The calculator shows nominal values, so compare the final amount to today's prices after adjusting for inflation.",
          "Underestimating the impact of fees. A unit trust charging 1.5% per year in total expense ratio (TER) versus one charging 0.5% sounds like a small difference, but on R1 million over 20 years that difference in fees costs approximately R800,000 in lost growth. Always enter the net-of-fees return in the calculator.",
          "Confusing nominal and effective annual rates. A 10% rate compounded monthly has an effective annual rate of 10.47%. Most investment products quote nominal rates, while the calculator gives you actual results using the compounding frequency you select. Make sure you are consistent.",
          "Not accounting for tax on interest income. South Africans have an annual interest exemption: R23,800 per person (R34,500 for those over 65) in the 2024/25 tax year. Any interest above this is added to your taxable income and taxed at your marginal rate. For high earners, after-tax returns on interest-bearing accounts can be significantly lower than the stated rate.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between compound and simple interest?",
        a: "Simple interest is calculated only on the original principal, so R100,000 at 10% earns R10,000 every year regardless of how long it has been invested. Compound interest adds each period's earnings to the principal before calculating the next period's return, so your interest also earns interest. Over long periods, the difference is enormous.",
      },
      {
        q: "How often should interest compound for the best results?",
        a: "More frequent compounding always produces a better outcome at the same stated rate. Monthly compounding gives you slightly more than quarterly, which gives more than annual. In practice, most South African savings accounts and money market funds compound daily or monthly.",
      },
      {
        q: "What is a realistic annual return for a South African balanced unit trust?",
        a: "Over rolling ten-year periods, a well-managed SA balanced fund has historically returned between 9 and 13 percent per year, with 11 percent being a commonly used planning assumption. Individual years can vary widely, including negative returns, which is why a ten-year or longer horizon is recommended for equity-based investments.",
      },
      {
        q: "How much can I contribute to a Tax-Free Savings Account each year?",
        a: "The annual contribution limit is R36,000, with a lifetime limit of R500,000. If you exceed the lifetime cap, SARS imposes a 40% tax on the excess contribution. The limit applies per individual, so a married couple can each contribute R36,000 per year into their respective TFSAs.",
      },
      {
        q: "Can I use this calculator to project my retirement annuity balance?",
        a: "Yes. Enter your current RA balance as the principal, your expected monthly contribution, and the annual return you expect from the underlying fund (typically 9 to 12 percent for a growth portfolio). Set the term to the number of years until you plan to retire. The result gives you a planning estimate, not a guarantee.",
      },
      {
        q: "How does inflation affect my investment target?",
        a: "Inflation erodes purchasing power over time. R1 million today will buy significantly less in 20 years if inflation averages 5 to 6 percent per year, which has been typical in South Africa. When setting a target in the calculator, think about how much you actually need in today's rands and then multiply by a suitable inflation factor for the number of years involved.",
      },
      {
        q: "What is the difference between a nominal and effective interest rate?",
        a: "The nominal rate is the stated annual rate. The effective rate is the actual return after accounting for compounding within the year. A 12% nominal rate compounded monthly has an effective annual rate of 12.68%. Most South African products quote nominal rates. The calculator handles the compounding for you, so you just need to enter the nominal rate and select the compounding frequency.",
      },
      {
        q: "Should I invest a lump sum all at once or spread it out?",
        a: "Mathematically, investing a lump sum immediately gives the entire amount more time to compound, which produces better outcomes on average. In practice, many people prefer spreading it out (rand-cost averaging) because it reduces the risk of investing everything just before a market drop. Both strategies are valid depending on your risk tolerance and the type of investment.",
      },
      {
        q: "What fees should I account for when using the calculator?",
        a: "Always use a net-of-fees return. For a unit trust, subtract the total expense ratio (TER) and any advice fees from the expected gross return. If a fund targets 13% gross and has a 1.5% TER, enter 11.5% as your rate. Overlooking fees is one of the biggest reasons real outcomes fall short of projections.",
      },
      {
        q: "Can I model a scenario where I stop contributing at some point?",
        a: "The calculator currently models a consistent monthly contribution throughout the investment term. For a scenario where you contribute for ten years and then leave the balance to grow for another ten years without contributions, run the calculation in two stages: first find the balance after ten years of contributions, then use that balance as the principal for the second ten-year period with zero monthly contributions.",
      },
    ],
  },

  loan: {
    title: "Loan Calculator: Complete Guide",
    intro: [
      "Taking out a loan without understanding the full cost is one of the most expensive financial mistakes you can make. A loan calculator does not just give you a monthly repayment figure. It shows you the total amount you will pay over the life of the loan, breaks down how much goes to interest versus principal each month, and lets you test the impact of extra payments before you commit to anything.",
      "This guide explains when to use the loan calculator, how every input works, what the outputs mean, and how to use the results to negotiate better terms or choose between competing offers. South African lending regulations, typical interest rates, and real worked examples are included.",
    ],
    sections: [
      {
        heading: "When to Use a Loan Calculator",
        paragraphs: [
          "Use it before you apply. Many South Africans sign loan agreements without working out the total repayment amount. The monthly payment looks manageable but the total interest over 48 or 60 months can add up to more than a third of the original loan. Knowing this upfront changes how you approach the decision.",
          "Use it when comparing offers. If Bank A offers R100,000 at 18% over 48 months and Bank B offers 17.5% over 60 months, the monthly payments look different but the total cost comparison is what actually matters. The calculator gives you both figures instantly.",
          "Use it to test extra payment scenarios. Adding a few hundred rand to your monthly payment can cut months off the term and save thousands in interest. The calculator shows this directly in the 'Extra Payment' field, which is one of the most useful features for anyone who wants to get out of debt faster.",
          "Use it if you are restructuring debt. Consolidating multiple loans into one often makes sense, but you need to check whether the longer term on the consolidation loan means you pay more total interest even at a lower rate. The calculator helps you see both sides of that trade-off.",
        ],
      },
      {
        heading: "How to Use the Loan Calculator Step by Step",
        paragraphs: [
          "Select your currency and loan type. The loan type selection helps set a realistic context, but the calculation itself works the same regardless. Vehicle finance, personal loans, student loans, and business loans all use the same amortization formula.",
          "Enter the loan amount. This is the principal you are borrowing, not the total repayment. For a vehicle, it is the purchase price minus your deposit, plus initiation fees if you are financing those. For a personal loan it is typically the amount deposited into your account.",
          "Enter the annual interest rate. In South Africa, personal loan rates are linked to the prime lending rate, which was 11.25% in mid-2025. Personal loans typically run at prime plus 5 to 12 percentage points, so 16.25 to 23.25% per year. Vehicle finance tends to be lower, often prime plus 1 to 4 percent. Home loans are the cheapest, usually around prime plus 0 to 2 percent.",
          "Set the term in months. Standard personal loan terms are 12 to 60 months. Vehicle finance runs from 12 to 72 months. Home loans are typically 240 or 300 months (20 or 25 years). Longer terms lower your monthly payment but increase total interest paid.",
          "Enter any extra monthly payment. Even R200 extra per month on a R100,000 loan at 18% over 48 months saves over R4,500 in interest and cuts the term by almost three months. Try different amounts to see the effect.",
          "Click Calculate. Review the monthly payment, total interest, and total repayment figures. Then look at the extra payment comparison if you entered one, and use the breakdown chart to see the interest-to-principal split over the loan's life.",
        ],
      },
      {
        heading: "How Loan Amortization Works in South Africa",
        paragraphs: [
          "Most South African loans are fully amortizing, meaning each payment covers interest first and then the remaining amount goes toward reducing the principal. In the early months of a loan, the interest portion is high because you owe a large balance. As the principal decreases, the interest portion drops and more of each payment goes toward paying down the debt.",
          "This front-loading of interest means that paying off a loan early saves disproportionately more interest than you might expect. If you settle a 48-month loan at month 24, you have paid off roughly half the months but significantly less than half the total interest, because the highest interest charges were in the early period.",
          "South African lenders are required by the National Credit Act to disclose the total cost of credit before you sign. This includes the principal, total interest, initiation fee, monthly service fee, and any insurance premiums that are a condition of the loan. Always check the total cost of credit figure, not just the monthly installment.",
          "Initiation fees are capped by the NCA at R1,207.50 for credit agreements above R10,000. Monthly service fees are capped at R69. These fees are relatively small but they add to the total cost and are often financed into the loan itself, meaning you also pay interest on the fees.",
        ],
      },
      {
        heading: "Understanding Interest Rates on South African Loans",
        paragraphs: [
          "The prime lending rate set by major banks is based on the South African Reserve Bank's repo rate. When the SARB raises the repo rate, the prime rate rises by the same amount, and most variable-rate loans reprice automatically. Between 2022 and 2024 the prime rate rose significantly in response to inflation, and many borrowers saw their monthly payments increase materially.",
          "Fixed-rate loans lock your rate for the full term, protecting you from prime rate increases. The trade-off is that fixed rates are typically set higher than the variable rate at the time of signing to account for the bank's interest rate risk. In a rising-rate environment, fixed-rate loans become more attractive; in a falling-rate environment, variable-rate loans benefit the borrower.",
          "Your credit score directly affects the rate you are offered. South African credit bureaus score consumers using factors including payment history, credit utilisation, and length of credit history. A high score (above 700 at most bureaus) typically qualifies you for rates closer to prime plus 3 or 4 percent. Poor credit scores can push rates above prime plus 12 percent or result in rejection entirely.",
          "The annual percentage rate (APR) or cost per annum figure disclosed in your loan agreement includes interest and all mandatory fees, expressed as a single annualised rate. This is the number to compare across products because it accounts for fees that a simple interest rate comparison might miss.",
        ],
      },
      {
        heading: "Industries That Rely on Loan Calculations",
        paragraphs: [
          "Commercial banks and credit providers in South Africa use loan calculation engines for every credit application. The affordability assessment required by the NCA checks that your monthly repayment does not exceed your disposable income after living expenses, using the same basic formula as the calculator.",
          "Vehicle dealerships and their finance and insurance (F&I) managers use loan calculators constantly. Every deal involves structuring a finance agreement, and the F&I manager's job is to present a monthly payment that fits the customer's budget while maximising the term and rate on behalf of the financing institution. Knowing how the calculation works puts you, the buyer, in a stronger position.",
          "Debt counsellors and financial planners use loan calculators when helping clients restructure over-indebted credit agreements. Understanding how much of each payment is interest versus principal is essential for prioritising which debts to pay down first.",
          "Small and medium enterprises use loan calculations when evaluating business finance. Whether it is an equipment finance agreement, a commercial property mortgage, or a working capital facility, the total cost of borrowing needs to be weighed against the expected return from the investment the loan is funding.",
        ],
      },
      {
        heading: "Worked Examples",
        paragraphs: [
          "Example 1: R150,000 personal loan at 20% per year over 60 months. Monthly payment: R3,970. Total repayment: R238,200. Total interest: R88,200. That is 59% of the original loan amount paid in interest. Adding an extra R500 per month reduces the term to 47 months and saves R17,800 in interest.",
          "Example 2: R280,000 vehicle finance at 14% per year (prime plus 2.75%) over 72 months. Monthly payment: R5,512. Total repayment: R396,864. Total interest: R116,864. The same vehicle financed over 48 months costs R7,480 per month but saves R28,800 in total interest.",
          "Example 3: A R500,000 debt consolidation loan at 18% over 84 months replaces four loans with combined minimum payments of R9,200 per month. The consolidation reduces the monthly payment to R9,450, but the total interest over 84 months is R294,300. The individual loans, paid aggressively at the original rate, would have cleared in 54 months and cost R180,000 in interest. The consolidation saves cash flow but costs R114,300 more in total interest.",
        ],
      },
      {
        heading: "What to Do With the Results",
        paragraphs: [
          "If the total interest figure shocks you, that is the point. Use the extra payment tool to find the minimum extra amount that brings total interest into a range you are comfortable with, then commit to that higher payment from day one.",
          "Compare the calculator output against the quote from the lender. The monthly payment should match to within a few rand, and the total repayment should be within the range disclosed in the pre-agreement quote. If there is a significant discrepancy, ask the lender to explain it before signing.",
          "Use the amortization breakdown to plan lump-sum payments. If you know you will receive a bonus in month 12, use the calculator to see exactly how much principal will remain at that point, and how much interest you would save by using the bonus to reduce the balance.",
        ],
      },
    ],
    faqs: [
      {
        q: "What interest rate should I use for a personal loan in South Africa?",
        a: "Personal loan rates in South Africa typically range from 15% to 29.5% per year (the National Credit Act caps personal loan rates). Your actual rate depends on your credit score, income, and the lender. As a planning estimate, 18 to 22% is a reasonable range for a bank personal loan to a consumer with average credit.",
      },
      {
        q: "What does 'amortization' mean?",
        a: "Amortization refers to the process of paying off a loan through regular scheduled payments that cover both interest and principal. Each payment is structured so that by the final payment the loan balance is exactly zero. In the early payments, most of the money goes to interest; in the later payments, most goes to principal.",
      },
      {
        q: "How much does an extra R500 per month actually save?",
        a: "It depends on the loan amount, rate, and term. On a R100,000 personal loan at 18% over 48 months, an extra R500 per month saves roughly R8,000 in interest and cuts the term by about 8 months. The higher the rate and the longer the original term, the bigger the saving from extra payments.",
      },
      {
        q: "Can a bank charge any interest rate it wants?",
        a: "No. The National Credit Act caps interest rates for different credit types. For personal loans the maximum is the repo rate plus 21 percentage points. For mortgage agreements it is repo plus 12 points. For credit cards it is repo plus 14 points. The current caps can change as the repo rate moves.",
      },
      {
        q: "Is it better to take a shorter term with higher payments or a longer term with lower payments?",
        a: "A shorter term always saves you more in total interest. The question is whether the higher monthly payment is affordable and whether the money you would have saved by having lower payments could be invested at a higher return than the loan interest rate. For consumer loans at 18 to 25%, it is almost always better to pay them off as fast as possible.",
      },
      {
        q: "What happens if I miss a payment?",
        a: "Missing a payment on a South African loan typically triggers a late payment fee (usually R50 to R150), and your credit bureau record is updated after 30 days of non-payment. Persistent missed payments can lead to a default listing, which makes future credit applications difficult and costly. The NCA gives you the right to apply for debt review if you are over-indebted.",
      },
      {
        q: "Can I settle my loan early?",
        a: "Yes. South African law gives you the right to settle any credit agreement early. Lenders can charge an early settlement fee of up to 90 days' interest on fixed-term loans. The NCA requires the lender to provide a settlement quote within five business days of your request. Factor in any settlement penalty when working out the true saving from early settlement.",
      },
      {
        q: "What is the difference between a secured and an unsecured loan?",
        a: "A secured loan is backed by an asset, typically a vehicle or property. If you default, the lender can repossess the asset. Because there is collateral, rates on secured loans are lower. Unsecured loans, like personal loans, have no collateral so the lender charges more to compensate for the higher risk of non-recovery.",
      },
      {
        q: "How does the loan calculator handle balloon payments?",
        a: "The current calculator models standard fully amortizing loans without balloon payments. A balloon payment structure, common in vehicle finance, means a large portion of the principal is due at the end of the term, which lowers monthly payments but leaves a significant balance to refinance or pay at the end. For balloon payment calculations, contact the lender directly for a specific amortization schedule.",
      },
      {
        q: "Should I choose vehicle finance from the dealership or my bank?",
        a: "It depends on the rate offered. Dealerships sometimes get lower rates through volume agreements with finance houses, but they also earn commission on higher rates, so the advertised 'cheap finance' offer is not always the best deal. Get a pre-approval quote from your bank first, then use that as a benchmark at the dealership. The calculator lets you compare both offers by total repayment amount.",
      },
    ],
  },

  mortgage: {
    title: "Mortgage Calculator: Complete Guide",
    intro: [
      "Buying a home is the largest financial commitment most South Africans will ever make, and the mortgage payment is just one of several costs involved. This calculator covers bond repayments, transfer duty, bond registration costs, attorney fees, and the loan-to-value ratio, giving you a complete picture of what buying a specific property will actually cost.",
      "This guide explains how South African home loans work, what all the costs involved are, how banks assess affordability, and what to do with the numbers the calculator produces. Whether you are a first-time buyer or trading up, the information here will help you approach the process with clarity.",
    ],
    sections: [
      {
        heading: "When to Use the Mortgage Calculator",
        paragraphs: [
          "Start using it before you look at properties. Setting your maximum property price based on what monthly payment you can actually afford prevents the disappointment of falling in love with a home you cannot finance. Enter your comfortable monthly budget into different interest rate scenarios to see what property price it can support.",
          "Use it when you have an offer to purchase in mind. The exact property price, your deposit amount, and the applicable transfer duty slot let the calculator give you a detailed breakdown of the purchase costs, not just the bond payment.",
          "Use it to compare different deposit sizes. A larger deposit reduces the bond amount and the monthly payment, but it also uses up cash you might otherwise invest. The calculator shows you the monthly payment difference between a 10% and 20% deposit so you can weigh the trade-off.",
          "Use it to check affordability against bank criteria. South African banks typically require that total monthly debt repayments do not exceed 30 to 35% of gross monthly income. If you earn R60,000 per month, your total debt load should ideally stay below R18,000 to R21,000 per month. The calculator helps you see whether your proposed mortgage fits within that range.",
        ],
      },
      {
        heading: "How to Use the Mortgage Calculator",
        paragraphs: [
          "Enter the property price. Use the actual purchase price from your offer to purchase, or an estimated price if you are still planning. South African property prices vary widely, from R500,000 for a modest apartment in a secondary city to R20 million or more in premium coastal or northern suburbs.",
          "Enter the deposit amount. South African banks generally require at least 10% of the purchase price as a deposit, though first-time buyers may qualify for 100% bonds in some cases. A larger deposit reduces your monthly payment and removes the need for homeowner insurance on the bond portion above 80% loan-to-value.",
          "Set the interest rate. Home loans in South Africa are priced at prime plus a margin based on risk assessment. In mid-2025, with prime at 11.25%, a standard home loan runs between 11.25% (prime plus zero for the best-qualified applicants) and 14.25% (prime plus 3%). First-time buyers with smaller deposits typically get higher rates.",
          "Set the term. Standard South African home loan terms are 20 or 25 years (240 or 300 months). Some banks offer 30-year terms in specific circumstances. A longer term reduces monthly payments significantly but increases total interest paid substantially.",
          "Review all output sections: the monthly bond repayment, the transfer duty, the bond registration costs, attorney fees, and the LTV ratio. Understanding the full upfront cost is essential for budgeting before you commit.",
        ],
      },
      {
        heading: "Transfer Duty and Purchase Costs Explained",
        paragraphs: [
          "Transfer duty is a tax payable to SARS when property changes hands in South Africa. For properties purchased for R1.1 million or less, no transfer duty is payable. Above that threshold, the rates increase progressively: 3% on the value between R1.1m and R1.375m, 6% between R1.375m and R1.925m, 8% between R1.925m and R2.475m, 11% between R2.475m and R11m, and 13% above R11m.",
          "Bond registration costs cover the fee charged by the bond attorney appointed by the bank to register the bond over the property. These are based on a government-approved fee scale linked to the bond amount. On a R1.5 million bond, expect to pay roughly R24,000 to R28,000 in bond registration costs.",
          "Transfer costs are paid to the conveyancing attorney who transfers ownership from the seller to you. These are also based on a fee scale and are separate from bond registration costs, even when the same attorney firm handles both. On a R1.5 million property, transfer attorney fees are typically around R20,000 to R25,000.",
          "There are also disbursements (document search fees, deeds office charges) and possibly a 1% bond initiation fee to the bank (on the bond amount, capped at R5,700 inclusive of VAT under standard bank policies). When you add everything up, the total upfront costs on a R2 million property purchase can be R100,000 to R150,000 above the deposit. This is the figure many first-time buyers underestimate.",
        ],
      },
      {
        heading: "How South African Banks Assess Your Mortgage Application",
        paragraphs: [
          "Banks use an affordability model based on your net disposable income after all living expenses. The National Credit Act requires a genuine inquiry into actual living costs, not just a formula. Banks look at bank statements, payslips, and existing credit obligations to determine your residual income after all commitments.",
          "The loan-to-value (LTV) ratio is the bond amount as a percentage of the property's value. Banks use an independent valuation, not the purchase price, to set this. An LTV above 80% is considered higher risk and typically attracts a higher interest rate or requires mortgage indemnity insurance.",
          "First-time buyers may qualify for a subsidy under the Finance Linked Individual Subsidy Programme (FLISP), which provides a once-off subsidy of between R35,000 and R169,000 (amounts updated periodically) to eligible buyers earning between R3,501 and R22,000 per month. The subsidy reduces the bond amount or purchase cost.",
          "Most South African banks require a homeowner's insurance policy as a condition of the bond. This insures the structure against damage. They also require life insurance or mortgage protection cover to ensure the bond can be settled if the borrower dies. You are allowed to source these independently rather than through the bank, which can save a significant amount monthly.",
        ],
      },
      {
        heading: "Industries That Use Mortgage Calculations",
        paragraphs: [
          "Property developers and estate agents use mortgage calculations to present affordability scenarios to prospective buyers. Showing a buyer that their dream home at R2.5 million requires a R27,000 monthly payment is more effective than quoting the price alone.",
          "Banks and bond originators (such as ooba and BetterBond) process thousands of home loan applications monthly. Each requires a full mortgage calculation including all costs, affordability checks, and LTV assessment.",
          "Property investors use mortgage calculations to evaluate buy-to-let decisions. The key question is whether the rental income covers the bond payment and other ownership costs, producing positive cash flow. The mortgage calculator gives the bond payment; comparing it to rental income gives an immediate read on cash flow viability.",
          "Financial planners include property in retirement and wealth-building strategies. Whether buying is better than renting depends partly on the cost of the mortgage versus the alternative of renting and investing the deposit. Mortgage calculations are central to this analysis.",
        ],
      },
      {
        heading: "Worked Examples",
        paragraphs: [
          "Example 1: First-time buyer purchasing a R1,800,000 apartment with a 10% deposit (R180,000). Bond amount: R1,620,000. At 12% per year over 20 years, the monthly payment is R17,820. Transfer duty on R1.8m is R32,400. Bond registration costs are approximately R26,000. Transfer attorney fees approximately R22,000. Total upfront cash needed: R180,000 deposit plus R80,400 in costs equals R260,400.",
          "Example 2: The same buyer increases the deposit to 20% (R360,000). Bond: R1,440,000. Monthly payment drops to R15,840, saving R1,980 per month. The LTV drops to 80%, which may qualify for a better rate. At 11.5% the monthly payment drops further to R15,340. Total saving in monthly payment versus the 10% deposit scenario: R2,480 per month, or R594,000 over 20 years.",
          "Example 3: Comparing 20-year and 25-year terms on a R1.2 million bond at 12%. Over 20 years, monthly payment is R13,215 and total interest paid is R1,971,600. Over 25 years, monthly payment is R12,643 and total interest paid is R2,592,900. The 25-year term saves R572 per month but costs R621,300 more in total interest. The 5-year reduction in term also means owning the property free and clear five years earlier.",
        ],
      },
      {
        heading: "Practical Tips Before You Apply",
        paragraphs: [
          "Get pre-qualified before house hunting. A pre-qualification letter from a bank or bond originator shows sellers you are a serious buyer and gives you a firm price range to work within. The pre-qualification uses the same mortgage calculation the formal application will use.",
          "Submit applications to multiple banks simultaneously. Different banks price home loans differently and their internal risk models produce different rate offers for the same applicant. Using a bond originator (free to you, paid by the bank) gets you quotes from all major banks at once, and you can then use the mortgage calculator to compare the offers over the full term.",
          "Budget for the hidden costs. Many first-time buyers save exactly enough for a 10% deposit and are then surprised by the additional R80,000 to R120,000 in purchase costs. Ideally, have your deposit plus all costs funded before approaching a bank.",
          "Consider making extra payments from the start. On a R1.5 million bond at 12%, adding just R1,500 extra per month reduces a 20-year term to approximately 17 years and saves R350,000 in interest. Set up a separate extra payment as a consistent habit from month one.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the minimum deposit for a home loan in South Africa?",
        a: "Most South African banks require a minimum of 10% of the purchase price as a deposit. Some banks offer 100% bonds to qualifying first-time buyers or buyers with excellent credit profiles. A larger deposit improves your chances of approval, reduces your monthly payment, and often secures a lower interest rate.",
      },
      {
        q: "How is transfer duty calculated in South Africa?",
        a: "Transfer duty is zero on properties up to R1.1 million. Above that, it follows a progressive scale: 3% on R1.1m to R1.375m, 6% on R1.375m to R1.925m, 8% on R1.925m to R2.475m, 11% on R2.475m to R11m, and 13% above R11m. The rate applies only to the portion of value in each bracket, not the full price.",
      },
      {
        q: "What is the LTV ratio and why does it matter?",
        a: "The loan-to-value ratio is the bond amount divided by the property's bank-assessed value, expressed as a percentage. An 80% LTV means you are borrowing 80% of the property's value. Higher LTV ratios represent more risk for the bank, which often results in a higher interest rate and may require mortgage indemnity insurance.",
      },
      {
        q: "What is the FLISP subsidy and do I qualify?",
        a: "FLISP (Finance Linked Individual Subsidy Programme) is a government subsidy for qualifying first-time home buyers earning between R3,501 and R22,000 per month. The subsidy amount ranges from around R35,000 to R169,000 depending on income and is paid directly to reduce the bond or purchase cost. Application is made through your bank as part of the home loan process.",
      },
      {
        q: "Should I take a 20-year or 25-year bond term?",
        a: "A 20-year term saves a significant amount of total interest and builds equity faster, but the monthly payment is higher. A 25-year term offers more breathing room in your budget. A practical middle ground is to take a 25-year term but make extra monthly payments equivalent to the 20-year payment. This gives you the flexibility of the lower minimum payment with the interest savings of the shorter term.",
      },
      {
        q: "Can I pay extra toward my home loan?",
        a: "Yes. Most South African home loans allow unlimited additional payments without penalty. Making extra payments reduces your outstanding balance, which reduces the interest charged the following month. Over time, consistent extra payments can cut years off your bond term and save hundreds of thousands in interest.",
      },
      {
        q: "What is an access bond?",
        a: "An access bond, also called a home loan with an access facility, allows you to deposit extra funds into the bond account and then draw them back out again if needed. Your interest is charged on the reduced balance (so you pay less interest), but you can access the prepaid amount later for large expenses. It functions like a combination of a home loan and a low-interest savings account.",
      },
      {
        q: "What documents do I need for a home loan application?",
        a: "Typically: a certified copy of your ID, your three most recent payslips, three months of bank statements, an offer to purchase or a description of the property, details of any other credit obligations, and proof of address. If you are self-employed, you will need your most recent two years of financial statements and tax returns instead of payslips.",
      },
      {
        q: "How long does the home loan application process take?",
        a: "From submission to formal approval, most South African banks take between five and fifteen business days. Registration of the bond at the Deeds Office typically takes a further six to eight weeks after approval, during which attorneys handle the transfer and bond registration process. The total period from acceptance of an offer to purchase to key handover is usually eight to twelve weeks.",
      },
      {
        q: "What is the difference between a bond and a mortgage in South Africa?",
        a: "In South African terminology, a 'bond' typically refers to the registered security (the mortgage bond) that the lender registers over your property as security for the loan. A 'home loan' or 'mortgage' is the loan itself. In everyday usage, the two terms are often used interchangeably. Technically, the bank holds a bond over your property as security while the home loan agreement is the debt obligation.",
      },
    ],
  },

  bond: {
    title: "Bond Calculator: Complete Guide",
    intro: [
      "In financial markets, a 'bond' means something different from the home loan bond most South Africans are familiar with. A financial bond is a fixed-income instrument issued by governments or corporations to raise money from investors. The issuer promises to pay regular interest (called coupon payments) and to return the face value of the bond at maturity.",
      "TrufflShuffl's Bond Calculator handles both financial bonds (fixed income instruments) and home loan bond calculations. This guide focuses on financial bonds, explaining how they are priced, how yield to maturity works, and how to use the calculator to evaluate RSA Government Retail Bonds or corporate bonds. It includes South African examples, relevant institutions, and practical applications across industries.",
    ],
    sections: [
      {
        heading: "When to Use a Bond Calculator",
        paragraphs: [
          "Use it when you are considering buying an RSA Government Retail Bond. The National Treasury offers retail bonds directly to South African individuals at competitive rates. The calculator shows the bond price, duration, yield to maturity, and projected coupon payments so you can compare them with alternative investments like fixed deposits or unit trusts.",
          "Use it when you see a bond trading at a discount or premium and want to understand whether it represents value. If a bond with a face value of R10,000 is trading at R9,200 in the secondary market, that is a discount. The yield to maturity at that price is higher than the coupon rate, which may or may not be attractive depending on prevailing rates.",
          "Use it when you work in treasury, asset management, or financial services and need to price, compare, or present bond valuations to clients or management.",
          "Use it to understand how changes in interest rates affect the value of bonds you already hold. Rising interest rates cause bond prices to fall; falling rates cause prices to rise. The calculator quantifies this relationship for specific bond characteristics.",
        ],
      },
      {
        heading: "How to Use the Bond Calculator",
        paragraphs: [
          "Enter the face value. This is the par value of the bond, typically R10,000 for RSA Retail Bonds or multiples of R1,000 for listed bonds. The face value is what the issuer will repay at maturity.",
          "Enter the coupon rate. This is the annual interest rate the bond pays as a percentage of face value. An RSA Retail Bond might offer a 10.5% coupon. That means a R100,000 bond pays R10,500 per year, usually in semi-annual instalments of R5,250.",
          "Enter the market interest rate (yield or discount rate). This is the current prevailing rate for comparable instruments. If you are evaluating whether a 10.5% coupon bond is good value when the current market rate for similar risk instruments is 12%, the bond will be priced below its face value (at a discount).",
          "Set the number of years to maturity. RSA Retail Bonds come in 2-year, 3-year, and 5-year fixed terms. Listed government bonds and corporate bonds have various maturities from a few months to thirty or more years.",
          "Select the coupon payment frequency. Most South African bonds pay semi-annually. Some pay quarterly or annually. The frequency affects the present value calculation because more frequent payments mean you receive cash sooner.",
          "Review the calculated bond price, yield to maturity, and coupon schedule. The price shows what the bond is worth today at the current market rate. If the market rate is higher than the coupon, the price will be below face value. If lower, the price will be above face value.",
        ],
      },
      {
        heading: "The Price-Yield Relationship",
        paragraphs: [
          "The most important concept in bond investing is that bond prices and interest rates move in opposite directions. When market interest rates rise, the fixed coupon payments of existing bonds become less attractive compared to new bonds being issued at higher rates, so the price of existing bonds falls. When rates fall, existing bonds with higher coupons become more valuable, and their prices rise.",
          "This inverse relationship is not linear; it is affected by a property called duration. Duration measures how sensitive a bond's price is to changes in interest rates. A bond with a duration of 5 years will lose approximately 5% in price for every 1 percentage point increase in market rates. Longer-maturity bonds have higher durations and therefore more interest rate sensitivity.",
          "For a South African investor holding a 5-year RSA Retail Bond, a rise in market rates from 10% to 12% will reduce the market value of that bond by approximately 8 to 10%. This does not matter if you hold to maturity, because you will still receive every coupon payment and the full face value at maturity. It only matters if you need to sell before maturity.",
        ],
      },
      {
        heading: "RSA Government Retail Bonds",
        paragraphs: [
          "The South African National Treasury issues Retail Savings Bonds directly to individuals through the RSA Retail Savings Bond website or at post offices. They come in fixed-rate and inflation-linked varieties. Fixed-rate retail bonds currently offer competitive rates compared to bank fixed deposits, and they are backed directly by the South African government.",
          "Interest can be paid to a bank account semi-annually (giving you a cash income stream) or reinvested to compound over the bond's life. The reinvestment option typically produces a higher final value because of compounding, but the cash payout option is useful for pensioners who need regular income.",
          "RSA Retail Bonds have no fees, no admin charges, and no early withdrawal penalties after a three-month initial lock-in period. After three months, you can redeem the bond early with a penalty equal to the last coupon payment.",
          "Interest earned on RSA Retail Bonds is taxable as normal income. This is unlike dividends (taxed at 20%) or capital gains (with a R40,000 annual exclusion). For high-income earners, this makes the after-tax return less attractive. Those in lower tax brackets benefit most from the headline rate.",
        ],
      },
      {
        heading: "Industries That Use Bond Calculations",
        paragraphs: [
          "Asset managers and portfolio managers at South African fund houses use bond pricing models every day. Deciding whether to buy, hold, or sell a government bond requires calculating its fair value relative to current yields and duration risk.",
          "Banks treasury departments hedge their own bond portfolios and manage duration risk. They use bond calculators to determine how a change in the yield curve affects the value of their holdings.",
          "Pension funds are large holders of South African government bonds. The Pension Funds Act requires that trustees understand the risk profile of their investments, and bond duration analysis is central to that.",
          "Corporate finance teams use bond pricing when their company issues new debt. Pricing a corporate bond involves comparing it against government bond yields (the risk-free rate) and adding a credit spread that reflects the company's creditworthiness.",
          "Individual investors planning for retirement income use bond calculations to project the cash flows from a laddered bond portfolio, where bonds mature at different dates to provide a predictable income stream.",
        ],
      },
      {
        heading: "Worked Examples",
        paragraphs: [
          "Example 1: A R50,000 RSA Retail Bond with a 10% annual coupon, paying semi-annually, with 5 years to maturity. If the current market rate is 10%, the bond trades at par (face value). Annual coupon income: R5,000. Total income over 5 years: R25,000. Total value at maturity: R75,000.",
          "Example 2: The same bond, but market rates have risen to 12% since you bought it. The bond's market price drops to approximately R46,400. If you sell now, you lose R3,600. If you hold to maturity, you still receive every coupon and your R50,000 back. The paper loss only becomes real if you sell.",
          "Example 3: You are considering buying a bond with a 9% coupon, face value R100,000, 3 years to maturity, currently trading at R95,000 (a discount). The yield to maturity is approximately 11%, which is higher than the coupon rate. If comparable instruments offer only 10%, this bond offers better value than the market average.",
        ],
      },
      {
        heading: "Common Misunderstandings About Bonds",
        paragraphs: [
          "Many people confuse the coupon rate with the yield to maturity. The coupon rate is fixed and based on the face value. The yield to maturity is the actual annual return you will earn if you buy the bond today at its current price and hold it to maturity, including both coupon payments and any gain or loss from the price difference versus face value.",
          "Bonds are not always safe. Government bonds from stable, investment-grade issuers are very low credit risk, but they still carry interest rate risk, which means their market value fluctuates. Corporate bonds carry credit risk as well, and high-yield (junk) bonds can default entirely. The South African bond market has faced periods of significant foreign investor selling during periods of sovereign rating concerns, causing yields to spike.",
          "The relationship between yield and return is sometimes misunderstood. A rising yield is bad news for existing bondholders (their prices fall) but good news for new buyers (they can buy at a higher return). Whether a yield increase is good or bad depends entirely on your position.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between a coupon rate and yield to maturity?",
        a: "The coupon rate is the fixed annual interest rate stated when the bond is issued, calculated on the face value. Yield to maturity (YTM) is the total annual return you will earn if you buy the bond at its current market price and hold it to maturity. If the bond is trading at a discount (below face value), the YTM is higher than the coupon rate.",
      },
      {
        q: "What is an RSA Retail Savings Bond?",
        a: "An RSA Retail Savings Bond is a bond issued directly by the South African government to individual investors with no intermediary fees. They come in fixed-rate and inflation-linked varieties with 2-year, 3-year, and 5-year terms. They are accessible from as little as R1,000 and are considered one of the safest investments available in South Africa.",
      },
      {
        q: "Why would a bond trade above or below face value?",
        a: "A bond trades above face value (at a premium) when its coupon rate is higher than current market rates, making it more attractive than new bonds. It trades below face value (at a discount) when its coupon rate is lower than current market rates. After issue, bond prices adjust so that the effective yield stays competitive with the market.",
      },
      {
        q: "How does duration relate to risk?",
        a: "Duration measures a bond's sensitivity to interest rate changes. A bond with a duration of 6 years will change in price by approximately 6% for every 1 percentage point change in interest rates. Longer-dated bonds have higher durations and more price volatility. Investors expecting rates to fall prefer long-duration bonds; those expecting rates to rise prefer shorter durations.",
      },
      {
        q: "Are interest payments from RSA Retail Bonds taxed?",
        a: "Yes. Interest from RSA Retail Bonds is taxed as ordinary income at your marginal tax rate, minus the annual interest exemption (R23,800 for under 65s, R34,500 for 65 and over in the 2024/25 tax year). This makes them less tax-efficient for high earners compared to equity unit trusts where growth is taxed as capital gains with a more favourable rate.",
      },
      {
        q: "What is the minimum investment in RSA Retail Bonds?",
        a: "The minimum investment is R1,000 per bond, and you can add multiples of R1,000 up to a maximum of R5 million per individual per bond type. This makes them accessible to small savers while also useful for larger capital amounts.",
      },
      {
        q: "Can I sell a bond before it matures?",
        a: "RSA Retail Bonds can be redeemed early after the initial 3-month lock-in period, with a penalty equal to the value of the last coupon payment. For listed bonds on the JSE, you can sell at any time at the current market price, which may be above or below what you paid depending on how interest rates have moved since you bought.",
      },
      {
        q: "What is a callable bond?",
        a: "A callable bond gives the issuer the right to redeem it before maturity, typically when interest rates have fallen and the issuer wants to refinance at a lower rate. This introduces reinvestment risk for the investor, who may receive their capital back at a time when they cannot find an equally good return. Callable bonds typically offer a slightly higher yield to compensate for this risk.",
      },
      {
        q: "How do inflation-linked bonds work?",
        a: "Inflation-linked bonds, including the RSA Inflation Linked Retail Savings Bond, adjust the principal in line with the Consumer Price Index (CPI). Your coupon is a fixed percentage, but it is applied to an inflation-adjusted principal. This means your purchasing power is protected, though the actual rand coupon payments vary with inflation.",
      },
      {
        q: "What credit rating does South Africa carry and does it matter?",
        a: "South Africa's sovereign credit rating is a measure of the government's ability and willingness to repay its debt. Rating agencies like Moody's, S&P, and Fitch assess South African government debt. As of 2025, South Africa is rated at sub-investment grade (junk) by most major agencies, which means some international institutional investors are restricted from holding SA bonds. This affects demand and therefore yields on government bonds.",
      },
    ],
  },

  amortization: {
    title: "Amortization Calculator: Complete Guide",
    intro: [
      "An amortization schedule shows you the full payment-by-payment breakdown of any loan: exactly how much of each installment goes to interest, how much reduces the principal, and what your outstanding balance is after every single payment. This level of detail is not just academically interesting. It is the tool that turns vague debt repayment into a specific, actionable plan.",
      "This guide explains how amortization works, how to read the schedule the calculator produces, and how to use it to plan extra payments, lump-sum payoffs, and debt acceleration strategies. South African lending examples are used throughout.",
    ],
    sections: [
      {
        heading: "When to Use an Amortization Calculator",
        paragraphs: [
          "The single best time to use an amortization calculator is when you sign any long-term loan agreement. Before accepting a home loan, vehicle finance, or personal loan, generate the full schedule and look at two figures: the outstanding balance at the halfway point of the term, and the total interest paid over the full term. These numbers motivate better financial behaviour than any general advice.",
          "Use it when planning a lump-sum payment. If you receive a bonus, tax refund, or proceeds from selling an asset and want to apply it to a loan, the amortization schedule shows you the exact balance at any future date. Plug in that extra payment at month 12 or month 24 and see how many months fall off the term.",
          "Use it when evaluating whether to refinance. Refinancing is only worthwhile if the interest saved over the new term exceeds the refinancing costs. To calculate this accurately, you need to know the exact outstanding balance and interest remaining under the current loan, which the amortization schedule provides.",
          "Use it to track progress. Looking at an amortization schedule each year and comparing it to your statement confirms whether you are on track and whether extra payments are being properly applied to the principal.",
        ],
      },
      {
        heading: "How to Read an Amortization Schedule",
        paragraphs: [
          "Each row in the schedule represents one payment period (usually one month). The columns show the payment number, the total payment amount, the interest portion of that payment, the principal portion, and the remaining balance.",
          "In the early rows, the interest column is large and the principal column is small. This is because interest is calculated on the current outstanding balance, which is highest at the beginning. As you pay down the principal, the balance drops, which means the interest on the next payment is slightly less, which means slightly more of the payment goes to principal. This creates an accelerating paydown that is subtle in the early years and pronounced in the final years.",
          "The total of all payments in the interest column gives you the total interest cost over the life of the loan. Add it to the original principal and you have the total amount repaid. This is the number that surprises most borrowers. On a 20-year R1.5 million home loan at 12%, the total interest paid is approximately R2.7 million, meaning you pay R4.2 million in total to own a property that cost R1.5 million.",
          "Comparing the principal column in early and late payments illustrates compound amortization. In month 1 of that R1.5 million bond at 12%, your R16,511 payment includes R15,000 in interest and just R1,511 in principal. In month 240 (the last payment), the split reverses: almost the entire payment reduces the principal.",
        ],
      },
      {
        heading: "The Front-Loading Principle and What It Means for You",
        paragraphs: [
          "Interest front-loading is not a trick or a scheme by lenders. It is a mathematical consequence of charging interest on the outstanding balance. You owe the most money at the start, so the interest charge is highest at the start. As you pay down the principal, the interest decreases proportionally.",
          "The practical implication is that extra payments made early in a loan's life have the highest impact. An extra R1,000 paid in month 1 reduces the principal by R1,000, which means the interest calculation for month 2 is based on a lower balance. That small difference compounds over the remaining term because each subsequent interest calculation is on a slightly lower base.",
          "Extra payments made in the final years of a loan save very little, because the principal is already small and the interest charge per payment is already minimal. This is why debt advisors consistently recommend tackling high-balance, high-rate loans aggressively early in the term, and not delaying extra payments until you have more free cash.",
          "For South African home loan holders, making one extra payment per year (a 13th payment) on a R1.5 million bond at 12% can reduce a 20-year term by approximately 3 years and save roughly R550,000 in interest. Making that extra payment as early as possible in the year has a marginally better effect than making it at year-end.",
        ],
      },
      {
        heading: "Using the Schedule to Plan Overpayments",
        paragraphs: [
          "The most effective approach to accelerated payoff is to decide on a sustainable overpayment amount and treat it like a fixed part of your monthly budget from day one. Set up a payment of the original installment plus the overpayment amount and automate it.",
          "Use the amortization calculator to simulate different overpayment amounts. Try R500, R1,000, and R2,000 extra per month and note the resulting term reduction and interest savings. This exercise often shows that small, consistent extra payments are far more impactful than occasional large ones.",
          "If you have an access bond, every rand deposited reduces the interest calculation whether or not it formally counts as an 'extra payment'. This makes access bonds extremely useful for people who receive irregular income, such as freelancers, business owners, or those who receive significant annual bonuses.",
          "Once you know the month-by-month balance from the schedule, you can also plan a specific payoff date. For example, if your children's university fees start in 5 years and you want to free up cash flow by then, use the schedule to calculate the monthly overpayment required to reduce your balance to zero by that date.",
        ],
      },
      {
        heading: "Industries and Professions That Rely on Amortization",
        paragraphs: [
          "Commercial banks use amortization schedules for every loan they issue. The schedule forms the basis of borrower statements, and the system-generated schedule is the reference against which all payments and adjustments are tracked.",
          "Debt counsellors in South Africa use amortization schedules to restructure credit agreements under the National Credit Act. When a consumer enters debt review, the counsellor renegotiates repayment plans with creditors and needs accurate schedules for each obligation to set a feasible total monthly payment.",
          "Financial planners and wealth managers include amortization analysis when reviewing a client's overall debt position. Understanding exactly when different liabilities will be settled is important for projecting future cash flow and adjusting investment contributions over time.",
          "Commercial property and business finance professionals use amortization to model cash flow for income-producing properties. Knowing the exact principal reduction in each period affects depreciation calculations and tax planning.",
          "Accountants use amortization data to correctly record loan obligations on the balance sheet, separating the current portion (principal due in the next 12 months) from the long-term portion. This requires the same schedule the calculator produces.",
        ],
      },
      {
        heading: "Worked Example: Full Schedule Summary",
        paragraphs: [
          "R800,000 personal loan at 18% per year over 60 months. Monthly payment: R20,327. Month 1: interest R12,000, principal R8,327, balance R791,673. Month 12: interest R11,005, principal R9,322, balance R726,036. Month 30: interest R8,437, principal R11,890, balance R551,248. Month 48: interest R4,941, principal R15,386, balance R312,670. Month 60 (final): interest R304, principal R20,023, balance zero. Total interest paid: R419,620. Total repaid: R1,219,620 on an original loan of R800,000.",
          "If R2,000 extra is paid every month from day one, the loan clears in month 48 instead of month 60. Total interest paid: R311,800. Saving: R107,820. The extra payments total R96,000 (R2,000 x 48), but because they reduce the interest-bearing balance throughout, the saving is R107,820, which is more than the total extra amount contributed.",
          "If a R50,000 lump sum is paid at month 12 (after receiving a tax refund), the outstanding balance drops from R726,036 to R676,036. The term reduces from 60 months to approximately 52 months, and total interest falls from R419,620 to roughly R370,000. That single early lump sum saves R50,000 in interest and removes 8 months from the term.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between an amortizing loan and an interest-only loan?",
        a: "An amortizing loan requires payments that cover both interest and principal, so the balance decreases with every payment and reaches zero at the end of the term. An interest-only loan requires only interest payments; the full principal is due at the end. Interest-only loans are common in some commercial property financing and bridging loans, but unusual in South African consumer lending.",
      },
      {
        q: "How does an extra payment get applied to my loan?",
        a: "This depends on your lender. In some South African home loans, extra payments first go toward any arrears, then fees, then interest, and only then to principal. Always instruct your lender in writing that any additional payment must be applied directly to the principal balance. Without this instruction, some lenders apply it as a payment in advance and continue accruing interest on the same balance.",
      },
      {
        q: "What happens to my amortization schedule if the interest rate changes?",
        a: "Variable-rate loans, including most South African home loans, reprice when the prime lending rate changes. When rates rise, your monthly payment increases to cover the higher interest. The amortization schedule effectively restarts from your current balance at the new rate. Use the calculator with the new rate and your current outstanding balance to generate an updated schedule.",
      },
      {
        q: "Is it worth paying off my home loan early versus investing?",
        a: "It depends on the interest rate on your home loan versus the expected after-tax return from investing. If your home loan costs 12% per year and you can earn 14% investing net of fees and tax, investing has a slight mathematical edge. Practically, paying down your home loan is a guaranteed risk-free return equal to the loan rate, which is an excellent outcome. Most financial planners suggest a balanced approach: maintain extra payments on the home loan while also investing.",
      },
      {
        q: "How is the monthly interest calculated on a South African home loan?",
        a: "South African home loans use daily interest calculated on the daily outstanding balance, then debited to the account monthly. The daily rate is the annual rate divided by 365. This means a shorter month results in slightly less interest charged than a longer month on the same balance, which is why monthly statements sometimes vary by a few rand.",
      },
      {
        q: "What is a 'payment holiday' and how does it affect amortization?",
        a: "A payment holiday is an arrangement where the lender suspends or reduces loan payments for a defined period, often offered during financial hardship. During the holiday, interest continues to accrue on the outstanding balance, which increases the balance. After the holiday, payments resume at either the original level (extending the term) or a higher level (keeping the original term). Payment holidays increase total interest cost.",
      },
      {
        q: "Can I calculate amortization for a business loan?",
        a: "Yes. The same amortization formula applies to business loans, commercial property bonds, and equipment finance. Business loan terms are often shorter (3 to 7 years) and rates vary widely depending on risk, security, and the type of facility. Enter the loan amount, rate, and term and the schedule works the same way regardless of the loan purpose.",
      },
      {
        q: "What is negative amortization?",
        a: "Negative amortization occurs when the minimum payment on a loan is not enough to cover the full interest charge. The unpaid interest is added to the principal, causing the balance to grow rather than shrink. This can happen with certain types of variable-rate mortgages, student loans with deferred payments, or short-term loans with very high rates. South African consumer loans are generally structured to avoid negative amortization.",
      },
      {
        q: "How do I find my current outstanding balance without the schedule?",
        a: "Your most recent monthly statement shows the current balance. Alternatively, your bank's online banking platform typically shows the current outstanding balance in real time. If you have access bond, remember that the balance shown may reflect additional deposits that have not yet been formalized as principal reductions.",
      },
      {
        q: "Does an amortization schedule change if I restructure my loan?",
        a: "Yes. Any restructuring, including a change in rate, term extension, or debt review renegotiation, generates a new amortization schedule starting from the current outstanding balance. Old schedules become obsolete as soon as the terms change. Always regenerate the schedule whenever the loan terms are modified.",
      },
    ],
  },

  vat: {
    title: "VAT Calculator: Complete Guide",
    intro: [
      "Value Added Tax (VAT) touches nearly every transaction in the South African economy. Whether you are a business owner invoicing clients, a consumer checking a till slip, or an accountant reconciling tax returns, understanding how VAT works and being able to quickly add or remove it from any amount is a fundamental financial skill.",
      "This guide covers the mechanics of South African VAT, explains what is taxable and what is not, walks through how to use the TrufflShuffl VAT Calculator correctly, and provides worked examples across different business contexts.",
    ],
    sections: [
      {
        heading: "When to Use a VAT Calculator",
        paragraphs: [
          "Use it when you receive a quote excluding VAT and need to know the total you will actually pay. Contractors and B2B service providers often quote exclusive of VAT, which means the invoice will be higher. If you are budgeting for building work and the quote is R120,000 excluding VAT, the actual invoice will be R138,000.",
          "Use it when you are pricing your own products or services. If you want to receive R50,000 for a project, and you are VAT-registered, you need to quote R57,500. Many new business owners make the mistake of quoting R50,000 inclusive of VAT, which means they remit R7,500 to SARS and only keep R42,500 for their actual work.",
          "Use it for quick reconciliation when a customer queries an invoice. Being able to instantly verify a VAT amount builds trust and avoids billing errors that can damage client relationships.",
          "Use it in retail and hospitality to check that VAT is being calculated correctly on point-of-sale systems. It is not uncommon for system errors or pricing mistakes to result in incorrect VAT calculations, which then need to be corrected in your VAT return.",
        ],
      },
      {
        heading: "How to Use the VAT Calculator",
        paragraphs: [
          "Select whether you want to add VAT to an amount (calculate how much an amount becomes with VAT included) or remove VAT from an amount (find the original amount before VAT was added).",
          "Enter the amount. For 'add VAT', enter the pre-VAT (exclusive) amount and the calculator shows you the VAT amount and the total including VAT. For 'remove VAT', enter the total amount you paid (VAT-inclusive) and the calculator shows you what the original price was before VAT was added and how much of what you paid was VAT.",
          "The VAT rate defaults to 15%, which is the current South African standard rate. The calculator also supports other VAT rates for international contexts (such as Kenya's 16%, UK's 20%, or European rates from 20 to 27%).",
          "Review the results. Both the VAT amount and the total (or exclusive) amount are displayed. For most South African use cases, the result is straightforward: 15% of the exclusive amount added to the exclusive amount gives the inclusive amount.",
        ],
      },
      {
        heading: "South African VAT: The Basics Every Business Owner Needs",
        paragraphs: [
          "VAT was introduced in South Africa in 1991 at 14%, replacing a general sales tax. It was increased to 15% in April 2018. There is no indication of further rate changes in the near term, though debates resurface periodically. South Africa's VAT rate is lower than many comparable developing and developed economies.",
          "You are required to register for VAT if your taxable turnover in any consecutive 12-month period exceeds R1 million. You may voluntarily register if your turnover exceeds R50,000. Voluntary registration is often worthwhile because it allows you to claim input VAT on business purchases, which reduces your net VAT liability and effectively gives you back the VAT your business pays on its own expenses.",
          "VAT-registered vendors charge output VAT on their sales and can claim input VAT on business purchases. The net amount owed to SARS is the output VAT collected minus the input VAT paid. If input VAT exceeds output VAT (common in export businesses or businesses that invest heavily), SARS will refund the difference.",
          "VAT returns are submitted bi-monthly for most businesses or monthly for those with turnover above R30 million. The deadline is the last business day of the month following the end of the VAT period, or the 25th if filing electronically via eFiling. Late payment attracts penalties and interest.",
        ],
      },
      {
        heading: "Zero-Rated, Exempt, and Standard-Rated Supplies",
        paragraphs: [
          "Not everything attracts VAT at 15%. South Africa has three categories. Standard-rated supplies are taxed at 15%. Zero-rated supplies are technically subject to VAT but at a rate of zero percent; the supplier still files VAT returns and can claim input VAT, which makes zero-rating a benefit for exporters and suppliers of essential goods. Exempt supplies fall outside the VAT system entirely; suppliers do not charge VAT, but they also cannot claim input VAT.",
          "Zero-rated items include basic food items (brown bread, dried beans, unprocessed vegetables, rice, milk, eggs, cooking oil, pilchards in tins, and a few others), certain agricultural supplies, exports of goods, and international passenger transport. The list is specific and not all 'food' is zero-rated. Prepared food, luxury items, and restaurant meals are standard-rated.",
          "Exempt supplies include residential rental income, certain financial services (interest on loans, life insurance), and public road and rail transport. If you provide exempt services, you cannot claim input VAT on your related business costs, which is a meaningful cost for businesses in these sectors.",
          "Understanding whether your supplies are standard-rated, zero-rated, or exempt is critical for pricing, VAT returns, and deciding whether voluntary registration makes financial sense. A business that primarily sells zero-rated goods benefits from registration (input VAT refunds) while a business providing only exempt services has no incentive to register.",
        ],
      },
      {
        heading: "Industries That Work with VAT Daily",
        paragraphs: [
          "Retailers of all sizes deal with VAT on every transaction. Modern POS systems automate the calculation, but business owners still need to understand what their liability is and how to handle exceptions (like zero-rated items sold alongside standard-rated items in a single transaction).",
          "The construction and property industry faces complex VAT rules. New residential properties are zero-rated if sold by a property developer. Commercial property purchases attract VAT. Transfer duty and VAT are mutually exclusive: you pay one or the other, not both, depending on whether the seller is a VAT vendor.",
          "Professional services firms (accountants, lawyers, consultants) invoice exclusively excluding VAT and must ensure that every client invoice correctly states the VAT amount separately. Errors on VAT invoices must be corrected with credit notes, not by simply issuing an amended invoice.",
          "Hospitality and restaurants have a particular challenge because tips are not subject to VAT but the restaurant account is. Staff gratuities should not be included in the taxable turnover when calculating VAT.",
          "Exporters can zero-rate their exports and claim back input VAT, making VAT a significant cash flow positive for businesses that sell goods or services internationally. This requires proper documentation including proof of export.",
        ],
      },
      {
        heading: "Worked Examples",
        paragraphs: [
          "Example 1: A freelance graphic designer quotes R25,000 for a project, exclusive of VAT. The client receives an invoice for R25,000 plus R3,750 VAT equals R28,750. The designer pays R3,750 to SARS and keeps R25,000 net. If the designer incorrectly quotes R25,000 inclusive and later registers for VAT, they owe R3,261 to SARS (the VAT content of R25,000 inclusive = R25,000 x 15/115) and only keeps R21,739 for their work.",
          "Example 2: A restaurant owner calculates monthly VAT. Gross turnover (inclusive of VAT): R350,000. Output VAT: R350,000 x 15/115 = R45,652. Input VAT on food, drinks, and supplies: R18,000. Net VAT payable to SARS: R45,652 minus R18,000 equals R27,652.",
          "Example 3: A company purchases R500,000 worth of equipment including VAT of R65,217 (R500,000 x 15/115). The company is VAT-registered and can claim the R65,217 as input VAT. Net cost of equipment: R434,783. The VAT recovery improves the effective purchase price by 13%.",
        ],
      },
      {
        heading: "Common VAT Mistakes and How to Avoid Them",
        paragraphs: [
          "Not separating VAT on invoices is a compliance issue. Every VAT invoice must show the supplier's VAT registration number, the tax period, the VAT amount as a separate line, and the total inclusive and exclusive amounts. Without a valid VAT invoice, the buyer cannot claim input VAT.",
          "Claiming input VAT on non-business expenses is a common audit finding. VAT on entertainment, personal motor vehicle costs, and meals is generally not claimable. Staff subsistence allowances and travel reimbursements have specific rules. When in doubt, consult your accountant.",
          "Missing the VAT return deadline is costly. SARS charges a fixed penalty for late filing plus 10% interest on the outstanding amount per year. Setting up eFiling reminders and automating the calculation using accounting software eliminates most late filing risk.",
          "Confusing inclusive and exclusive amounts when pricing is one of the most common small business errors. If your competitor quotes R50,000 excluding VAT and you quote R50,000 including VAT, your effective quote is actually R43,478, which is lower. Always specify clearly whether amounts are VAT-inclusive or VAT-exclusive in all commercial communications.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the current VAT rate in South Africa?",
        a: "The standard VAT rate in South Africa is 15%. This rate has been in place since April 2018, when it was increased from 14%. Certain supplies are zero-rated (effectively 0%) or exempt from VAT entirely.",
      },
      {
        q: "How do I calculate VAT-inclusive price from an exclusive price?",
        a: "Multiply the exclusive (pre-VAT) price by 1.15. For example, R10,000 exclusive times 1.15 equals R11,500 inclusive. The VAT amount is R1,500.",
      },
      {
        q: "How do I work backward to find the pre-VAT price from a VAT-inclusive amount?",
        a: "Divide the inclusive price by 1.15. For example, R11,500 divided by 1.15 equals R10,000 exclusive. The VAT portion is R11,500 minus R10,000 equals R1,500. Alternatively, multiply the inclusive price by 15/115 to find the VAT amount directly.",
      },
      {
        q: "At what turnover do I have to register for VAT?",
        a: "Compulsory registration is required when your taxable turnover exceeds R1 million in any consecutive 12-month period. Voluntary registration is permitted for businesses with turnover above R50,000. Registering voluntarily allows you to claim input VAT on business purchases, which reduces your costs.",
      },
      {
        q: "Are basic food items subject to VAT in South Africa?",
        a: "Selected basic food items are zero-rated, meaning no VAT is charged. These include brown bread, dried beans, rice, maize meal, milk, eggs, cooking oil, and a few others. However, most prepared and restaurant food is taxed at the standard 15% rate.",
      },
      {
        q: "Can I charge VAT if I am not registered?",
        a: "No. Charging VAT without being a registered VAT vendor is an offence under the VAT Act. Unregistered businesses must not include VAT on their invoices. If your turnover exceeds R1 million and you are not registered, you should register immediately as the penalties for late registration include back payments of all VAT you should have collected.",
      },
      {
        q: "What is input VAT and output VAT?",
        a: "Output VAT is the VAT you collect from your customers on your sales. Input VAT is the VAT you pay on your business purchases and expenses. At the end of each VAT period, you subtract input VAT from output VAT. If output is higher, you pay the difference to SARS. If input is higher (common for exporters), SARS refunds you.",
      },
      {
        q: "How do I handle VAT when buying a property?",
        a: "The rule is that VAT and transfer duty are mutually exclusive. If the seller is a VAT vendor selling the property in the course of their business (such as a developer), VAT applies and transfer duty is not charged. If the seller is a private individual not registered for VAT, transfer duty applies and no VAT is charged. For commercial property, VAT at 15% is typically charged.",
      },
      {
        q: "What records do I need to keep for VAT purposes?",
        a: "SARS requires that you keep all tax invoices (both issued and received), credit notes, debit notes, and proof of payment for at least five years. Digital records are acceptable. Good record-keeping is your defence in a VAT audit and your basis for claiming all legitimate input VAT deductions.",
      },
      {
        q: "What is the VAT on property rental?",
        a: "Residential rental is exempt from VAT. If you rent out a house or apartment to someone who uses it as their home, you do not charge VAT and cannot claim input VAT on expenses related to that property. Commercial property rental, including office, retail, and industrial leases, is standard-rated at 15%.",
      },
    ],
  },

  percentage: {
    title: "Percentage Calculator: Complete Guide",
    intro: [
      "Percentages appear in almost every area of daily life, from calculating a discount at a store to understanding your salary increase, from working out a restaurant tip to interpreting statistical data. Yet the percentage calculation is one that many people do awkwardly or incorrectly because there are actually several different types of percentage problems, and confusing one for another gives wrong answers.",
      "This guide explains the different types of percentage calculations, when each applies, and how to use TrufflShuffl's Percentage Calculator for each scenario. South African retail, financial, and business examples are used throughout to keep the content practical.",
    ],
    sections: [
      {
        heading: "When to Use a Percentage Calculator",
        paragraphs: [
          "Use it whenever you need precision rather than a mental estimate. For small percentage differences (like 2.5% versus 3%), the mental rounding error is proportionally large and can matter in a business context. A R500,000 contract margin calculated at 3% instead of 2.5% is a R2,500 difference.",
          "Use it when someone quotes you a percentage and you need to translate it to a rand amount. A 12% salary increase on a R45,000 monthly salary. A 2.5% commission on a R3.2 million property sale. An 8% late payment penalty on a R180,000 invoice. The calculator gives you the number instantly.",
          "Use it for percentage change problems, where you need to know how much something has increased or decreased as a percentage. If a product that sold for R89 now sells for R110, what is the percentage increase? (23.6%, not 21 cents or 23.6 rand).",
          "Use it when building a budget or business plan that uses percentage targets. If your gross margin target is 35% and your expected revenue is R2.4 million, your maximum allowable cost of goods sold is R1.56 million. Working out these constraints precisely keeps financial plans accurate.",
        ],
      },
      {
        heading: "The Three Main Types of Percentage Problems",
        paragraphs: [
          "Type 1: What is X% of Y? This is the most common calculation. What is 15% of R3,200? Answer: R480. Used for: tips, commissions, VAT extraction (though 15/115 is the formula for that, not plain 15%), discounts, interest calculations, and allocation of totals.",
          "Type 2: X is what percentage of Y? This is the percentage-of-a-total problem. If you earned R4,800 commission on a R32,000 deal, what percentage commission did you earn? Answer: 15%. Used for: checking margins, calculating effective rates, analysing budget spending, and understanding proportions.",
          "Type 3: X has changed by what percentage from Y? This is the percentage change problem. If your electricity bill was R2,200 and is now R2,750, what percentage increase is that? Answer: 25%. Used for: price inflation tracking, salary comparisons, investment performance measurement, and year-on-year business comparisons.",
          "Confusing these types is the most common source of percentage errors. The third type in particular requires using the original value as the denominator, not the new value. A product that rises from R100 to R115 is a 15% increase. But a product that falls from R115 to R100 is not a 15% decrease. It is a 13% decrease, because the denominator is now R115.",
        ],
      },
      {
        heading: "Percentage Points vs Percentages",
        paragraphs: [
          "A percentage point is an absolute difference between two percentages. A percentage change is a relative comparison. If the VAT rate increases from 14% to 15%, it has increased by 1 percentage point. But the percentage increase in the rate is 7.14% (1/14 x 100). News reporting often conflates these, and understanding the difference prevents you from being misled.",
          "In financial reporting, the distinction is crucial. If your investment returns 12% this year and 9% last year, the difference is 3 percentage points. But your investment performance has improved by 33.3% year-on-year (3/9 x 100). Both statements are true; which one you use depends on what you are trying to communicate.",
          "Similarly, if your salary was raised from 8% of target bonus to 10% of target bonus, that is a 2 percentage point increase, but it is a 25% increase in your bonus rate. Employees should always ask whether a quoted rate change is in percentage points or percentage terms, as the numbers tell very different stories.",
        ],
      },
      {
        heading: "Practical Applications in Business and Finance",
        paragraphs: [
          "Gross margin and markup are related but different percentage calculations that many business owners confuse. Gross margin is calculated on selling price: if you sell a product for R100 that cost you R60, your gross margin is 40% (R40/R100). Markup is calculated on cost: the same product has a 66.7% markup (R40/R60). These are different percentages representing different things. The percentage calculator handles both.",
          "In retail, discounting works backward. If you need to offer a 20% discount on a R250 item, the sale price is R200. But if the sale price is marked as R200 and you want to know what percentage reduction that represents from R250, the answer is 20%. If instead the original price was R200 and you add 25%, the new price is R250. These are not reciprocal percentages.",
          "Salary negotiations use percentage calculations constantly. If you currently earn R35,000 per month and your new job offers R42,000, that is a 20% increase. If your employer offers a 7.5% cost-of-living adjustment, the rand amount is R2,625, taking you to R37,625. Knowing both the percentage and the rand amount helps you negotiate effectively.",
          "Commission structures often combine multiple percentage tiers. An estate agent earning 2% on the first R1 million of a sale and 3% on any amount above R1 million needs to calculate both portions separately and then add them. On a R2.5 million sale: (R1m x 2%) plus (R1.5m x 3%) equals R20,000 plus R45,000 equals R65,000 total commission.",
        ],
      },
      {
        heading: "Industries That Use Percentage Calculations Constantly",
        paragraphs: [
          "Retail and e-commerce rely on percentages for pricing, margin analysis, discount management, and promotional planning. Every product has a cost price, selling price, margin, and discount structure that are all expressed as percentages and need to stay consistent.",
          "Financial services, including banking, insurance, and investment management, use percentages as their primary language. Interest rates, premium increases, fund performance, expense ratios, and commission structures are all percentages that need to be added, subtracted, multiplied, and compared accurately.",
          "Healthcare and nutrition use percentages for recommended daily allowances, body fat percentage, dosage calculations, and patient risk assessments. The BMI calculator on this site uses percentile rankings that are a type of percentage measure.",
          "Construction and engineering use percentages for material waste factors, tolerance calculations, and contractual price adjustments. A contractor might add 10% contingency to a R500,000 build estimate, or price in a 5% escalation clause for a 12-month project.",
          "Statistics and data analysis are built entirely on percentages. Survey results, growth rates, market share data, and almost every chart in a business presentation uses percentages. Understanding what a percentage means in context (percentage of what base?) is essential for interpreting data correctly.",
        ],
      },
      {
        heading: "Worked Examples",
        paragraphs: [
          "Example 1: You find a R1,499 jacket marked at 30% off. Discount amount: R1,499 x 30% equals R449.70. Sale price: R1,499 minus R449.70 equals R1,049.30. (Note: if the question is what R1,049.30 is as a percentage of R1,499, the answer is 70%, not 30%. The jacket costs 70% of the original price, or is 30% discounted.)",
          "Example 2: A business reports revenue of R8.4 million in 2023 and R9.7 million in 2024. Percentage increase: (R9.7m minus R8.4m) divided by R8.4m equals R1.3m / R8.4m equals 15.48%. If a colleague says revenue 'grew by R1.3 million', that is correct but incomplete. The 15.48% tells you how significant that growth was relative to the starting base.",
          "Example 3: An investment grows from R250,000 to R340,000 over three years. Total percentage return: (R340,000 minus R250,000) / R250,000 equals 36%. Annualised return (CAGR): (340,000/250,000)^(1/3) minus 1 equals 10.76% per year. The simple percentage (36%) is accurate for the total period; the CAGR allows comparison with other investments measured annually.",
        ],
      },
      {
        heading: "Compound Percentage Growth",
        paragraphs: [
          "When multiple percentage changes happen in sequence, you cannot simply add the percentages. A 20% increase followed by a 20% decrease does not return to the starting point. Starting with R1,000, a 20% increase gives R1,200. A 20% decrease from R1,200 gives R960, which is 4% below the original. This is why high-volatility investments need to outperform their average to recover losses.",
          "Compound annual growth rate (CAGR) is the smoothed annual rate at which an investment or metric grew over a multi-year period, assuming compounding. If revenue grew from R2 million to R3.2 million over four years, the CAGR is (3.2/2)^(1/4) minus 1 equals 12.5% per year. This is more informative than simply saying revenue grew 60% over four years, because it lets you compare against other annual benchmarks.",
          "Understanding compound percentage effects is essential for evaluating inflation. At 5% inflation per year, prices double in approximately 14.4 years (Rule of 72 applied to inflation). If you keep cash in a zero-interest mattress for 14 years, you have lost half your purchasing power. This is one of the strongest arguments for investing rather than hoarding cash.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the formula for calculating a percentage of a number?",
        a: "Multiply the number by the percentage and divide by 100. For example, 15% of R2,400 equals R2,400 times 15 divided by 100 equals R360. Alternatively, convert the percentage to a decimal (15% = 0.15) and multiply: R2,400 times 0.15 equals R360.",
      },
      {
        q: "How do I calculate the percentage increase from one number to another?",
        a: "Subtract the original number from the new number to get the change, then divide the change by the original number and multiply by 100. For example: from R500 to R620, the change is R120. R120 divided by R500 equals 0.24, which is 24%. Revenue increased by 24%.",
      },
      {
        q: "How do I find what percentage one number is of another?",
        a: "Divide the first number by the second number and multiply by 100. For example: R45 is what percentage of R300? R45 divided by R300 equals 0.15, times 100 equals 15%. R45 is 15% of R300.",
      },
      {
        q: "What is the difference between markup and margin?",
        a: "Markup is the percentage added to the cost price to arrive at the selling price, calculated using cost as the denominator. Margin is the profit as a percentage of the selling price, calculated using the selling price as the denominator. A 50% markup on a cost of R100 gives a selling price of R150. The margin on that sale is R50/R150 equals 33.3%.",
      },
      {
        q: "Why does a 50% increase followed by a 50% decrease not return to the original?",
        a: "Because each percentage is applied to a different base. Starting at R100: a 50% increase gives R150. A 50% decrease from R150 gives R75, which is 25% below the original R100. Percentage changes multiply, not add. To reverse a 50% increase, you need a 33.3% decrease (50/150 x 100).",
      },
      {
        q: "What is a 'basis point' in finance?",
        a: "A basis point is one hundredth of a percentage point, or 0.01%. It is used in financial markets to avoid ambiguity when discussing small rate changes. If the repo rate increases by 25 basis points, it has increased by 0.25%. Basis points are particularly common in bond markets, forex, and central bank communications.",
      },
      {
        q: "How do I calculate a tip as a percentage?",
        a: "Multiply the bill amount by the tip percentage divided by 100. For a 15% tip on a R380 bill: R380 times 0.15 equals R57. A quick mental trick for 10% is to move the decimal point one place left (R38 for a 10% tip), then halve it for 5% (R19) and add for 15% (R57). South African restaurant tips typically range from 10% to 15% of the food and beverage total.",
      },
      {
        q: "What is a good gross margin for a South African retail business?",
        a: "Gross margins vary significantly by sector. Grocery and supermarket retail typically operates at 20 to 30% gross margin. Clothing retail ranges from 40 to 60%. Restaurants target 60 to 70% gross margin on food and beverages (before labour and overheads). Professional services can achieve 60 to 80% gross margin. Comparing your margin against the sector average is more meaningful than a generic benchmark.",
      },
      {
        q: "How are percentage errors in invoicing handled?",
        a: "In South African business practice, a percentage error in an invoice is corrected with a credit note for the incorrect invoice and a new invoice with the correct figures. Amending an existing invoice without a credit note is not compliant with SARS requirements. If VAT was incorrectly calculated, the correction must be reflected in the next VAT return.",
      },
      {
        q: "What is the effective tax rate versus the marginal tax rate?",
        a: "Your marginal tax rate is the rate you pay on the next rand of income, based on which tax bracket you fall into. Your effective tax rate is the total tax paid divided by your total income, giving your average rate across all income. South African individuals on a salary of R600,000 per year have a marginal rate of 36% (on the top portion) but an effective rate of around 22 to 25% because income in lower brackets is taxed at lower rates.",
      },
    ],
  },

  retirement: {
    title: "Retirement Calculator: Complete Guide",
    intro: [
      "Retirement planning is the financial task most people know they should do but delay starting because it seems distant, complex, or overwhelming. The reality is that the mathematics of retirement savings is straightforward: the earlier you start, the more compounding does the work. The later you start, the more you personally have to contribute to reach the same outcome.",
      "This guide explains how to use TrufflShuffl's Retirement Calculator, what the key inputs mean, how South African retirement savings vehicles work, what the new two-pot retirement system means for your planning, and how to interpret your results to build a sustainable plan.",
    ],
    sections: [
      {
        heading: "When to Use the Retirement Calculator",
        paragraphs: [
          "Start at 25 to 30. The calculations at this age are the most powerful because they show the extraordinary impact of 35 to 40 years of compounding. Many people are shocked to see that modest monthly contributions started at 25 produce more wealth than much larger contributions started at 40.",
          "Use it at every major life milestone. A salary increase, a new job with a different pension fund, getting married, starting a family, or paying off debt are all events that change your financial picture and should trigger a recalculation of whether you are on track for retirement.",
          "Use it when the two-pot system changes become relevant to you. Under rules introduced in South Africa in September 2024, a portion of your retirement fund contributions goes into a 'savings component' that can be accessed once per year. This changes the effective growth of your retirement savings and is worth modelling.",
          "Use it when you receive a pension fund statement. Compare the current balance and projected value from your statement against the calculator's projection using your actual inputs. If the projected values diverge significantly, investigate whether fees, investment choices, or contribution rates are responsible.",
        ],
      },
      {
        heading: "How to Use the Retirement Calculator",
        paragraphs: [
          "Enter your current savings. This is the total balance across all your retirement vehicles: retirement annuities, pension fund, provident fund, and any preservation funds. If you are starting fresh, enter zero.",
          "Enter your monthly contribution. Include all retirement-directed savings, including employer contributions to your pension or provident fund. Many South Africans underestimate this because they only count their own deduction and forget the employer's contribution, which may be equal to or greater than their own.",
          "Set the expected annual return. A balanced retirement fund in South Africa has historically returned 10 to 12% per year over long periods. For a conservative portfolio, use 8 to 9%. For a higher equity allocation appropriate for a younger investor, 12 to 14% may be reasonable, though past performance is no guarantee.",
          "Set your current age and target retirement age. The default is 65, which is the standard South African retirement age for most pension funds and the age at which state old age pension becomes available. You can model earlier retirement, but this requires both more savings and longer drawdown periods.",
          "Enter a target retirement amount if you have a specific goal. Alternatively, leave it blank and use the calculated final amount to judge whether your current contribution is sufficient.",
        ],
      },
      {
        heading: "South Africa's Retirement Savings Landscape",
        paragraphs: [
          "South Africa has three main types of employer-linked retirement funds: pension funds, provident funds, and provident preservation funds. Employer pension funds deduct contributions before tax and provide a defined benefit (in some cases) or defined contribution arrangement. The employer typically also contributes.",
          "Retirement Annuities (RAs) are individual retirement savings contracts not linked to employment. They are the primary retirement vehicle for self-employed people and supplement employer funds for employees. RA contributions are tax-deductible up to 27.5% of the greater of taxable income or remuneration, capped at R350,000 per year. Growth within the fund is tax-free. At retirement, up to one third of the fund can be taken as a cash lump sum (with specific tax tables) and the remainder must be used to purchase an annuity.",
          "The State Old Age Grant (SOAG) is available to South Africans who are 60 or older, subject to a means test. In 2024/25, the full grant amount is R2,190 per month. It provides a safety net but is not a retirement plan for anyone with income above the poverty line, as it replaces a fraction of even a modest salary.",
          "Preservation funds allow you to move your retirement savings from a previous employer's fund without the proceeds being taxed, preserving the tax-advantaged status of the money. Rolling over funds into a preservation account rather than cashing them out when changing jobs is one of the most impactful retirement planning decisions you can make.",
        ],
      },
      {
        heading: "The Two-Pot Retirement System",
        paragraphs: [
          "South Africa's two-pot retirement system, introduced in September 2024, split all new contributions into two components: a 'savings component' (one third of each contribution) and a 'retirement component' (two thirds). You can access the savings component once per year for a minimum withdrawal of R2,000, subject to tax at your marginal rate. The retirement component cannot be accessed until retirement.",
          "The change addresses the persistent problem of South Africans cashing out their retirement funds every time they change jobs. The new system allows partial access for genuine emergencies while protecting the majority of accumulated funds.",
          "For planning purposes, any amounts you expect to access from the savings component reduce the final retirement balance in the calculator. If you plan to access the savings component regularly, your effective retirement savings rate is lower than your headline contribution rate.",
          "Existing fund balances accumulated before September 2024 went into a 'vested component' that falls under the previous rules (pension funds remain locked until retirement; provident funds previously could be fully commuted but this changed progressively).",
        ],
      },
      {
        heading: "How Much Do You Need to Retire?",
        paragraphs: [
          "A common planning rule is the 4% withdrawal rate: a retirement fund that supports a 4% annual withdrawal will last approximately 30 years. To generate R40,000 per month in retirement income, you would need R12 million at retirement (R40,000 x 12 months = R480,000 per year; R480,000 / 0.04 = R12 million). Inflation adjustments complicate this, as both the fund growth and your withdrawals need to keep pace with inflation.",
          "More practically, most South Africans target replacing between 60 and 80% of their final salary in retirement. If you earn R75,000 per month at retirement, you want between R45,000 and R60,000 per month from your savings plus any pension income. At 4% withdrawal rate, that requires a fund of R13.5 million to R18 million.",
          "These targets feel large, but compound growth over 30 to 40 years makes them achievable for consistent investors. A 30-year-old contributing R5,000 per month to a fund returning 11% per year reaches R17.4 million by age 65. The total contributions would be R2.1 million; the remaining R15.3 million is investment growth.",
        ],
      },
      {
        heading: "Industries That Focus on Retirement Planning",
        paragraphs: [
          "Financial advisory and wealth management is the primary profession involved in retirement planning. The Financial Sector Conduct Authority licenses retirement fund advisors under the FAIS Act. A good advisor reviews your retirement trajectory annually and adjusts contribution rates, fund allocation, and product selection as your life changes.",
          "Human resources and employee benefits consulting manages occupational retirement funds at the employer level. Trustees of pension and provident funds have fiduciary duties to ensure the fund is well-managed and members understand their benefits.",
          "Insurance companies provide the annuity products that convert a retirement fund into monthly income. Whether to choose a guaranteed life annuity, a living annuity, or a hybrid is one of the most consequential decisions at retirement and requires comparing the payout rates of different insurers.",
          "Tax practitioners assist with the tax-efficiency of retirement savings, including maximising the annual deduction for RA contributions, advising on the timing of lump-sum withdrawals, and planning for the taxation of annuity income in retirement.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much of my income should I save for retirement?",
        a: "The traditional rule of thumb is 10 to 15% of gross income throughout your working life. Many South African financial planners now recommend 15 to 17.5% to account for lower-for-longer investment returns and longer life expectancies. If you start late, you need to contribute a higher percentage to compensate for the shorter compounding period.",
      },
      {
        q: "What is a retirement annuity and how is it taxed?",
        a: "A retirement annuity (RA) is a private retirement savings vehicle. Contributions are tax-deductible up to 27.5% of the greater of your taxable income or remuneration (capped at R350,000 per year). Growth within the fund is tax-free. At retirement, up to one third can be taken as a cash lump sum, with the first R550,000 tax-free and escalating tax rates above that. The remainder must purchase an annuity, which is taxed as income.",
      },
      {
        q: "What happens to my pension if I change jobs?",
        a: "When you leave an employer, your pension or provident fund must be transferred. You can: transfer it to your new employer's fund (if the fund rules allow), transfer it to a preservation fund (no tax on transfer, deferred access), transfer it to a retirement annuity, or take the cash (this triggers tax and is almost always the worst choice for long-term wealth). The two-pot system introduced in 2024 means only the vested component falls under old rules; the savings and retirement components have their own rules.",
      },
      {
        q: "What is the difference between a living annuity and a guaranteed annuity?",
        a: "A guaranteed (life) annuity pays a fixed income for life regardless of how long you live, removing longevity risk. A living annuity invests your retirement capital in an investment portfolio and you draw a percentage each year (between 2.5% and 17.5% per year). If markets perform well or you draw conservatively, the fund can grow; if you draw too much or markets decline, it can deplete. Living annuities offer flexibility and potential growth; guaranteed annuities offer security and predictability.",
      },
      {
        q: "Can I access my retirement savings before I retire?",
        a: "Under the two-pot system introduced in 2024, you can access your savings component (one third of new contributions) once per year, with a minimum withdrawal of R2,000, subject to tax. Accessing the retirement component before age 55 is only permitted in cases of permanent disability or emigration from South Africa. Accessing retirement savings early for non-emergencies significantly reduces your final fund value.",
      },
      {
        q: "What is the South African state old age pension?",
        a: "The Social Relief of Distress Grant and the Old Age Grant is available to South Africans aged 60 and above who pass a means test. In 2024/25, the grant is R2,190 per month (R2,210 for those 75 and older). It provides a safety net but is not sufficient for comfortable retirement for anyone who has had a formal income. It should be treated as a supplement, not a retirement plan.",
      },
      {
        q: "How does inflation affect my retirement plan?",
        a: "Inflation is the silent destroyer of retirement plans. If you retire with R5 million today, 20 years of 5% inflation reduces its real purchasing power to about R1.9 million. Your retirement plan must target a fund large enough that, after adjusting for inflation during your retirement years, it still meets your needs in the final years. A good plan projects in real (inflation-adjusted) terms, not just nominal rands.",
      },
      {
        q: "What is the retirement age in South Africa?",
        a: "There is no fixed statutory retirement age in South Africa for most private sector employment. The standard retirement age for most pension and provident funds is 60 to 65, as specified in the fund rules. You can retire earlier if your fund rules allow it (often from age 55) or continue working past 65 and defer drawing from your fund. The state old age pension is available from age 60 for qualifying individuals.",
      },
      {
        q: "Should I invest in a retirement annuity or a tax-free savings account first?",
        a: "Both offer significant tax benefits but serve different purposes. An RA gives you an immediate tax deduction on contributions (very valuable for high-income earners) and tax-free growth, but the capital is locked until retirement. A TFSA has no contribution deduction but allows completely tax-free withdrawals at any time, making it useful for medium-term goals as well as retirement. Most financial planners recommend using an RA to its deductible limit first, then adding a TFSA for additional flexibility.",
      },
      {
        q: "What is a provident fund and how does it differ from a pension fund?",
        a: "Historically, a pension fund required at least two thirds of the balance at retirement to be used for an annuity, while a provident fund allowed the full balance to be taken as a lump sum. This distinction has been largely harmonised from 1 March 2021, with transitional rules protecting pre-2021 provident fund balances. The main remaining difference is in the treatment of vested (pre-2021) benefits and the specific fund rules of each employer scheme.",
      },
    ],
  },

  roi: {
    title: "ROI Calculator: Complete Guide",
    intro: [
      "Return on Investment (ROI) is one of the most widely used metrics in business, but it is also one of the most commonly misapplied. At its core, ROI measures how much you got back relative to what you put in, expressed as a percentage. The challenge is that 'what you put in' and 'what you got back' need to be defined consistently and completely for the number to be meaningful.",
      "This guide explains how to use TrufflShuffl's ROI Calculator, covers different applications from business investments to property and marketing, and provides South African examples across the contexts where ROI is most important.",
    ],
    sections: [
      {
        heading: "When to Use an ROI Calculator",
        paragraphs: [
          "Use it before making any significant spending decision to set a minimum acceptable return threshold. Whether you are buying a machine, launching a marketing campaign, or making a property investment, calculating the required return to justify the cost forces disciplined thinking about the expected benefits.",
          "Use it to compare multiple options competing for the same budget. If your business has R500,000 to invest and three different projects, comparing their projected ROI helps you allocate to the highest-return opportunity first.",
          "Use it after an investment to evaluate actual performance against the original projection. This closes the feedback loop and improves future projection quality. Businesses that systematically track actual vs projected ROI make better decisions over time.",
          "Use it to communicate the business case for a budget request. Presenting a projected ROI alongside a spending request converts a vague case for investment into a specific, financially quantified argument.",
        ],
      },
      {
        heading: "How to Use the ROI Calculator",
        paragraphs: [
          "Enter the initial investment. This is all the costs associated with the investment, including capital expenditure, setup costs, staff time, training, and any recurring costs over the analysis period. Underestimating total investment is the most common reason ROI calculations look better on paper than in reality.",
          "Enter the net return. This is the benefit generated by the investment minus any ongoing costs that were not included in the initial investment. For a property, it might be total rental income minus maintenance, rates, and management fees. For a machine, it might be labour savings minus maintenance costs.",
          "Set the time period. ROI can be calculated for any period, but comparing investments across different time periods is only meaningful if you annualise the returns or use CAGR for multi-year comparisons.",
          "Review the results. Simple ROI is shown as a percentage. CAGR (Compound Annual Growth Rate) is also shown for multi-year investments, which is the more useful metric for comparing against alternatives like unit trusts or fixed deposits that quote annual returns.",
        ],
      },
      {
        heading: "Types of ROI: Which Applies to Your Situation",
        paragraphs: [
          "Financial ROI is the straightforward calculation: net profit divided by cost, multiplied by 100. This is appropriate for capital investments with measurable financial returns, like equipment purchase, property investment, or stock trading.",
          "Marketing ROI measures the return from marketing spend. It is calculated as (revenue attributed to marketing minus marketing cost) divided by marketing cost. The challenge is attribution: which sales would have happened anyway and which were genuinely generated by the marketing activity. Digital marketing has made attribution easier through tracking and analytics, but it remains an art as much as a science.",
          "Social ROI extends the analysis to non-financial returns, such as customer satisfaction, brand awareness, or social impact. While harder to quantify, it is increasingly important for businesses that measure their performance beyond pure financial return.",
          "Return on Equity (ROE) is a version of ROI used in financial analysis, measuring net income as a percentage of shareholders' equity. South African listed companies report ROE as a standard metric, and it is used to compare profitability across companies in the same sector.",
        ],
      },
      {
        heading: "Annualising ROI and Comparing Against Benchmarks",
        paragraphs: [
          "A 40% ROI sounds impressive, but whether it is good depends on how long the investment took. A 40% return over 10 years annualises to about 3.4% per year, which is poor by any standard. A 40% return over 18 months annualises to about 30% per year, which is excellent.",
          "In South Africa, a reasonable benchmark for a well-chosen equity investment is 10 to 12% per year over the long term. Any investment you make with your own capital should be compared against this opportunity cost. If your buy-to-let property nets 7% ROI per year and a balanced unit trust returns 11%, the property investment is underperforming on a financial return basis (though it may have other advantages like leverage and capital appreciation).",
          "Weighted average cost of capital (WACC) is the hurdle rate used by businesses. Any investment with a projected ROI above the WACC creates value; any investment below it destroys value. South African companies typically set hurdle rates between 12 and 18% depending on their capital structure and risk profile.",
        ],
      },
      {
        heading: "Industries That Use ROI Calculations Most",
        paragraphs: [
          "Property investment is one of the largest arenas for ROI analysis in South Africa. Buy-to-let investors calculate rental yield (gross and net), capital appreciation, and total return on equity to evaluate properties. The South African residential property market has historically delivered long-term returns of around 8 to 12% per year including rental yield and capital appreciation.",
          "Business owners use ROI for capital expenditure decisions. A Durban logistics company considering a R2 million truck purchase would calculate expected return based on additional revenue the truck enables minus financing and operating costs, and compare it to the cost of leasing.",
          "Marketing agencies present ROI metrics to clients as proof of campaign effectiveness. Digital campaigns can be tracked end-to-end from ad spend to conversion, making ROI measurable in ways that traditional media never allowed.",
          "Startups and venture capital use ROI models to justify initial investment and plan for exit. A South African startup seeking funding from an investor like Naspers or a local venture capital firm needs to show projected returns that justify the risk of an early-stage investment.",
          "Private equity and corporate acquisition teams use ROI as a core tool for evaluating target businesses. The entry price, expected operating improvements, and exit value determine the projected IRR (internal rate of return), which is the most sophisticated version of ROI for multi-period investments with complex cash flows.",
        ],
      },
      {
        heading: "Worked Examples",
        paragraphs: [
          "Example 1: Buy-to-let investment. Purchase price: R1,500,000. Deposit and costs: R350,000 cash invested. Monthly rental income: R12,000. Monthly costs (rates, levies, maintenance, insurance): R3,500. Net monthly income: R8,500. Annual net income: R102,000. ROI on cash invested: R102,000 / R350,000 equals 29.1% per year (leveraged return on cash). Gross rental yield: R144,000 / R1,500,000 equals 9.6% per year.",
          "Example 2: Marketing campaign. Total spend: R80,000. Sales attributed to campaign: R220,000. Cost of goods for those sales: R110,000. Gross profit from campaign: R110,000. Marketing ROI: (R110,000 minus R80,000) / R80,000 equals 37.5%.",
          "Example 3: Machinery purchase. Cost of machine: R1,200,000. Expected annual labour savings: R280,000. Maintenance per year: R40,000. Net annual saving: R240,000. Simple payback period: R1,200,000 / R240,000 equals 5 years. ROI over 10-year useful life: (R2,400,000 total saving minus R1,200,000 cost) / R1,200,000 equals 100% total ROI, or approximately 7.2% per year annualised.",
        ],
      },
      {
        heading: "Limitations of ROI",
        paragraphs: [
          "ROI is a useful summary metric but it has important limitations. It ignores the time value of money unless you annualise it, which means comparing a 3-year ROI against a 7-year ROI at face value is misleading. It also ignores risk: two investments with identical projected ROI but very different risk profiles are not equivalent.",
          "ROI also says nothing about the return of capital itself. A high ROI on a small investment is less useful than a lower ROI on a much larger investment if your goal is growing total wealth. A 50% ROI on R100,000 produces R50,000. A 20% ROI on R2 million produces R400,000.",
          "For complex multi-year investments with uneven cash flows, Net Present Value (NPV) and Internal Rate of Return (IRR) are more precise tools than simple ROI. They account for the timing of cash flows and the discount rate. ROI is best used for quick comparisons and simple project evaluations where these nuances are secondary.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is a good ROI percentage?",
        a: "It depends entirely on the context, time period, and risk level. For a long-term equity investment, 10 to 12% annual ROI is considered good. For a short-term business project with high risk, 30 to 50% might be the minimum acceptable. For a property investment, 8 to 12% annual total return is typical in South Africa. Always compare against your next-best alternative (the opportunity cost).",
      },
      {
        q: "What is the difference between ROI and ROE?",
        a: "ROI (Return on Investment) measures the return relative to the total investment cost. ROE (Return on Equity) specifically measures net income as a percentage of shareholders' equity, used in financial analysis of companies. ROE focuses on the return earned on the equity portion of financing, not the total assets. Both are useful, but in different contexts.",
      },
      {
        q: "How do I account for risk when comparing ROI figures?",
        a: "The most common approach is to apply a risk premium: higher-risk investments need to offer a higher projected ROI to be worthwhile. A risk-free investment (like an RSA Retail Bond) might justify 10% ROI. A moderately risky business investment might require 20%. A speculative venture might need 40% or more to justify the risk of loss. Risk-adjusted return is a more sophisticated approach used in portfolio management.",
      },
      {
        q: "What is payback period and how does it relate to ROI?",
        a: "Payback period is the time it takes for the cumulative returns from an investment to equal the initial cost. It does not measure profitability beyond the payback point, unlike ROI. A project with a 3-year payback period and a 10-year useful life is very different from one with a 3-year payback and a 4-year useful life, even though the payback period is the same.",
      },
      {
        q: "Can ROI be negative?",
        a: "Yes. A negative ROI means the investment lost money. For example, if you invested R100,000 and the investment is now worth R80,000, your ROI is negative 20%. Negative ROI is important information; it confirms an investment was a mistake and should influence future decisions of the same type.",
      },
      {
        q: "How do I include taxes when calculating ROI?",
        a: "After-tax ROI is more meaningful than pre-tax ROI, but it requires knowing your tax treatment of the investment income. In South Africa, rental income is taxed as normal income (at your marginal rate minus deductible expenses). Capital gains on property sales are taxed as capital gains with a 40% inclusion rate and annual exclusion. Investment returns in a retirement fund are tax-free. Always calculate on an after-tax basis to compare correctly with alternatives.",
      },
      {
        q: "What is the difference between ROI and IRR?",
        a: "ROI is a simple percentage of return on total investment, useful for single-period or simplified analysis. IRR (Internal Rate of Return) is the discount rate that makes the net present value of all cash flows equal to zero. IRR accounts for the timing and magnitude of each cash flow, making it more appropriate for complex, multi-year investments with uneven cash flows. For simple investments, both metrics tell a similar story.",
      },
      {
        q: "How is ROI used in marketing?",
        a: "Marketing ROI is the gross profit generated by a campaign divided by the campaign cost. Digital channels like Google Ads, Facebook, and email marketing allow near-perfect attribution, making ROI measurement possible at the campaign and sometimes ad level. Traditional media (TV, radio, billboards) uses statistical modelling or surveys to estimate ROI, which is inherently less precise.",
      },
      {
        q: "What is the relationship between ROI and capital allocation?",
        a: "Capital allocation is the process of deciding how to distribute limited financial resources across competing investment opportunities. A business with R5 million to invest compares the projected ROI of different projects and generally allocates to the highest-returning options first, subject to strategic constraints and risk limits. Good capital allocation is one of the most important skills of an effective CFO or business owner.",
      },
      {
        q: "Why do property investors talk about yield instead of ROI?",
        a: "Rental yield is a specific type of ROI that measures annual rental income as a percentage of the property purchase price. Gross yield uses gross rental income; net yield deducts costs before dividing. Investors use yield for property because it is comparable across different price points and locations. Total ROI for property would also include capital appreciation, financing effects, and tax, making yield a simpler initial filter.",
      },
    ],
  },

  savings: {
    title: "Savings Calculator: Complete Guide",
    intro: [
      "Saving money is simple in concept but difficult in practice, and one reason people struggle is that they do not have a clear picture of what they are working toward. A savings calculator converts a vague intention to 'save more' into a specific rand target, a specific monthly amount, and a specific number of months. That specificity is what makes the habit stick.",
      "This guide covers when and how to use TrufflShuffl's Savings Calculator, explains the different savings vehicles available in South Africa, gives worked examples for common savings goals, and addresses the most frequent questions about growing a savings pot.",
    ],
    sections: [
      {
        heading: "When to Use the Savings Calculator",
        paragraphs: [
          "Use it when you are setting a financial goal. Whether the goal is an emergency fund, a holiday, a deposit for a vehicle or property, or a specific lump sum for a future expense, the calculator tells you exactly how much to save per month to reach it by a specific date.",
          "Use it to evaluate different savings products. By comparing different interest rates with the same starting balance, monthly contribution, and term, you can see in rands how much the rate difference costs you over time. This motivates switching from a near-zero interest cheque account to a dedicated savings account.",
          "Use it when you want to understand the impact of starting earlier. Running the calculator with the same monthly contribution but different starting ages shows the compounding effect vividly. This is useful for motivating younger family members to start saving early.",
          "Use it to model the effect of reducing spending. If you cut R800 per month from unnecessary expenses and redirect it to a savings account, the calculator shows you the tangible result of that decision over 3 to 5 years.",
        ],
      },
      {
        heading: "How to Use the Savings Calculator",
        paragraphs: [
          "Enter your starting balance. If you are starting fresh, enter zero. If you have an existing savings account you are building on, enter the current balance.",
          "Enter your monthly contribution. Be realistic about what you can consistently contribute each month. It is better to enter a slightly conservative figure you will definitely save every month than an aspirational figure you will miss half the time.",
          "Set the annual interest rate. For a South African savings account at a major bank, typical rates in 2025 are 5 to 8.5% depending on the bank, product type, and balance tier. Money market funds typically offer 8.5 to 9.5%. Fixed deposits range from 8.5 to 11%. Use the actual rate of the account you are saving into.",
          "Set the term in years. The calculator shows the final balance and total interest earned. Adjust the term to see how the final balance changes, or adjust the monthly contribution to see what you need to save to reach a specific target within your chosen time frame.",
        ],
      },
      {
        heading: "South African Savings Products",
        paragraphs: [
          "A notice deposit account allows you to invest for a fixed period (typically 32, 60, or 90 days notice) at a rate higher than a standard savings account. You cannot withdraw immediately; you must give the notice period. These are appropriate for emergency funds where you want higher interest but can tolerate a short delay on access.",
          "A fixed deposit locks your money for a set term (3 months to 5 years) at a guaranteed rate. Fixed deposits offer the highest rates for cash savings but the lowest flexibility. They are suitable for specific, known future expenses where you will not need the money earlier.",
          "A money market account invests in short-term bank instruments. Rates are variable and linked to the prime rate, so they rise when interest rates rise and fall when they fall. They typically offer better rates than standard savings accounts with next-day liquidity.",
          "A tax-free savings account (TFSA) allows up to R36,000 per year, with a R500,000 lifetime limit, with all growth and withdrawals completely tax-free. Used with the right underlying investments (equity unit trusts rather than a cash savings account), TFSAs can be the most effective long-term savings vehicle for many South Africans.",
          "Many South African banks now offer goal-based savings products with names like 'Goal Save' or 'Plan Save'. These separate your savings into named buckets (holiday fund, emergency fund, home deposit) and often offer slightly higher rates than standard savings accounts as an incentive to maintain the discipline of not touching the funds.",
        ],
      },
      {
        heading: "Building an Emergency Fund: Where to Start",
        paragraphs: [
          "Financial planning consensus in South Africa, as globally, recommends an emergency fund of three to six months of living expenses. For someone spending R22,000 per month on necessities, that means a R66,000 to R132,000 emergency fund held in a liquid, interest-bearing account.",
          "The emergency fund should be completely separate from your day-to-day transactional account to reduce the temptation to use it for non-emergencies. A 32-day notice account offers a useful compromise: it earns a reasonable rate but the short notice period prevents impulsive withdrawals.",
          "Building the emergency fund before accelerating debt repayment or investing is debated among financial planners. The standard recommendation is to build a small emergency fund of one to two months expenses first, then attack high-rate debt aggressively, then complete the emergency fund, and then invest. Without even a small emergency fund, any unexpected expense derails debt repayment plans and often requires taking on more debt.",
        ],
      },
      {
        heading: "Industries and Contexts for Savings Planning",
        paragraphs: [
          "Personal financial planning is the most obvious application. A good financial advisor helps clients identify savings goals, select appropriate products, and set up automated contributions that remove the decision from month to month.",
          "Employee benefit consultants advise companies on savings programs for employees. Many South African employers offer voluntary payroll deduction savings schemes that give employees access to rates better than retail banking through bulk negotiating.",
          "Government savings initiatives, including the RSA Retail Savings Bond program, target households with modest incomes who need accessible, safe savings options outside the banking system.",
          "Youth financial education programs increasingly use savings calculators to show young people the concrete, measurable benefit of saving R200 or R500 per month from the time they enter the workforce. The visual impact of seeing a modest regular saving grow to a substantial sum over a decade is one of the most powerful financial education tools available.",
        ],
      },
      {
        heading: "Worked Examples",
        paragraphs: [
          "Example 1: Emergency fund goal of R80,000. Starting balance: R5,000. Monthly contribution: R2,500. Interest rate: 8% per year. Time to goal: approximately 27 months. Total contributions: R67,500. Interest earned: R7,500. If you increase the monthly contribution to R3,000, the time to goal drops to 22 months.",
          "Example 2: Saving for a property deposit of R300,000. Starting balance: R50,000. Monthly contribution: R5,000. Interest rate: 9.5% (money market). Time to goal: approximately 43 months (3.6 years). Total contributions: R215,000 plus starting R50,000. Interest earned: approximately R35,000.",
          "Example 3: Long-term savings in a TFSA. Starting balance: zero. Monthly contribution: R3,000. Interest rate: 11% (assuming invested in a balanced equity unit trust). After 10 years: approximately R630,000. After 13.9 years, the total contributions reach R500,000 (lifetime cap). If the fund continues to compound at 11% after contributions stop, by year 20 the balance is approximately R2.1 million.",
        ],
      },
      {
        heading: "The Savings Rate and Why It Matters More Than Return",
        paragraphs: [
          "For early-stage savings, the contribution rate matters far more than the interest rate. A person saving R5,000 per month at 9% reaches their goal faster than someone saving R2,000 per month at 12%. The extra R3,000 per month outweighs the 3% rate difference by a large margin in the short to medium term.",
          "As the balance grows, the interest rate becomes relatively more important because the interest is being calculated on a larger base. After 5 to 10 years of consistent saving, the difference between earning 9% and 11% on a R500,000 balance is R10,000 per year, which is meaningful. But in year one on a R20,000 balance, the difference is only R400 per year.",
          "This is why financial planning prioritises behaviour (how much you save and how consistently) over product selection (which account earns slightly more) in the early stages. Both matter, but getting the contribution habit right first and then optimising the product is the right sequence.",
        ],
      },
    ],
    faqs: [
      {
        q: "What interest rate should I use for a South African savings account?",
        a: "Standard savings accounts at major banks typically offer 5 to 7% per year in 2025. 32-day notice accounts offer 7 to 8.5%. Money market accounts offer 8.5 to 9.5%. Fixed deposits range from 8.5 to 11% depending on the term and amount. Use the actual rate of the account you are considering to get a realistic projection.",
      },
      {
        q: "How much should I have in an emergency fund?",
        a: "The standard recommendation is three to six months of essential living expenses. Essential expenses include rent or bond repayment, food, utilities, transport, insurance, and minimum debt repayments. Exclude non-essential spending like entertainment and holidays. If your total essential costs are R18,000 per month, your emergency fund target is R54,000 to R108,000.",
      },
      {
        q: "Is it better to save in a fixed deposit or a money market account?",
        a: "Fixed deposits offer higher interest rates in exchange for locking your money for the full term. Money market accounts offer slightly lower but competitive rates with next-day access. For money you will definitely not need for the fixed period, a fixed deposit is the better earner. For savings you might need at short notice (including an emergency fund), the money market account is better.",
      },
      {
        q: "What happens if I miss a monthly contribution?",
        a: "Missing a contribution reduces your final balance because that month's contribution does not get added to the compounding base. It is not catastrophic for the long-term outcome, but habitual missed contributions significantly undermine results. Setting up a monthly debit order that processes automatically the day after your salary is deposited is the most effective way to ensure consistent contributions.",
      },
      {
        q: "Should I save or pay off debt first?",
        a: "If your debt carries an interest rate higher than your savings return, paying down the debt is the better mathematical choice, because it is a guaranteed return equal to the debt interest rate. The exception is that everyone should maintain at least a small emergency fund (one to two months of expenses) before aggressively attacking debt, to avoid a situation where any unexpected cost forces you back into debt.",
      },
      {
        q: "How does tax affect my savings returns?",
        a: "Interest earned above the annual exemption (R23,800 for under 65s in 2024/25) is taxed as income at your marginal rate. If you are in a 36% tax bracket and earn R30,000 in interest, you pay tax on R6,200 at 36%, which is R2,232. The after-tax return from a TFSA is always better than a taxable account for amounts above the exemption, which is why TFSAs are the preferred savings vehicle for most people with meaningful savings.",
      },
      {
        q: "Can I save in dollars or other currencies in South Africa?",
        a: "Yes. South African residents are allowed to hold foreign currency deposits at South African banks and can invest abroad using their annual foreign investment allowance of R10 million per year (or R1 million per year without SARS approval via single discretionary allowance). Foreign currency savings accounts earn lower rand interest but can benefit from exchange rate movements if the rand weakens.",
      },
      {
        q: "What is the benefit of automating savings contributions?",
        a: "Automating contributions removes the daily decision and temptation that undermines saving. Research consistently shows that people who automate savings save more, more consistently, than those who make active monthly transfer decisions. Setting up a debit order to your savings account on the same date as your salary payment treats savings as a non-negotiable expense rather than what is left over after spending.",
      },
      {
        q: "How do I choose between saving and investing?",
        a: "Saving (in a cash account) is appropriate for money you need within three years or that serves as an emergency fund. The return is lower but the capital is safe. Investing (in equities, unit trusts, or property) is appropriate for money with a horizon of five years or more, where market fluctuations can be weathered and the higher expected return justifies the short-term uncertainty. Many people should do both simultaneously once their emergency fund is established.",
      },
      {
        q: "What is the 50/30/20 budgeting rule?",
        a: "The 50/30/20 rule suggests allocating 50% of after-tax income to needs (rent, food, utilities, transport), 30% to wants (entertainment, dining out, subscriptions), and 20% to savings and debt repayment. While the percentages do not work for every South African income level, the structure is a useful starting framework for anyone who has not previously tracked how they spend.",
      },
    ],
  },

  salary: {
    title: "Salary Calculator: Complete Guide",
    intro: [
      "Understanding your full compensation picture involves more than knowing your gross monthly salary. South Africa has a specific tax structure, mandatory deductions, and an employer-side cost of employment that together determine what you actually take home versus what your employer pays. The TrufflShuffl Salary Calculator handles all of this, giving you a complete breakdown of your net income and total employment cost.",
      "This guide explains how PAYE works, what all the deductions on your payslip mean, how to use the calculator to evaluate a job offer, and how to plan around your tax liability. It is relevant both to employees negotiating salaries and to employers and HR professionals managing compensation packages.",
    ],
    sections: [
      {
        heading: "When to Use the Salary Calculator",
        paragraphs: [
          "Use it when evaluating a job offer. If a company offers you a R720,000 annual CTC (cost to company), the salary calculator shows you what you actually take home after tax, medical aid, provident fund, and other deductions. Two jobs at the same CTC can have significantly different net salaries depending on how the package is structured.",
          "Use it when negotiating a salary increase. If you want to increase your take-home pay by R3,000 per month, you need a gross salary increase larger than R3,000 because a portion of the increase goes to tax. The calculator shows you the gross increase needed to achieve a specific net pay improvement.",
          "Use it for tax planning. By knowing your expected annual taxable income, you can make decisions about RA contributions, medical aid deductions, and allowances that reduce your tax liability before the year ends. The calculator helps you model the effect of different deduction levels on your take-home pay.",
          "Use it if you are moving from being an employee to self-employment (or vice versa). The calculator shows the total employment cost from the employer's perspective, which is relevant when you are pricing freelance work or deciding whether to employ staff.",
        ],
      },
      {
        heading: "How to Use the Salary Calculator",
        paragraphs: [
          "Enter your annual gross salary or CTC. CTC (cost to company) is the total annual cost to the employer and includes gross salary, employer contributions to medical aid and retirement funds, and the employer's share of UIF. Gross salary excludes employer contributions but includes all income before deductions.",
          "Enter medical aid contributions. Specify whether the amount is employee-only or includes dependants. Medical aid contributions generate an additional tax credit (medical tax credit, or MTC) based on the number of beneficiaries.",
          "Enter retirement fund contributions. Include all contributions: RA, pension, or provident fund, both yours and your employer's contribution if the CTC is structured that way. These reduce your taxable income.",
          "Review the output. The calculator shows gross pay, all deductions, PAYE, UIF, net pay, and the total employer cost. This gives you a complete picture of both what you earn and what it costs the employer to have you.",
        ],
      },
      {
        heading: "South African Tax Brackets and PAYE",
        paragraphs: [
          "PAYE (Pay As You Earn) is the income tax system where your employer deducts tax from your salary monthly on behalf of SARS. Your employer uses SARS's tax tables to calculate the amount to deduct each month based on your projected annual income.",
          "South Africa uses a progressive tax system. For the 2024/25 tax year, the brackets are: 18% on income up to R237,100; 26% on R237,101 to R370,500; 31% on R370,501 to R512,800; 36% on R512,801 to R673,000; 39% on R673,001 to R857,900; 41% on R857,901 to R1,817,000; and 45% on income above R1,817,000.",
          "The primary rebate of R17,235 (2024/25) reduces the tax calculated using the above table. Every South African taxpayer gets this rebate regardless of their income. Those 65 and older also receive a secondary rebate of R9,444, and those 75 and older receive an additional tertiary rebate of R3,145.",
          "The tax threshold (the income below which no PAYE is due) is R95,750 per year for individuals under 65 in 2024/25. This is the primary rebate divided by the bottom tax rate (R17,235 / 18% = R95,750). Anyone earning below this threshold has no income tax liability.",
        ],
      },
      {
        heading: "Understanding Your Payslip",
        paragraphs: [
          "UIF (Unemployment Insurance Fund) is a mandatory deduction of 1% of gross salary per month, with the employer also contributing 1%. The monthly employee contribution is capped at an earnings threshold (R17,712 per month in 2024, reviewed annually). UIF provides short-term unemployment, illness, maternity, and adoption benefits.",
          "Medical tax credits reduce your PAYE liability directly (not just your taxable income). In 2024/25, the credit is R364 per month for the first beneficiary and R246 for each additional beneficiary. A taxpayer with a spouse and one child on medical aid earns R856 per month in medical tax credits (R364 + R246 + R246), which reduces their monthly PAYE by R856.",
          "A travel allowance (if provided) is partially taxable. SARS currently taxes 80% of a travel allowance as income, unless the employee can prove actual business kilometers traveled. Keeping a detailed logbook is essential if you receive a travel allowance and want to claim more than the 20% non-taxable portion.",
          "Annual leave, performance bonuses, and 13th cheques are also subject to PAYE. The employer is required to add these to your projected annual income and calculate the applicable tax. Large once-off payments can temporarily push you into a higher bracket for the month they are received, but your annual tax liability is the same as if the bonus was spread over the year.",
        ],
      },
      {
        heading: "CTC vs Gross vs Net: Understanding the Difference",
        paragraphs: [
          "CTC (Cost to Company) is the most comprehensive number. It includes everything the employer spends on your employment: gross salary, employer pension contribution, employer medical aid contribution, employer SDL (Skills Development Levy at 1% of payroll), and employer UIF contribution.",
          "Gross salary is your income before any employee deductions but typically excludes employer-side costs. This is the number from which PAYE, UIF, medical aid, and retirement fund deductions are calculated.",
          "Net salary (take-home pay) is what is deposited into your bank account after all deductions. For the same R720,000 CTC, two candidates could have very different net salaries depending on how many dependants are on their medical aid, how much they contribute to retirement funds, whether they have a company car, and their individual circumstances.",
          "Understanding all three numbers is critical for comparing job offers accurately. A company quoting R720,000 CTC with a generous employer pension contribution and medical aid is structuring a very different actual take-home package than a company quoting the same CTC with no employer contributions to benefits.",
        ],
      },
      {
        heading: "Industries That Use Salary Calculations Frequently",
        paragraphs: [
          "Human resources and payroll departments at every South African employer calculate PAYE, UIF, and other deductions for every employee every month. This is typically handled by payroll software (like Sage, PaySpace, or SimplePay), but understanding the underlying calculation is essential for resolving employee queries.",
          "Recruitment agencies and executive search firms use salary calculators when presenting package comparisons to candidates and clients. Advising a candidate to accept or reject an offer requires modelling the actual take-home difference between the current and new package.",
          "Tax practitioners use detailed salary calculations to prepare annual tax returns, identify potential refunds or additional liabilities, and advise on structuring to minimise tax within legal bounds.",
          "Financial advisors use salary information as the starting point for all personal financial planning. Knowing actual take-home pay (not just the gross salary) is essential for setting realistic savings targets and budgets.",
        ],
      },
      {
        heading: "Tax Planning and Reduction Strategies",
        paragraphs: [
          "The most powerful legal method to reduce tax on a salary is maximising retirement annuity (RA) contributions. Every rand contributed to an RA reduces your taxable income by that rand, up to the deduction limit of 27.5% of the greater of taxable income or remuneration (capped at R350,000 per year). For someone in the 36% tax bracket, an extra R2,000 per month RA contribution saves R720 per month in tax.",
          "Medical aid contributions qualify for a tax credit, not a deduction. Unlike RA contributions which reduce taxable income, the medical tax credit reduces the actual tax payable rand for rand. Both are valuable, but the credit is available to everyone regardless of their marginal rate, while the deduction value scales with the marginal rate.",
          "Claiming home office deductions is possible for employees who work from home, but SARS has strict requirements. The home office must be specifically equipped, used regularly and exclusively for work, and the employer must formally require the employee to work from home. Claiming incorrectly risks a SARS audit and penalties.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between CTC and gross salary?",
        a: "CTC (Cost to Company) is the total cost to the employer, including employer contributions to medical aid, pension, and UIF. Gross salary is your income before personal deductions but excludes employer-side costs. A CTC of R500,000 will have a gross salary lower than R500,000 once employer contributions are deducted from the CTC total.",
      },
      {
        q: "What are the PAYE tax brackets for 2024/25?",
        a: "The brackets range from 18% (on income up to R237,100) to 45% (on income above R1,817,000), with the primary rebate of R17,235 applied against the calculated tax. The effective (average) rate is always lower than the marginal (top bracket) rate because lower income portions are taxed at lower rates.",
      },
      {
        q: "How is UIF calculated?",
        a: "UIF is calculated at 1% of gross earnings per month, with the employer also contributing 1%. The employee's contribution is capped at an earnings threshold (reviewed annually by the UIF). Total UIF (employee plus employer) is 2% of earnings up to the threshold.",
      },
      {
        q: "What is the medical tax credit and how does it work?",
        a: "The medical scheme tax credit is a fixed monthly amount that reduces your PAYE liability. In 2024/25, it is R364 for the first beneficiary and R246 for each additional member. A single person with no dependants on medical aid receives R364 per month off their PAYE. The credit applies regardless of how much you actually pay in medical aid.",
      },
      {
        q: "Can I reduce my tax by contributing more to a retirement annuity?",
        a: "Yes. RA contributions reduce your taxable income up to 27.5% of the greater of your taxable income or remuneration, capped at R350,000 per year. If you are in the 36% marginal tax bracket, every extra R1,000 contributed to an RA saves you R360 in PAYE. The money is not tax-free permanently; it is taxed in retirement when you draw it, typically at a lower rate.",
      },
      {
        q: "Is my annual bonus taxed differently from my monthly salary?",
        a: "Your bonus is subject to PAYE at the same marginal rate. Your employer calculates PAYE on your bonus by projecting it as part of your annual income. The bonus itself is not taxed at a different rate, but receiving a large bonus in one month may result in more PAYE being deducted in that month than in others, as the employer uses the month's total income to estimate the annual run rate.",
      },
      {
        q: "What is SDL and does it affect my take-home pay?",
        a: "SDL (Skills Development Levy) is a levy of 1% of total payroll paid by employers to SARS for redistribution through SETA (Sector Education and Training Authority) programs. It is an employer cost included in CTC, not deducted from employee take-home pay.",
      },
      {
        q: "What is a Section 11F deduction?",
        a: "Section 11F of the Income Tax Act governs the deductibility of pension fund, provident fund, and retirement annuity contributions. Under this section, your qualifying contributions reduce your taxable income, which reduces your PAYE. The limit is 27.5% of the greater of taxable income or remuneration, capped at R350,000 per year across all retirement vehicles combined.",
      },
      {
        q: "How is a travel allowance taxed?",
        a: "A travel allowance is generally taxed at 80% of the value, meaning only 20% is considered non-taxable by default. If you keep a logbook and can prove business mileage using SARS's prescribed rate tables, you may deduct more. Actual business fuel costs, maintenance, and vehicle costs can be claimed based on documented business kilometers. Most SARS audits of individual returns focus on travel allowance claims.",
      },
      {
        q: "What does it mean when someone says 'the job pays R80,000 per month'?",
        a: "It could mean any of three things: R80,000 gross monthly, R80,000 net monthly, or R80,000 CTC monthly. Always clarify which one is being quoted. R80,000 gross monthly with standard deductions for a single person with no dependants (using 2024/25 tables) results in a net take-home of approximately R56,000 per month.",
      },
    ],
  },

  fuel: {
    title: "Fuel Calculator: Complete Guide",
    intro: [
      "Fuel is one of the most significant and visible recurring expenses for South African households and businesses. With pump prices updated monthly by the Department of Mineral Resources and Energy and fuel costs influenced by the rand/dollar exchange rate, crude oil prices, and government levies, having a clear method to calculate fuel costs is genuinely useful for budgeting and decision-making.",
      "This guide explains how to use TrufflShuffl's Fuel Calculator for everything from planning a road trip to calculating fleet costs to deciding whether to buy a more fuel-efficient vehicle.",
    ],
    sections: [
      {
        heading: "When to Use the Fuel Calculator",
        paragraphs: [
          "Use it when planning a road trip. Enter the distance, your vehicle's fuel consumption figure (litres per 100km), and the current fuel price to get the exact cost of the journey. This is especially useful for longer South African routes like Cape Town to Johannesburg (1,400km), Durban to Jo'burg (580km), or Port Elizabeth to Cape Town (730km).",
          "Use it for monthly fuel budgeting. Enter your estimated monthly distance, your car's average consumption, and the current pump price to see what you should budget for fuel. This helps identify whether your fuel spend is in line with similar vehicle owners and whether changes in driving habits or vehicle choice could reduce costs.",
          "Use it to evaluate the financial case for a more fuel-efficient vehicle. Calculate the annual fuel saving from switching from a vehicle consuming 9L/100km to one consuming 6L/100km, and compare that saving to the cost difference between the vehicles.",
          "Use it for fleet management. Businesses with delivery vehicles, service vehicles, or sales fleets can use the calculator to budget fuel costs per vehicle per route and identify which vehicles are costing more than expected based on actual versus calculated consumption.",
        ],
      },
      {
        heading: "How to Use the Fuel Calculator",
        paragraphs: [
          "Enter the distance in kilometres. For a route, use Google Maps or a similar navigation tool to get the distance. For monthly budgeting, estimate your average daily commute times 22 working days plus any weekend driving.",
          "Enter your vehicle's fuel consumption in litres per 100km. This figure appears in your vehicle's spec sheet and on the fuel economy sticker in the showroom. Real-world consumption is typically 10 to 20% higher than the manufacturer's stated figure. You can also calculate your actual consumption from your own driving: fill the tank, reset the trip meter, drive until you need to refuel, fill the tank again, and divide the litres pumped by the trip distance times 100.",
          "Enter the fuel price per litre. South Africa's fuel prices are regulated and updated on the first Wednesday of each month. Prices differ between 93 and 95 octane petrol, diesel, and provinces (inland prices are a few cents higher per litre than coastal prices due to transport costs). Check the current price at your local station or on the SAPIA (South African Petroleum Industry Association) website.",
          "Review the result. The calculator shows total litres needed and total cost. For a road trip, this helps you plan refueling stops. For fleet use, it gives the standard cost benchmark for each route.",
        ],
      },
      {
        heading: "South African Fuel Prices: What Goes Into the Cost",
        paragraphs: [
          "The South African fuel price has several components. The Basic Fuel Price (BFP) is based on international crude oil prices and the rand/dollar exchange rate. It is the most volatile component and the main reason prices change each month.",
          "Government levies make up a significant portion of the pump price. The General Fuel Levy, Road Accident Fund (RAF) levy, and Customs and Excise levy are fixed rand amounts per litre. In 2024/25, the General Fuel Levy is R3.96 per litre and the RAF levy is R2.18 per litre for 95 petrol. These levies do not change monthly; they are adjusted in the national budget.",
          "Margins are paid to petroleum companies (distribution margin), retailers (retail margin), and include dealer margins and wholesale margins. There is also a secondary storage and distribution cost for inland deliveries.",
          "Understanding this breakdown explains why pump prices are high even when crude oil is moderate: the fixed government levies represent a floor. It also explains why prices rise faster when the rand weakens than they fall when crude prices drop, since the BFP only affects part of the total price.",
        ],
      },
      {
        heading: "Fuel Efficiency and What Affects It",
        paragraphs: [
          "Vehicle age and maintenance are the biggest controllable factors. A poorly maintained engine, underinflated tyres, a clogged air filter, or dirty injectors can add 10 to 15% to fuel consumption. Regular services according to the manufacturer's schedule are the single best investment for fuel economy.",
          "Driving style has a measurable impact. Aggressive acceleration, high-speed driving (above 120km/h), and excessive braking all increase consumption. In South African conditions, where much urban commuting involves stop-start traffic, an automatic vehicle with a good torque converter or a hybrid drivetrain can produce meaningful savings.",
          "Air conditioning increases fuel consumption significantly in hot weather. At low speeds, having the windows open is more efficient. At highway speeds above about 80km/h, closed windows and air conditioning is more aerodynamically efficient than open windows.",
          "Vehicle load and aerodynamics matter. Carrying heavy loads, keeping a roof rack permanently mounted, or towing a trailer all increase consumption. A roof rack that adds 10kg and increases aerodynamic drag can add 3 to 5% to highway fuel consumption.",
        ],
      },
      {
        heading: "Fleet Management and Business Fuel Costs",
        paragraphs: [
          "South African businesses with commercial fleets face fuel as one of their top three operating costs alongside labour and insurance. Fleet managers typically track fuel consumption per vehicle per route and compare it against the calculated expected consumption to identify theft, poor driving habits, or mechanical issues.",
          "SARS allows businesses to claim fuel costs as a deductible expense when used for business purposes. For employees using private vehicles for business travel, the SARS prescribed rate per kilometre is used to calculate the allowable deduction or reimbursement, which was R4.84 per kilometre in 2024.",
          "GPS and telematics systems installed in fleet vehicles track routes, speeds, idle time, and actual fuel usage against the vehicle's expected consumption at those speeds. The data generated allows fleet managers to identify which drivers are costing more in fuel and to implement training or route optimisation that reduces costs.",
          "Diesel vehicles typically offer lower fuel costs per kilometre than petrol vehicles for high-mileage users. A fleet bakkie covering 40,000km per year at 8L/100km on diesel at R23/L costs R73,600 per year in fuel. The equivalent petrol at 10L/100km at R24/L would cost R96,000, a saving of R22,400 per year per vehicle.",
        ],
      },
      {
        heading: "Worked Examples",
        paragraphs: [
          "Example 1: Cape Town to Johannesburg road trip. Distance: 1,400km. Vehicle: 2L petrol consuming 8.5L/100km. Fuel needed: 119 litres. At R24.50 per litre (95 unleaded coastal): R2,916. Return trip: R5,832 total fuel cost. Two adults sharing: R2,916 each, which compares favourably against flights plus car hire.",
          "Example 2: Monthly commuting budget. Daily round trip: 32km. Working days: 22. Monthly distance: 704km. Vehicle consumption: 7.5L/100km. Monthly fuel: 52.8 litres. At R24/L: R1,267 per month. Annual fuel cost: R15,204.",
          "Example 3: Vehicle upgrade calculation. Current vehicle: 12L/100km petrol. New vehicle: 7L/100km diesel. Annual distance: 25,000km. Current annual fuel: 3,000L petrol at R24/L equals R72,000. New vehicle fuel: 1,750L diesel at R22.50/L equals R39,375. Annual saving: R32,625. Price premium for new vehicle: R120,000. Payback period: approximately 3.7 years.",
        ],
      },
    ],
    faqs: [
      {
        q: "How often does South Africa's fuel price change?",
        a: "Fuel prices are reviewed monthly and adjusted on the first Wednesday of each month. The adjustment is based on changes in the international oil price (in US dollars) and the rand/dollar exchange rate during the previous month's review period.",
      },
      {
        q: "What is the difference between 93 and 95 octane petrol?",
        a: "Octane rating measures fuel's resistance to knocking or pinging under compression. 95 octane is recommended for modern turbocharged or high-compression engines. 93 octane is suitable for standard engines. Coastal areas (below 300m altitude) use 93 and 95 octane; inland areas (above 300m) use a different grade labelled 93 and 95 inland, which is different from the coastal versions due to different blending requirements at altitude. Always use the grade specified in your vehicle's owner manual.",
      },
      {
        q: "Why is petrol cheaper at coastal filling stations than inland ones?",
        a: "A portion of the pump price covers inland transport from the coastal refineries (Engen in Durban and Astron Energy in Cape Town) to inland depots. This transport cost 'zone premium' is added to inland prices and is reviewed periodically based on transport costs.",
      },
      {
        q: "How do I calculate my vehicle's actual fuel consumption?",
        a: "Fill the tank completely, reset the trip odometer to zero. Drive normally until you need to refuel, then fill the tank completely again. Note the litres added (from the pump) and the distance shown on the trip odometer. Divide litres by distance and multiply by 100. For example: 45 litres added after 520km equals 45/520 x 100 equals 8.65L/100km.",
      },
      {
        q: "Does fuel cost change on public holidays?",
        a: "No. The government-regulated pump price is fixed for the entire month and does not change on holidays or weekends. However, some unregulated components like certain retailer margins can vary slightly between filling stations.",
      },
      {
        q: "Is diesel cheaper than petrol in South Africa?",
        a: "Yes, diesel is typically priced lower per litre than 95 octane petrol in South Africa, often by R1 to R2 per litre depending on the month. However, diesel vehicles typically cost more to purchase and service. The total cost of ownership depends on annual mileage and vehicle type.",
      },
      {
        q: "Can I claim fuel expenses on my tax return?",
        a: "If you use your vehicle for business travel and receive a travel allowance, or if you are a sole proprietor, you can claim fuel expenses proportional to business use. Employees with a travel allowance must keep a logbook recording all business trips to substantiate their claim. SARS provides a fixed rate per km as an alternative for those who do not keep a logbook.",
      },
      {
        q: "How much does towing a trailer affect fuel consumption?",
        a: "Towing significantly increases fuel consumption, typically by 20 to 50% depending on the weight and aerodynamics of the trailer and vehicle. A bakkie rated at 10L/100km unladen might consume 13 to 15L/100km when towing a caravan or boat trailer.",
      },
      {
        q: "What is the fuel levy and why is it charged?",
        a: "The General Fuel Levy is a government tax on fuel used primarily for road infrastructure and general revenue. The Road Accident Fund levy funds compensation to road accident victims. Both are fixed rand amounts per litre included in the pump price. They account for roughly R6 of every litre of petrol sold in South Africa.",
      },
      {
        q: "How can I reduce my monthly fuel costs without changing my vehicle?",
        a: "Ensure tyres are inflated to the correct pressure (underinflated tyres increase rolling resistance and fuel use). Avoid aggressive acceleration and braking. Service the vehicle regularly. Reduce unnecessary weight in the vehicle. Plan routes to avoid heavy traffic where possible. Use cruise control on highways. Switch off the engine rather than idling for more than two minutes.",
      },
    ],
  },

  pool: {
    title: "Pool Calculator: Complete Guide",
    intro: [
      "Building or maintaining a swimming pool in South Africa involves a surprising number of calculations that, if skipped, can result in costly mistakes. Too little water volume data leads to incorrect chemical dosing. Poor capacity planning leads to inadequate filtration. An underestimated surface area leads to incorrect amounts of paving, coping, or liner material being purchased.",
      "TrufflShuffl's Pool Calculator helps you work out the volume of your pool, estimated material costs for building, and ongoing chemical requirements. This guide explains every aspect of the calculation and covers the South African pool industry, typical costs, and what to do with the results.",
    ],
    sections: [
      {
        heading: "When to Use the Pool Calculator",
        paragraphs: [
          "Use it before submitting a pool building quote to a contractor. Knowing the approximate volume of the proposed pool allows you to estimate ongoing chemical costs and check whether the pool volume matches what the contractor is quoting. A 50,000-litre pool requires different filtration, chemical volumes, and ongoing maintenance costs than a 70,000-litre pool, and a contractor mistakenly building the wrong size would have measurable financial consequences.",
          "Use it when starting to maintain an existing pool whose dimensions you know but volume has never been formally calculated. Without knowing the volume, chemical dosing is guesswork, which leads to either over-treatment (wasted chemicals, potential skin irritation, equipment damage) or under-treatment (algae growth, cloudy water, health risks).",
          "Use it when comparing the cost of a larger versus smaller pool. The ongoing chemical and water heating costs scale directly with volume, so the long-term cost of a larger pool is meaningfully higher than a smaller one, even if the upfront construction cost difference is modest.",
          "Use it when calculating how much time the filter pump needs to run daily. A properly sized pump should turn over the pool volume at least two times per day. Knowing the volume helps you select the right pump size and set an appropriate run time.",
        ],
      },
      {
        heading: "How to Use the Pool Calculator",
        paragraphs: [
          "Enter the pool dimensions. For a rectangular pool, enter the length, width, and average depth. The average depth is used because most pools are deeper at one end than the other; average the shallow and deep end measurements. For a Roman-end or kidney-shaped pool, use the longest and widest measurements and apply a shape correction factor (the calculator handles this).",
          "Select the pool shape. Options typically include rectangular, oval, and L-shaped. The shape factor adjusts the volume calculation to account for the fact that non-rectangular pools have less volume than their overall dimensions suggest.",
          "Review the volume calculation. The result is shown in litres, which is the unit used for all pool chemical dosing. A typical South African residential pool ranges from 40,000 to 80,000 litres, with 50,000 to 60,000 being the most common for a standard backyard installation.",
          "Use the volume to calculate ongoing costs. Most pool chemicals are dosed per 10,000 litres. A 50,000-litre pool needs five times the dose stated for 10,000 litres. This affects your monthly chemical budget directly.",
        ],
      },
      {
        heading: "The South African Pool Market",
        paragraphs: [
          "South Africa has one of the highest rates of residential pool ownership in the world. In areas like Johannesburg, Pretoria, Cape Town, and Durban, pools are a standard feature of properties in suburban and upmarket markets. This is partly driven by the climate and partly by the social culture around outdoor living.",
          "Pool construction in South Africa typically falls into three categories: fibreglass shell pools, plastered concrete pools, and vinyl liner pools. Fibreglass shells are the most common for new installations due to their durability, smooth surface (which requires less chemical to maintain), and relatively quick installation time of two to four weeks.",
          "Pool prices in 2025 start at around R80,000 to R120,000 for a small standard shape fibreglass pool including installation, filtration, and basic paving. Larger custom concrete pools with features like heating, waterfalls, and vanishing edges can exceed R500,000.",
          "Municipal water restrictions in many South African cities affect pool filling and topping up. During Level 3 and above restrictions, filling a new pool or topping up by more than a set amount per week may be prohibited. Always check current restrictions before planning a pool build or fill.",
        ],
      },
      {
        heading: "Chemical Requirements and Water Balance",
        paragraphs: [
          "Pool water chemistry requires maintaining a balance of several parameters simultaneously. The main ones are free chlorine (1 to 3 ppm), pH (7.2 to 7.6), total alkalinity (80 to 120 ppm), calcium hardness (200 to 400 ppm), and cyanuric acid (30 to 50 ppm for outdoor pools).",
          "Chlorine is the primary sanitiser and is available in granular, liquid, or slow-release tablet form. Granular chlorine (calcium hypochlorite at 65 to 70% active chlorine) is the most common in South Africa. Dosage for a 50,000-litre pool is approximately 200g to 250g per week under normal conditions, rising significantly after heavy use or rain.",
          "pH is the most frequently adjusted parameter. Rainfall, bather load, and chlorine addition all affect pH. pH increaser (sodium carbonate) and pH reducer (sodium bisulphate) are the adjustment chemicals. Incorrect pH reduces chlorine effectiveness and can cause eye and skin irritation.",
          "Algaecide is used as a preventive treatment weekly in summer and fortnightly in winter. Without regular algaecide treatment, combined with adequate chlorine and filtration, algae growth can take hold rapidly in South Africa's warm, sunny conditions.",
        ],
      },
      {
        heading: "Industries and Professionals That Use Pool Calculations",
        paragraphs: [
          "Pool builders and installers calculate volumes to spec filtration systems and quote for construction projects accurately. The pump and filter must be sized appropriately for the pool volume, with the filter able to process the full volume at least twice in 24 hours.",
          "Pool maintenance companies use volume data to prepare chemical treatment schedules and quote for ongoing service contracts. A maintenance company servicing 50 pools per week needs to know the volume of each pool to load the correct chemical amounts into their service vehicle.",
          "Pool equipment suppliers (pumps, heaters, salt chlorinators) rate their products by the volume of pool they are designed to handle. A salt chlorinator for a 50,000-litre pool is not the correct size for a 90,000-litre pool, and oversizing or undersizing has significant consequences for water quality and equipment lifespan.",
          "Real estate agents and property valuers note pool size as a variable in property valuation, particularly in higher-value properties. A pool that is too small for the garden or property size can actually detract from value, while a well-maintained pool of the right proportions adds measurable value in most South African property markets.",
        ],
      },
      {
        heading: "Worked Examples",
        paragraphs: [
          "Example 1: Standard rectangular pool 8m x 4m with shallow end 1.2m and deep end 1.8m. Average depth: 1.5m. Volume: 8 x 4 x 1.5 equals 48,000 litres. Weekly chlorine dose (normal conditions): 200g. pH increaser/reducer: approximately 100g of adjustment chemical per week depending on conditions. Monthly chemical budget: approximately R400 to R600 per month.",
          "Example 2: Kidney-shaped pool with maximum dimensions 9m x 5m, average depth 1.4m. Shape factor for kidney: approximately 0.85. Effective volume: 9 x 5 x 1.4 x 0.85 equals 53,550 litres. Filtration pump run time (minimum twice daily turnover): If pump flow rate is 250L/min, turnover of 53,550L takes 3.57 hours. Run the pump at least 7.5 hours per day for two full turnovers.",
          "Example 3: Cost comparison between a 40,000-litre pool and a 65,000-litre pool. Additional chemical cost per month: approximately R250 to R300. Additional heating cost per month (for a gas heater used seasonally): approximately R400 to R600 per month heated season. Additional water top-up cost annually: approximately R200 to R400 depending on evaporation and rainfall. The larger pool costs R10,000 to R14,000 more in ongoing operating costs over 10 years.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I calculate my pool volume?",
        a: "For a rectangular pool: multiply length x width x average depth, then multiply by 1,000 to get litres. Average depth is the average of the shallow and deep end depths. For example, 8m x 4m x 1.5m = 48 cubic metres = 48,000 litres.",
      },
      {
        q: "How much does it cost to fill a pool in South Africa?",
        a: "Municipal water charges vary by city and consumption tier. In Johannesburg, water in the higher tariff tiers costs approximately R30 to R45 per kilolitre (1,000 litres) depending on your usage band. A 50,000-litre pool costs R1,500 to R2,250 in water alone, before any connection fees or surcharges. Check your municipality's current tariff schedule for accurate figures.",
      },
      {
        q: "What size pump do I need for my pool?",
        a: "The pump should be able to turn over the entire pool volume at least twice in 24 hours. For a 50,000-litre pool, that means moving 100,000 litres per day, or about 70 litres per minute. A standard 0.75kW pump moves about 200 to 250 litres per minute, which is more than adequate and allows you to run the pump for fewer hours per day.",
      },
      {
        q: "Can I use borehole water to fill my pool?",
        a: "Yes, but borehole water needs to be tested first. Borehole water often has high iron, calcium, or other mineral content that can stain pool surfaces or affect water chemistry significantly. Filtering borehole water before adding it to the pool and adjusting chemistry afterward is essential.",
      },
      {
        q: "How much does a pool heater cost to run in South Africa?",
        a: "An electric heat pump (the most efficient option) for a 50,000-litre pool costs approximately R1,500 to R3,000 per month to run during winter months at current electricity tariffs, depending on your municipality and the heat pump's COP rating. A gas heater runs faster but costs more per month. Solar heating has low running costs but high upfront installation cost.",
      },
      {
        q: "How often should I test my pool water?",
        a: "At minimum, test chlorine and pH twice per week during summer and once per week during winter. After heavy rain or high bather loads (a pool party), test and adjust the same day. Full testing including alkalinity and calcium hardness should be done monthly or when you notice the pool is using more chemicals than usual.",
      },
      {
        q: "What causes green water and how do I fix it?",
        a: "Green water is almost always algae growth, caused by insufficient chlorine (typically below 1 ppm), incorrect pH reducing chlorine effectiveness, insufficient filtration run time, or lack of regular algaecide treatment. To fix it: shock the pool with a triple dose of chlorine, run the filter continuously for 24 hours, brush the walls and floor, and add algaecide. Test and balance all parameters before allowing swimmers back in.",
      },
      {
        q: "Does a salt water pool save money on chemicals?",
        a: "A salt chlorinator generates chlorine from dissolved salt (sodium chloride), eliminating the need to manually add chlorine. The salt costs approximately R500 per 25kg bag for the initial fill, and small top-ups are needed annually. Electricity to run the cell and the cost of replacing the cell every 3 to 7 years are the main costs. Total chemical cost savings versus granular chlorine are typically R300 to R600 per year for a standard pool.",
      },
      {
        q: "How deep should a residential pool be?",
        a: "Most South African residential pools have a shallow end of 1.0 to 1.2 metres and a deep end of 1.5 to 2.0 metres. For a diving pool, the deep end must be at least 2.4 metres directly below the diving board. For pools without a diving board, a maximum depth of 1.8 metres is common. Shallower pools are cheaper to build and maintain but less suitable for adult swimmers.",
      },
      {
        q: "Does a pool add value to a property?",
        a: "In most South African suburbs, a well-maintained pool adds value, typically estimated at 5 to 10% of property value in swimming pool-friendly markets. However, a poorly maintained, green, or structurally damaged pool can reduce value because buyers factor in the cost of bringing it up to standard. Location also matters: a pool adds more value in Johannesburg (where summers are hot but winters are cool) than in Cape Town (where pools are used for a shorter season).",
      },
    ],
  },

  paving: {
    title: "Paving Calculator: Complete Guide",
    intro: [
      "Paving a driveway, pathway, or outdoor entertainment area is one of the most common home improvement projects in South Africa, and one where accurate material estimation is critical. Order too few pavers and you delay the project waiting for a second delivery that may not match the batch. Order too many and you waste money on materials that sit unused.",
      "TrufflShuffl's Paving Calculator handles the area and material quantity calculations. This guide explains how to use it correctly, what factors affect total project cost in South Africa, and how to approach a paving project from planning to completion.",
    ],
    sections: [
      {
        heading: "When to Use the Paving Calculator",
        paragraphs: [
          "Use it when planning any hard surface project: driveway, patio, garden path, pool surround, or courtyard. Getting the square meterage right before approaching suppliers lets you compare quotes accurately and avoid being oversold.",
          "Use it when a supplier gives you a price per square metre and you need to calculate the total material cost. Paving blocks in South Africa are typically priced per square metre for installation or per unit for supply-only. The calculator converts your area into the quantities and costs you need.",
          "Use it to compare different paving materials. Concrete pavers, clay brick pavers, exposed aggregate, and natural stone all have different prices per square metre and different wastage rates. Modelling each option with the same area gives you a direct cost comparison.",
          "Use it when planning access road paving for a smallholding, complex, or commercial property where large areas are involved and material wastage can be a significant cost.",
        ],
      },
      {
        heading: "How to Use the Paving Calculator",
        paragraphs: [
          "Measure the area to be paved. For rectangular areas, this is straightforward: length x width in metres. For irregular shapes, break the area into rectangles and add them up, or use the trapezoidal approximation for angled edges.",
          "Enter the dimensions into the calculator. For multiple areas (such as a driveway plus a pathway), calculate each separately and add the results.",
          "Enter the paver dimensions or select from standard sizes. South African concrete pavers come in standard sizes: 200mm x 100mm x 50mm (most common), 210mm x 105mm x 50mm, and larger formats like 400mm x 200mm. The calculator uses these to determine how many units are needed per square metre.",
          "Add a wastage percentage. A 5% to 10% wastage factor is standard for straight rectangular areas. For curved areas, complex patterns (herringbone, basketweave), or areas requiring lots of cuts, use 10% to 15% wastage to ensure you have enough material.",
          "The calculator outputs total square metres, number of paver units needed, and estimated material cost at your entered price per unit or per square metre.",
        ],
      },
      {
        heading: "Paving Materials Available in South Africa",
        paragraphs: [
          "Concrete pavers are the most widely used paving material in South Africa. They are manufactured locally, available in many colours and textures, and suitable for most residential applications. Standard 50mm pavers are suitable for pedestrian use and light vehicle traffic (passenger cars). 60mm or 80mm pavers are recommended for driveways with regular vehicular use.",
          "Clay brick pavers offer a warmer, more traditional aesthetic and are extremely durable. They are more expensive than concrete pavers (typically R85 to R150 per square metre versus R45 to R80 for concrete), but their colour is baked-in rather than surface-applied, meaning they do not fade over time.",
          "Exposed aggregate concrete is a popular choice for driveways and pool surrounds. It provides a non-slip surface and a speckled, natural stone appearance. It is typically installed by specialised contractors and priced per square metre including installation.",
          "Natural stone (granite, slate, sandstone, cobblestone) is used in higher-end applications. Prices vary widely from R150 to R600 per square metre depending on the stone type and thickness. Granite and slate are durable and weather-resistant; sandstone is more affordable but softer.",
          "Porcelain and large-format tiles are increasingly used in outdoor applications in South Africa. They are frost-resistant, low-maintenance, and available in natural stone looks. However, they require a professional installation and are not suitable for uneven substrates.",
        ],
      },
      {
        heading: "Cost Breakdown for a South African Paving Project",
        paragraphs: [
          "Material costs for concrete pavers range from R45 to R80 per square metre for supply only, depending on the brand, thickness, and finish. Adding delivery (typically R500 to R1,500 depending on distance) and any cutting waste means your material cost per completed square metre is somewhat higher than the unit price suggests.",
          "Preparation costs can be the largest component of a paving project. If the area needs to be excavated, levelled, and compacted properly, preparation can cost R150 to R300 per square metre. A well-prepared base (150mm compacted G5 or crusher dust, properly shaped for drainage) is what makes paving last for decades versus cracking and shifting within a few years.",
          "Labour for laying pavers runs from R80 to R180 per square metre depending on the pattern complexity, access, and the contractor's experience level. Herringbone patterns take longer than running bond and cost more. Cutting around curves and features also increases labour time.",
          "Total installed cost for a standard concrete paver driveway in South Africa typically falls between R350 and R600 per square metre, including preparation, materials, and labour. Higher-end materials, complex patterns, or sites requiring more preparation work increase this range.",
        ],
      },
      {
        heading: "Industries and Applications for Paving Calculations",
        paragraphs: [
          "Residential property development uses paving calculations for every stand in a new development. The paving allowance in a turnkey build quote is based on precise area calculations, and any discrepancy between the quoted area and the actual area can result in contract disputes.",
          "Commercial and industrial construction uses paving calculations for parking lots, loading areas, internal roadways, and pedestrian zones. Large commercial paving projects may involve tens of thousands of square metres, where even a 2% error in estimation represents a significant cost overrun.",
          "Landscape architects and garden designers use paving calculations when preparing detailed bills of quantities (BOQ) for client proposals. A professionally presented BOQ with accurate quantities builds client confidence and protects the contractor from disputes.",
          "Property maintenance companies manage large portfolios of retail centres, housing complexes, and commercial parks where paving replacement or repair requires accurate area measurement and material costing.",
        ],
      },
      {
        heading: "Worked Examples",
        paragraphs: [
          "Example 1: Double driveway, 6m wide x 12m long. Area: 72 square metres. Add 10% wastage for cuts at the edges: effective paver requirement for 79.2 square metres. Using 200x100mm pavers at 50 pavers per square metre: 3,960 pavers. At R2 per paver: R7,920 in material. Preparation and labour at R400 per square metre: R28,800. Total installed cost: approximately R36,720.",
          "Example 2: Patio and garden path, irregular shape estimated at 45 square metres. Using clay brick pavers at R120 per square metre. Material: 45 x R120 equals R5,400. Plus 10% wastage = R5,940. Preparation at R200 per square metre: R9,000. Labour at R130 per square metre: R5,850. Total: R20,790.",
          "Example 3: Large complex parking area, 800 square metres. Using 60mm concrete pavers at R65 per square metre (bulk price). Material: R52,000. Preparation (already tar-based, requires only resurfacing): R80 per square metre: R64,000. Labour at R100 per square metre: R80,000. Total: R196,000. At a standard R350/sqm total price, the same area would cost R280,000, so the complex achieves R84,000 in savings through volume purchasing.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many 200x100mm pavers are needed per square metre?",
        a: "A 200x100mm paver has an area of 0.02 square metres. Without joint gaps, you would need exactly 50 per square metre. With standard 5mm joint gaps, the effective unit area increases to 205x105mm (0.02153 square metres per unit with joints), which still works out to approximately 46 to 48 pavers per square metre. Manufacturers typically rate their pavers at 50 per square metre for simplicity.",
      },
      {
        q: "How deep should the base be for a residential driveway?",
        a: "The standard recommendation for a residential driveway (passenger vehicles only) is 150mm of compacted G5 gravel (sub-base) plus 25 to 40mm of crusher dust or bedding sand. The pavers themselves add another 50 to 80mm. Total depth from finished surface to natural ground is typically 225 to 270mm. Higher traffic applications require deeper and stronger bases.",
      },
      {
        q: "What is the difference between a brick paver and a cobblestone?",
        a: "A brick paver is a manufactured, consistently sized unit (either clay or concrete) designed for flat installation with a smooth or textured top surface. A cobblestone is a natural rounded stone, typically granite, used for a rustic aesthetic. Cobblestones vary in size and shape, making installation slower and more expensive per square metre. Both are durable but cobblestones are harder to keep clean.",
      },
      {
        q: "How do I calculate the area of an irregular shaped paving project?",
        a: "Break the irregular shape into simpler shapes: rectangles, triangles, or circles. Calculate the area of each component and add them together. For example, an L-shaped area can be divided into two rectangles. For a circular area, use pi x radius squared. Add all component areas for the total. Add your wastage factor (10 to 15%) to the total.",
      },
      {
        q: "Do I need planning permission to pave my driveway?",
        a: "Paving within your property boundary typically does not require building plans or municipal permission in South Africa. However, if you are widening a driveway entrance that requires cutting into the kerb or affecting a municipal footpath, you may need approval from the municipality. Some homeowners' associations also have aesthetic guidelines that affect paving material and colour choices.",
      },
      {
        q: "What is the best pattern for a paving installation?",
        a: "For residential driveways, herringbone (45 or 90 degrees) is recommended because it interlocks the pavers and distributes load well, reducing the chance of individual pavers cracking under vehicle weight. Running bond (brickwork pattern) is simpler and faster to lay but slightly less strong under vehicular load. For patios and pedestrian areas, any pattern works well.",
      },
      {
        q: "How long does a concrete paver driveway last?",
        a: "A properly installed concrete paver driveway on a correct base will last 20 to 40 years with minimal maintenance. Individual pavers can be replaced if damaged without disturbing the entire surface, unlike asphalt or concrete. Clay brick pavers typically outlast concrete pavers and can exceed 40 years in good condition.",
      },
      {
        q: "Can I pave over an existing concrete slab?",
        a: "Yes. Paving over an existing slab is possible if the slab is structurally sound and level. Pavers are bedded on a 25mm to 40mm layer of dry mortar or bedding sand on top of the slab. The main consideration is the additional height, which may affect drainage or drainage of water from adjacent surfaces. Also ensure any expansion cracks in the existing slab do not reflect through to the paver surface.",
      },
      {
        q: "What causes pavers to become uneven over time?",
        a: "The most common causes are inadequate base compaction, tree root intrusion, water erosion of the bedding layer (usually from poor drainage design), and vehicle overloading. Pavers can be lifted, the base repaired, and they can be re-laid, which is one of the key advantages of paved surfaces over poured concrete.",
      },
      {
        q: "Is it cheaper to pave or pour a concrete slab for a driveway?",
        a: "Poured concrete slabs are generally cheaper in material cost per square metre, but the savings are partly offset by the fact that damaged concrete must be broken out and replaced entirely (higher repair cost). Concrete pavers are slightly more expensive upfront but offer repairability, better aesthetics, and faster installation with less curing time. For premium properties, pavers are almost always the preferred choice.",
      },
    ],
  },

  renovation: {
    title: "Renovation Calculator: Complete Guide",
    intro: [
      "Home renovation is one of the most exciting and financially consequential projects a South African homeowner undertakes. Whether you are updating a kitchen, adding a bathroom, extending the house, or converting a garage, the gap between initial budget and final cost is a persistent problem that ruins projects and strains relationships.",
      "TrufflShuffl's Renovation Calculator helps you build a realistic budget before you start. This guide explains the cost components of different renovation types, what drives cost overruns, how to use the calculator, and what professionals to involve at each stage of a project.",
    ],
    sections: [
      {
        heading: "When to Use the Renovation Calculator",
        paragraphs: [
          "Use it at the very beginning of the planning process, before you speak to a single contractor. Having a realistic preliminary budget allows you to have informed conversations with contractors and avoid being surprised by quotes that exceed your expectations.",
          "Use it to compare the financial case for different renovation approaches. Is it worth adding a second bathroom, or would adding a study have a better return? The calculator helps you estimate each option and compare the improvement to your property value against the cost.",
          "Use it to set a contingency budget. Renovation projects almost always encounter unexpected costs: hidden moisture damage, non-standard structural elements, or supplier price increases. Building a contingency of 10 to 20% into your budget from the start prevents the panic of a budget shortfall mid-project.",
          "Use it when applying for a home improvement loan or accessing your access bond. Banks require a realistic cost estimate to approve renovation finance. A properly structured budget produced before contractor quotes gives you a credible basis for a finance application.",
        ],
      },
      {
        heading: "How to Use the Renovation Calculator",
        paragraphs: [
          "Enter the area of the renovation in square metres. For a kitchen, measure the floor area. For an addition or extension, use the floor plan area of the new space. For external work like paving or a stoep, measure the affected area.",
          "Select the renovation type. Different types of work have very different cost structures. A kitchen renovation costs significantly more per square metre than a simple room repaint because of the fitting of cabinetry, plumbing, and electrical work concentrated in a small area.",
          "Select the quality level: budget, mid-range, or high-end. This determines the cost per square metre applied in the calculation. Budget uses entry-level materials and basic fittings; mid-range uses quality branded materials; high-end uses premium materials, custom joinery, and specialist finishes.",
          "Review the output. The calculator gives a cost range rather than a single number, reflecting the natural variability in contractor pricing and material choices. Use the midpoint of the range as your planning budget and the upper end as your contingency ceiling.",
        ],
      },
      {
        heading: "Cost Ranges for Common South African Renovations",
        paragraphs: [
          "Kitchen renovation costs vary dramatically based on the size and quality of cabinetry, appliances, and finishes. For a standard 10 to 12 square metre kitchen, a budget renovation (flat-pack or RTA cabinets, standard tiles, mid-range appliances) costs R80,000 to R150,000. A mid-range renovation with quality custom cabinetry, stone counters, and built-in appliances runs R200,000 to R400,000. High-end kitchens with custom joinery, integrated appliances, and premium finishes start at R400,000 and can exceed R1 million.",
          "Bathroom renovation costs for a standard 4 to 6 square metre bathroom run from R40,000 to R80,000 budget (new sanitaryware, retile, basic fittings) to R120,000 to R250,000 for a mid-range renovation with a freestanding bath, frameless shower, and quality tiles. Full wet room conversions or en suites added from scratch (which include plumbing roughing-in) add to the base cost.",
          "Room additions (building a new room onto an existing house) cost R8,000 to R16,000 per square metre for the structure, depending on foundation requirements, roof type, and finishes. A 25 square metre study or bedroom addition costs R200,000 to R400,000 including windows, doors, and basic finishes, but excludes electrical, plumbing, and any impact on surrounding rooms.",
          "Painting a whole house interior (4-bedroom house, approximately 250 square metres of wall area) costs R30,000 to R60,000 for professional paint and application, depending on the number of colours, ceiling height, and condition of existing surfaces. Using premium paints (Plascon True Colour range, for example) adds to material cost.",
        ],
      },
      {
        heading: "What Drives Cost Overruns in South African Renovations",
        paragraphs: [
          "Scope creep is the most common cause of cost overruns. A homeowner decides to retile the bathroom floor, then adds the shower walls, then adds the basin area, and each addition that seems incremental to the homeowner represents a significant additional cost to the contractor. Define the scope precisely before work starts and put it in writing.",
          "Unforeseen structural or plumbing issues are particularly common in older South African homes. Asbestos roofing (common in homes built before 1980) requires certified removal. Old cast-iron or galvanised plumbing often needs full replacement when a bathroom is opened up. Termite or wood borer damage in timber roof structures can be expensive to address. A contingency of 10 to 15% should cover most of these.",
          "Material lead times and price changes can extend projects beyond their budgeted duration. Imported items (European fittings, specific tile formats, custom-order cabinetry) can have lead times of 8 to 16 weeks. Starting a project before all materials are confirmed on order is a common mistake that leads to delays and sometimes resequencing that increases labour costs.",
          "Poor contractor management leads to payment disputes, incomplete work, and defects that require expensive remediation. Always use a signed contract, pay in stages against clearly defined milestones, retain a percentage (typically 10%) for three to six months after completion as a defects retention, and conduct a thorough snag list inspection before releasing the final payment.",
        ],
      },
      {
        heading: "Professionals Involved in South African Renovations",
        paragraphs: [
          "A building contractor (also called a principal agent or main contractor) manages the full project including subcontractors. For projects above R200,000, using a principal contractor who assumes responsibility for all trades provides better accountability than managing multiple subcontractors yourself.",
          "An architect or architectural draughtsperson is required for any structural work (load-bearing walls, extensions, alterations to the building envelope). Building plans must be submitted to the local municipality and approved before structural work begins. Submitting after the fact is possible but costly.",
          "A quantity surveyor (QS) provides accurate bills of quantities and cost estimates based on architectural drawings. For projects above R500,000, engaging a QS significantly reduces the risk of budget overruns because their estimate is based on detailed take-offs from drawings rather than rough rates.",
          "An interior designer adds value to projects involving finishes, furniture, and space planning. Many South African interior designers charge on a percentage of the project cost (typically 8 to 15%) or on an hourly rate (R800 to R2,500 per hour). For kitchen and bathroom renovations especially, a designer's knowledge of suppliers and materials can save money and produce better results.",
        ],
      },
      {
        heading: "Worked Examples",
        paragraphs: [
          "Example 1: Mid-range kitchen renovation. Area: 12 square metres. Items: custom cabinets R65,000, stone countertop R28,000, tiles R8,000, tiling labour R5,000, plumbing updates R12,000, electrical R8,000, appliances R35,000, painting R4,000, project management R10,000. Total: R175,000. Per square metre: R14,583.",
          "Example 2: Garage conversion to guest suite. Area: 22 square metres. Items: insulation and ceiling R18,000, new windows and door R22,000, bathroom roughing-in and fitting R45,000, electrical R12,000, plastering and painting R20,000, flooring R15,000. Total: R132,000. Per square metre: R6,000. Addition of a mini kitchen increases this to approximately R160,000.",
          "Example 3: Full house interior repaint plus new flooring. Paint (4-bedroom house, 250m² wall area, two coats): R48,000 materials and labour. Laminate flooring to replace carpets in three bedrooms and lounge (90m²): R27,000 materials plus R14,000 labour equals R41,000. Total project: R89,000.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need building plans for interior renovation work?",
        a: "Building plans are required for any work that involves changes to the structure of the building (walls, roof, foundations) or changes of use (converting a garage to a habitable room). Interior cosmetic work like painting, tiling, and fitting new cabinetry that does not affect the structure generally does not require plans. When in doubt, call your local municipality's building plans office.",
      },
      {
        q: "How do I choose a reliable building contractor?",
        a: "Ask for a minimum of three recent references from completed projects of similar scope and budget. Visit at least one completed project in person. Check that the contractor is registered with the NHBRC (National Home Builders Registration Council) for new builds; for renovations, CIDB (Construction Industry Development Board) registration is relevant for larger projects. Always use a written contract and never pay more than 30% upfront.",
      },
      {
        q: "What is a reasonable contingency for a renovation project?",
        a: "For simple, well-defined projects with no structural work: 10%. For projects involving opening up walls, plumbing, or older homes: 15%. For complex multi-trade projects or heritage homes: 20%. The contingency should be budgeted and set aside before work starts, not invented on the fly when overruns occur.",
      },
      {
        q: "How do kitchen renovations affect property value?",
        a: "A quality kitchen renovation is consistently rated as one of the highest-return improvements in the South African property market. Studies suggest a well-executed kitchen renovation returns 50 to 75 cents per rand spent in added property value, meaning a R200,000 kitchen adds R100,000 to R150,000 of value in a relevant market. In a declining or flat market, returns are lower.",
      },
      {
        q: "How long does a kitchen renovation typically take?",
        a: "A standard kitchen renovation that involves removing old cabinetry, tiling, installing new cabinets, counters, and appliances takes 3 to 6 weeks from start to completion. If custom cabinetry is ordered, allow 4 to 8 weeks for manufacturing plus installation time. Projects delayed by missing materials or unavailable trades routinely run longer.",
      },
      {
        q: "Should I renovate before selling or sell as is?",
        a: "This depends on the magnitude of the renovation and the market. Cosmetic improvements like painting, new light fittings, and basic landscaping typically return more than their cost and improve saleability. Major renovations like kitchens and bathrooms in a property you are not living in are higher risk. Buyers of older homes often prefer a lower price and the ability to renovate to their own taste. Consult a local estate agent before committing to pre-sale renovation spending.",
      },
      {
        q: "What is NHBRC registration and why does it matter?",
        a: "The National Home Builders Registration Council (NHBRC) registers home builders and developers in South Africa. Registration provides homeowners with some protection through a warranty scheme on new builds. While registration is mandatory for new residential construction, it is not mandatory for renovations. For new builds or additions, working with an NHBRC-registered contractor is strongly recommended.",
      },
      {
        q: "Can I get VAT back on a home renovation?",
        a: "Individual homeowners cannot claim input VAT on home renovation costs, as residential homes are not income-generating assets for VAT purposes. However, if the property is used for business (a bed-and-breakfast, home office for a VAT-registered business, or a rental property operated by a VAT vendor), a portion of renovation costs may be claimable as input VAT. Consult a tax practitioner for your specific situation.",
      },
      {
        q: "Is it cheaper to renovate or rebuild from scratch?",
        a: "Rebuilding is generally more expensive per square metre than renovating, but renovation costs can approach rebuilding costs when extensive structural remediation is needed. The decision also depends on what you are saving by renovating (the existing structure, foundations, services) and what compromises you accept by not having a clean-slate design. For significantly deteriorated or non-standard structures, rebuilding sometimes makes better financial sense.",
      },
      {
        q: "What is the most cost-effective way to add value to a South African home?",
        a: "According to property professionals, the most cost-effective improvements in order are: painting and decluttering (best return per rand), improved landscaping and street appeal, kitchen and bathroom cosmetic updates (not full renovations), adding or improving outdoor living space (stoep, deck, braai area), and improving security. Full extensions and major structural work have higher absolute cost and take longer to recoup.",
      },
    ],
  },

  paint: {
    title: "Paint Calculator: Complete Guide",
    intro: [
      "Buying too little paint partway through a job means a second trip to a store where the matching colour may be from a different production batch, leaving visible colour differences on the wall. Buying too much wastes money on product that cannot be returned after being tinted. Getting the quantity right requires knowing the surface area, the number of coats, and the spreading rate of the specific paint you are using.",
      "TrufflShuffl's Paint Calculator does this calculation precisely. This guide explains how to measure correctly, how spreading rates work, what products are available in South Africa, and how to plan a painting project from start to finish.",
    ],
    sections: [
      {
        heading: "When to Use the Paint Calculator",
        paragraphs: [
          "Use it before buying paint for any painting project larger than a single room. The stakes are low for a single room (one or two cans of the wrong quantity), but for a full house interior or a commercial space, the financial and logistical consequences of getting the quantity wrong are significant.",
          "Use it when you are comparing the cost of different paint products. Premium paint covers more area per litre (higher spreading rate) and may require fewer coats. The calculator lets you input different spreading rates to see which product gives the lowest total cost for your specific area.",
          "Use it when quoting a painting job as a contractor. A professional painter should never quote based on guesswork. Using a systematic quantity calculation protects both your margin and your reputation.",
          "Use it when planning an exterior repaint. Exterior surfaces often require more paint due to porosity and typically need two full coats, sometimes three on very porous or previously unpainted surfaces. The stakes for underestimating an exterior job are higher because running short requires additional delivery logistics.",
        ],
      },
      {
        heading: "How to Use the Paint Calculator",
        paragraphs: [
          "Measure each wall surface to be painted. For a rectangular room, measure the width of each wall and the ceiling height, then add all four walls together and subtract the area of windows, doors, and built-in elements. A shortcut: for a standard room, perimeter x wall height minus 20% (for openings) gives a reasonable estimate.",
          "Enter the total surface area in square metres. For ceilings, add the floor area of the room. For external walls, measure the external perimeter x wall height and subtract windows and doors.",
          "Enter the spreading rate of the paint. Most South African interior wall paints specify a spreading rate on the can, typically between 8 and 12 square metres per litre for a first coat on a prepared surface. Higher-end paints have higher spreading rates, which affects the cost comparison.",
          "Enter the number of coats. Standard interior work requires two coats. Changing a dark colour to a light colour, or painting over a stain or water mark, may require three coats. Bare plaster always requires a primer coat plus two finish coats.",
          "The calculator outputs the total litres needed. Round up to the nearest can size (typically 1L, 5L, 20L) to determine what to purchase. Buy one can size above the calculated requirement as a safety margin.",
        ],
      },
      {
        heading: "South African Paint Brands and Product Categories",
        paragraphs: [
          "Plascon is the dominant South African paint brand, manufactured locally by Kansai Plascon. Their product range spans economy (Plascon 3-in-1), mid-range (Plascon Inspire), and premium (Plascon True Colour and Plascon Nurture) categories. Plascon True Colour is a washable, highly pigmented interior product with excellent coverage.",
          "Dulux (AkzoNobel South Africa) competes with Plascon at the mid-to-premium end of the market. Popular products include Dulux Washable Matt and Dulux Weathershield for exterior applications.",
          "Budget brands like Prominent Paints (found at certain hardware retailers) offer lower price points with generally lower spreading rates, meaning the per-square-metre cost savings may be smaller than the per-litre price difference suggests.",
          "Roof paints, waterproofing coatings, and exterior masonry paints are specialist categories with different spreading rates and application requirements from standard interior wall paints. The paint calculator works for these categories if you input the correct spreading rate from the product data sheet.",
          "Texture paints and specialty finishes (Venetian plaster, limewash, Japanese plaster) are applied differently and sold by coverage area rather than by spreading rate per litre. For these, the manufacturer's stated coverage per container is the quantity input to use.",
        ],
      },
      {
        heading: "Surface Preparation: The Step Most People Underestimate",
        paragraphs: [
          "Paint fails more often from poor surface preparation than from product quality. The most common surface prep tasks in South Africa are: filling and sanding cracks and holes, applying a sealer to new or repaired plaster, sanding and cleaning previously painted surfaces, applying a mould inhibitor where damp or mould has been present, and priming bare wood or metal before applying finish coats.",
          "New plaster must dry completely before painting. Standard cement plaster takes 28 days to cure fully, though in practice many painters start after two weeks if the plaster is not absorbing any visible moisture. New plaster should receive a diluted first coat (PVA sealer thinned 50% with water) to reduce suction before the first full coat is applied.",
          "On previously painted surfaces, the paint must be adhering well (no peeling or flaking), clean, and free of grease. Lightly sanding glossy surfaces improves adhesion of the new coat. Any mould must be treated with a bleach solution and allowed to dry completely before overpainting, otherwise the new paint will develop mould quickly regardless of whether you use a mould-resistant paint.",
          "In older South African homes, lead paint may be present on surfaces painted before 1996 when lead in paint was regulated. Sanding or stripping lead paint creates hazardous dust. If you suspect lead paint (typically thick layers on older woodwork, window frames, or walls), test before sanding and use certified methods for removal if confirmed.",
        ],
      },
      {
        heading: "Industries That Use Paint Calculations",
        paragraphs: [
          "Painting contractors are the primary professional users. A reputable painting business prepares detailed quantity calculations for every job, using the specifications to quote accurately and then to order materials without over-purchasing.",
          "Property developers calculate painting costs as part of their project cost models. On a large residential development with 50 units, even a small error in paint quantity calculation per unit multiplied across all units becomes a meaningful cost item.",
          "Facilities management teams at commercial properties, hospitals, schools, and government buildings maintain painting schedules and need to budget material costs years in advance. Accurate area calculations and spreading rate data are essential for these forward-looking budgets.",
          "Property agents and stylists advising clients on pre-sale renovations recommend specific painting tasks and need to present realistic cost estimates. A fresh paint job is consistently cited as one of the best return-on-investment improvements before a property sale.",
        ],
      },
      {
        heading: "Worked Examples",
        paragraphs: [
          "Example 1: Standard 3-bedroom house interior (lounge, dining, kitchen, 3 bedrooms, 2 bathrooms, 1 passage), total wall area approximately 350 square metres. Using Plascon Inspire at 10 square metres per litre, two coats: total paint required = 350 x 2 / 10 = 70 litres. In 5L cans: 14 cans. At R450 per 5L: R6,300 in materials.",
          "Example 2: Single 4m x 4m bedroom, ceiling height 2.4m. Wall area: (4+4+4+4) x 2.4 = 38.4 square metres. Less one standard door (1.8m²) and two standard windows (1.5m² each): 38.4 - 4.8 = 33.6 square metres. Plus ceiling: 4x4 = 16 square metres. Total: 49.6 square metres. At 10m²/L per coat, two coats: 9.92 litres. Buy two 5L cans: 10 litres. At R370 per 5L: R740.",
          "Example 3: Exterior repaint of a double-storey house. External wall area: approximately 280 square metres. Using Dulux Weathershield at 8 square metres per litre, two coats: 280 x 2 / 8 = 70 litres. Buy three 20L cans (60L) plus two 5L cans (10L) = 70L. 20L at R1,600 each (R4,800) plus 5L at R550 each (R1,100): R5,900 in exterior paint materials.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does 'spreading rate' mean on a paint tin?",
        a: "The spreading rate is the area that one litre of paint covers in one coat when applied at the correct thickness to a prepared surface. It is typically stated in square metres per litre on the product label. A higher spreading rate means you need fewer litres to cover the same area, which affects the real cost per square metre of different products.",
      },
      {
        q: "Do I need primer before painting walls?",
        a: "On new or repaired plaster, bare wood, or previously unpainted surfaces, a primer or sealer is essential. On sound previously painted surfaces in similar colour, a primer is not always needed, but a sealer-primer improves adhesion and coverage. When changing from a very dark to a very light colour, a tinted primer saves you from needing an extra finish coat.",
      },
      {
        q: "How many coats of paint does a wall need?",
        a: "Most interior repaints in similar colours require two coats. Bare or primed surfaces need at least two finish coats. Significant colour changes (dark to light, or bright to neutral) may need three coats. Two coats at proper spreading rate give better results than three thin, over-extended coats.",
      },
      {
        q: "How long should I wait between coats?",
        a: "Most South African acrylic paints are touch-dry in one to two hours and recoatable in two to four hours under normal conditions (20 to 25°C, normal humidity). In cold or humid conditions, wait longer. Never recoat in under two hours; the solvent from the new coat can soften the first coat and cause lifting.",
      },
      {
        q: "What is the difference between a matt, satin, and gloss finish?",
        a: "Matt finishes have no sheen and hide surface imperfections well, making them suitable for ceilings and walls in low-traffic areas. Satin and semi-gloss finishes have increasing levels of sheen and are more washable, making them better for kitchens, bathrooms, children's rooms, and high-traffic walls. Gloss paint is typically used on doors, trims, and woodwork.",
      },
      {
        q: "Should I use washable paint for children's rooms?",
        a: "Yes. A washable acrylic paint (typically semi-gloss or satin finish) is the practical choice for children's rooms, kitchens, and any surface likely to be touched or marked frequently. The slightly higher cost of a washable product is offset by the durability and ease of cleaning marks without removing the paint.",
      },
      {
        q: "How do I calculate the paint needed for a ceiling?",
        a: "The ceiling area is simply the floor area of the room (length x width). For a standard bedroom of 4m x 3.5m, the ceiling area is 14 square metres. At a typical spreading rate of 10m²/L for ceiling paint and two coats, you need 2.8 litres. Buy three 1L tins or one 5L tin (which gives you a useful reserve).",
      },
      {
        q: "What causes paint to peel?",
        a: "The most common causes are moisture in the wall or surface (new plaster not fully cured, rising damp, roof leak), applying paint over a glossy or contaminated surface without proper preparation, painting in cold or humid conditions, and using an incompatible product over a previously applied paint (for example, oil-based over water-based without priming).",
      },
      {
        q: "Is it worth hiring a professional painter or doing it yourself?",
        a: "For small projects (a single room), DIY painting is cost-effective and manageable. For whole house repaints, exterior work, or high-end finishes, professional painters produce a better result faster and the labour cost is often justified by the quality difference. Professional painters in South Africa typically charge R30 to R80 per square metre for labour on wall painting, depending on the region and complexity.",
      },
      {
        q: "How do I dispose of unused paint in South Africa?",
        a: "Unused water-based (acrylic) paint can be left to dry out in an open container, then disposed of with general waste. Do not pour liquid paint down the drain or into soil. Unwanted paint in good condition can be donated to community organisations, schools, or Paintback (a South African take-back scheme where available). Oil-based paint and solvents are hazardous waste and must be taken to a registered hazardous waste facility.",
      },
    ],
  },

  calories: {
    title: "Calorie Calculator: Complete Guide",
    intro: [
      "Understanding how many calories your body needs is the foundation of any intentional approach to weight management or fitness. You do not need to obsessively count every calorie to benefit from this knowledge. Even a rough understanding of your daily energy requirement helps you make better food choices, understand why certain diets work (or fail), and set realistic expectations for weight loss or muscle gain.",
      "This guide explains how TrufflShuffl's Calorie Calculator works, what Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) mean, how calorie balance translates to weight change, and which industries in South Africa work with calorie data professionally.",
    ],
    sections: [
      {
        heading: "When to Use the Calorie Calculator",
        paragraphs: [
          "Use it at the start of a weight management or fitness plan to establish your baseline. Before you can create a meaningful calorie deficit or surplus, you need to know how many calories you currently need to maintain your weight. This is your starting point for everything.",
          "Use it when your circumstances change. Significant weight loss or gain, a change in activity level (starting a new exercise routine, changing from a desk job to a physical one), pregnancy, or ageing all affect your calorie needs. Recalculate every 5 to 10 kilograms of weight change.",
          "Use it to understand why a particular diet or eating pattern is or is not working. If you are losing weight at an unexpected rate (too fast or too slow), comparing your estimated calorie intake against your calculated TDEE helps identify whether the intake tracking or the TDEE estimate is off.",
          "Use it to set realistic weight loss goals. Safe, sustainable weight loss is typically 0.5 to 1 kg per week, which requires a daily deficit of roughly 500 to 1,000 calories. The calculator shows your maintenance calories so you can work out what intake level produces this deficit.",
        ],
      },
      {
        heading: "How to Use the Calorie Calculator",
        paragraphs: [
          "Enter your age, gender, weight (in kg), and height (in cm). These inputs feed into the Mifflin-St Jeor equation (the most accurate widely-used BMR formula), which calculates your Basal Metabolic Rate: the calories your body burns at complete rest to sustain basic physiological functions.",
          "Select your activity level. The options range from sedentary (desk job, little or no exercise) to very active (physical labour job and regular intensive training). Choosing the correct activity level is the biggest source of error in calorie calculations; most people underestimate their activity level on exercise days and overestimate on rest days. Using 'lightly active' to 'moderately active' is appropriate for most South African office workers who exercise three to four times per week.",
          "Select your goal: maintain weight, lose weight (mild deficit), lose weight (moderate deficit), or gain weight (muscle building surplus). The calculator applies the appropriate calorie adjustment to your TDEE.",
          "Review the outputs: BMR (calories at rest), TDEE (total calories needed for current activity), and target calories for your goal. The macronutrient split (protein, carbohydrates, fats) gives you a starting framework for food planning.",
        ],
      },
      {
        heading: "Understanding BMR and TDEE",
        paragraphs: [
          "BMR (Basal Metabolic Rate) is the number of calories your body burns in a completely rested state: lying still, not digesting food, at comfortable temperature. It represents the energy needed to keep your organs functioning, maintain body temperature, and support cellular processes. For most people, BMR accounts for 60 to 75% of total daily energy expenditure.",
          "TDEE (Total Daily Energy Expenditure) is your total calorie burn including activity. It is calculated by multiplying your BMR by an activity factor. A sedentary person has a TDEE of approximately 1.2 x BMR. A lightly active person is 1.375 x BMR. Moderately active is 1.55 x BMR. Very active is 1.725 x BMR. Extremely active (athlete-level) is 1.9 x BMR.",
          "The activity factor is where most people diverge from their actual needs. South African office workers who commute by car, sit at a desk all day, and do a 45-minute gym session three times per week are 'lightly active', not 'very active'. Overestimating activity level leads to overestimating TDEE and then overeating relative to actual needs.",
          "TDEE also includes the Thermic Effect of Food (TEF), which is the calories burned digesting and processing food. Protein has a higher TEF (25 to 30% of its calories are burned in digestion) than carbohydrates (6 to 8%) or fat (2 to 3%). This is one reason high-protein diets tend to slightly increase effective calorie burn.",
        ],
      },
      {
        heading: "Calorie Balance and Weight Change",
        paragraphs: [
          "The fundamental principle of body weight management is energy balance: calories in versus calories out. If you consistently eat more calories than you burn (calorie surplus), you gain weight. If you consistently eat fewer calories than you burn (calorie deficit), you lose weight. The size of the daily deficit or surplus determines the rate of change.",
          "A common estimate is that one kilogram of body fat contains approximately 7,700 calories. A consistent daily deficit of 500 calories should therefore produce approximately 0.5 kg of fat loss per week. In practice, the relationship is not perfectly linear because metabolic adaptation, water retention changes, and muscle changes all affect the scale, but the principle holds over time.",
          "Very aggressive deficits (below 1,200 calories per day for women or 1,500 for men) cause rapid weight loss initially but also trigger metabolic adaptation, muscle loss, and hormonal changes that make weight maintenance harder after the diet ends. A moderate deficit of 20 to 25% below TDEE is the generally recommended approach for sustainable results.",
          "Calorie quality matters alongside quantity. Two people eating the same number of calories can have very different health outcomes if one eats highly processed food and the other eats primarily whole foods. This is because whole foods provide more fibre, micronutrients, and satiety per calorie, which makes the eating pattern easier to maintain.",
        ],
      },
      {
        heading: "Nutrition Context in South Africa",
        paragraphs: [
          "South Africa faces a 'double burden' of malnutrition: significant populations are both undernourished and overnourished. Obesity rates in South Africa are among the highest in sub-Saharan Africa, particularly among adult women. At the same time, micronutrient deficiencies (iron, zinc, vitamin A) remain prevalent in lower-income communities.",
          "The South African food environment is heavily influenced by ultra-processed food, with high-energy, low-nutrient foods broadly available and affordable. Staple foods like maize meal (pap), white bread, and rice form the base of many South African diets and are high in carbohydrates with relatively low protein and micronutrient density.",
          "Popular South African foods like braai meat, boerewors, biltong, and vetkoek vary significantly in calorie density. Boerewors has approximately 280 calories per 100g; biltong (beef jerky) has approximately 240 calories per 100g but is much denser in protein. Vetkoek has approximately 300 to 350 calories per piece depending on size and filling.",
        ],
      },
      {
        heading: "Industries That Work With Calorie Data",
        paragraphs: [
          "Healthcare and clinical nutrition: Registered dietitians in South Africa use energy expenditure calculations as the starting point for medical nutrition therapy. Patients with diabetes, cardiovascular disease, obesity, and eating disorders all require individualised calorie targets as part of their treatment plans.",
          "Sports science and performance coaching: Sports scientists at South African universities and high-performance sports programs calculate athletes' calorie needs based on training loads. Elite South African athletes in rugby, cricket, athletics, and swimming have highly individualised nutrition plans.",
          "Food manufacturing and labelling: South African food companies are required under SANS 10058 and the Foodstuffs, Cosmetics and Disinfectants Act to display nutritional information including energy content (in kilojoules) on packaged food. The conversion factor is 1 kilocalorie equals 4.184 kilojoules.",
          "Corporate wellness programs: Many large South African employers now run wellness programs that include nutritional guidance and often involve health risk assessments that include body composition and dietary intake analysis.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between calories and kilojoules?",
        a: "Calories and kilojoules (kJ) are both units of energy. In nutrition, 'calories' refers to kilocalories (kcal). One kilocalorie equals 4.184 kilojoules. South African food labels display energy in kilojoules (kJ) as required by law. To convert: multiply kJ by 0.239 to get kcal, or multiply kcal by 4.184 to get kJ.",
      },
      {
        q: "How accurate is the calorie calculator?",
        a: "The Mifflin-St Jeor equation (used by the calculator) predicts BMR within about 10% for most people. The bigger source of variation is the activity multiplier; activity levels are hard to estimate accurately. Use the calculator result as a starting point, track your actual weight change over 2 to 3 weeks, and adjust the calorie target based on what actually happens to your weight.",
      },
      {
        q: "How many calories should I eat to lose 1kg per week?",
        a: "One kilogram of fat contains approximately 7,700 kcal. To lose 1kg per week, you need a weekly deficit of 7,700 kcal, which means eating 1,100 fewer calories per day than you burn. This is achievable for some people but aggressive for most. A more sustainable approach is a 500-calorie daily deficit for 0.5kg per week loss.",
      },
      {
        q: "Why do men need more calories than women?",
        a: "Men typically have more muscle mass and a larger body size, both of which increase BMR. Muscle tissue burns more calories at rest than fat tissue. Even at the same weight, men generally have higher BMR than women due to higher testosterone levels and greater lean body mass as a proportion of total weight.",
      },
      {
        q: "Does exercise actually burn enough calories to matter for weight loss?",
        a: "Exercise alone is a less efficient driver of weight loss than dietary changes, because a 45-minute moderate cardio session burns only 300 to 500 calories, which is easily offset by an extra snack. However, exercise has powerful indirect benefits: it preserves muscle mass during weight loss (muscle burns more calories at rest), improves insulin sensitivity, improves mood and adherence to diet, and contributes to long-term weight maintenance.",
      },
      {
        q: "How many calories are in common South African foods?",
        a: "Pap (stiff maize meal, 150g cooked serving): approximately 170 kcal. Boerewors (100g): approximately 280 kcal. Braai'd chicken (100g): approximately 190 kcal. Samp and beans (200g serving): approximately 220 kcal. Samoosa (one deep-fried): approximately 100 to 120 kcal. Rooibos tea with no milk or sugar: 0 kcal.",
      },
      {
        q: "Does your calorie need change as you age?",
        a: "Yes. BMR decreases with age primarily because of a reduction in muscle mass (sarcopenia). Between ages 25 and 60, BMR can decrease by 10 to 20%. This means someone eating the same diet at 50 that they ate at 30 will slowly gain weight unless they either eat less or maintain muscle mass through resistance training.",
      },
      {
        q: "What is the best macronutrient split for weight loss?",
        a: "Research does not conclusively favour one macronutrient ratio for weight loss, as long as total calories are controlled. However, higher protein intake (1.6 to 2.2g per kg of body weight) consistently shows better results for preserving muscle during weight loss, improving satiety, and supporting metabolism. A starting split of 30% protein, 35% carbohydrates, and 35% fat is a reasonable approach for most people.",
      },
      {
        q: "Should I eat back the calories I burn exercising?",
        a: "It depends on your goal and how hungry you are. If you are in a planned deficit for weight loss, eating back exercise calories reduces your deficit. The approach that works best is whichever one allows you to be consistent. Many people who use a sedentary activity factor for their base calories and then partly eat back exercise calories find this gives them a reasonable real-world deficit.",
      },
      {
        q: "Are calorie counts on restaurant menus accurate?",
        a: "Restaurant calorie counts have significant variability, often ranging 20 to 30% above or below the stated figure depending on portion variation, cooking method differences between staff, and ingredient substitutions. Use menu calorie counts as a general guide rather than a precise figure. At restaurant meals where calorie information is unavailable, estimating portion size and using calorie data for similar home-cooked dishes is a reasonable approach.",
      },
    ],
  },

  bmi: {
    title: "BMI Calculator: Complete Guide",
    intro: [
      "Body Mass Index (BMI) is a screening tool that uses height and weight to categorise individuals into health risk groups. It is one of the most widely used measures in public health, medicine, and fitness because it is quick, free, and requires no equipment beyond a scale and a measuring tape. But it also has important limitations that every user should understand.",
      "This guide explains how the BMI calculation works, what the categories mean in the South African health context, how to use TrufflShuffl's BMI Calculator, and when to use additional measures alongside BMI for a more complete health picture.",
    ],
    sections: [
      {
        heading: "When to Use the BMI Calculator",
        paragraphs: [
          "Use it as part of an annual health check to track your weight status over time. While a single BMI reading has limited clinical value on its own, tracking whether your BMI is increasing, stable, or improving over years gives you early warning of trends that matter for long-term health.",
          "Use it when starting a fitness or weight loss programme to establish a baseline. Knowing your starting BMI helps you set a realistic target and gives you context for where you sit on the scale. A starting BMI of 32 means losing 10kg will have a bigger health impact than for someone starting at 25.",
          "Use it in the context of other health measurements. BMI is most useful when combined with waist circumference, blood pressure, and blood glucose data. On its own, it provides an indicative picture; alongside other measurements, it contributes to a meaningful health assessment.",
          "Do not use it as the sole measure of health or body composition. Two people at the same BMI can have very different body compositions. A muscular athlete and a sedentary person of the same height and weight will have the same BMI, but the athlete may have very low body fat and the sedentary person may have high body fat with low muscle mass.",
        ],
      },
      {
        heading: "How to Use the BMI Calculator",
        paragraphs: [
          "Enter your height in centimetres. Stand against a wall without shoes, with your back straight and heels together, and measure from the floor to the top of your head. If you are using feet and inches, convert: multiply feet by 30.48 and add inches times 2.54.",
          "Enter your weight in kilograms. Weigh yourself at the same time of day each time (morning, before eating and drinking, after using the bathroom) for consistency. Weight naturally fluctuates by 1 to 2 kilograms throughout the day due to food, water, and bowel contents.",
          "Review your BMI score and category. The WHO categories are: underweight (below 18.5), normal weight (18.5 to 24.9), overweight (25 to 29.9), and obese (30 and above). Obesity is further divided into class I (30 to 34.9), class II (35 to 39.9), and class III (40 and above).",
          "Read the health information associated with your BMI category. The calculator provides context on the health risk implications of your BMI range and suggestions for next steps.",
        ],
      },
      {
        heading: "BMI Categories and Their Health Implications",
        paragraphs: [
          "A BMI below 18.5 is classified as underweight. In South Africa, underweight is associated with malnutrition, chronic illness, or eating disorders. For adults, being underweight increases risk of nutritional deficiency, impaired immune function, osteoporosis, and complications in illness or surgery.",
          "A BMI between 18.5 and 24.9 is classified as normal or healthy weight. This range is associated with the lowest risk of weight-related chronic disease. However, 'healthy weight' does not mean optimal body composition; a person with low muscle mass and high body fat can have a BMI in this range (sometimes called 'skinny fat').",
          "A BMI between 25 and 29.9 is classified as overweight. At this range, the risk of developing type 2 diabetes, high blood pressure, high cholesterol, and sleep apnoea begins to increase above baseline. Losing 5 to 10% of body weight from this range can meaningfully improve metabolic health markers even without reaching the 'normal' BMI range.",
          "A BMI of 30 or above is classified as obese, with higher classifications representing higher risk. Obesity is a major risk factor for type 2 diabetes, cardiovascular disease, certain cancers, osteoarthritis, and reduced quality of life. South Africa has one of the highest rates of obesity in sub-Saharan Africa, particularly among adult women, and obesity-related non-communicable diseases are a primary burden on the public healthcare system.",
        ],
      },
      {
        heading: "Limitations of BMI",
        paragraphs: [
          "BMI does not distinguish between fat and muscle. Since muscle is denser than fat, a muscular person can have a BMI in the overweight or even obese range while having a healthy or even low body fat percentage. Elite rugby players and weightlifters often have BMIs above 25 despite being in excellent physical condition.",
          "BMI does not account for fat distribution. Abdominal fat (visceral fat, around the organs) is much more metabolically harmful than subcutaneous fat (under the skin). Two people with the same BMI can have very different health risks depending on where they carry their weight. Waist circumference is a better indicator of visceral fat than BMI.",
          "BMI thresholds were developed primarily based on data from European populations. Research suggests that people of Asian descent have higher health risks at lower BMI thresholds, and some studies suggest that people of African descent may have different BMI-risk relationships than standard tables suggest. South African health professionals often use additional measures alongside BMI when assessing patients.",
          "BMI is also less informative for children, older adults, and pregnant women. For children, age- and gender-specific BMI percentile charts (not the same thresholds as adults) are used. For older adults, a slightly higher BMI may be protective rather than harmful due to the association between low body weight and frailty.",
        ],
      },
      {
        heading: "Complementary Measures",
        paragraphs: [
          "Waist circumference is considered by many health professionals to be a more direct indicator of metabolic risk than BMI. For South African men, a waist circumference above 94cm indicates increased risk; above 102cm indicates high risk. For women, the thresholds are 80cm (increased risk) and 88cm (high risk). Measure at the midpoint between the lowest rib and the top of the hip bone, breathing normally.",
          "Waist-to-height ratio (waist circumference divided by height) is increasingly used as a simple combined index. A ratio below 0.5 (waist circumference less than half your height) is associated with a healthy metabolic profile. This measure works well across different heights and ethnicities.",
          "Body fat percentage measured by DEXA scan, skinfold callipers, or bioelectrical impedance (BIA) scales provides direct body composition data. For men, healthy body fat is generally 10 to 20%; for women, 18 to 28%. These figures vary by age, with slightly higher ranges being normal in older adults.",
          "Blood pressure, fasting blood glucose, and cholesterol levels round out a basic metabolic health assessment. These are measured at a GP's rooms or at a pharmacy with a screening service and provide direct evidence of whether the risks suggested by BMI and waist circumference are actually showing up in clinical markers.",
        ],
      },
      {
        heading: "Industries and Contexts Using BMI",
        paragraphs: [
          "Healthcare providers use BMI as a routine screening tool during consultations. SARS and the Department of Health include obesity-related conditions in their disease burden statistics using BMI classification data from national surveys like the South Africa Demographic and Health Survey (SADHS).",
          "Life insurance and medical scheme underwriting use BMI as one of several factors in risk assessment. Applicants with BMIs above certain thresholds may face higher premiums or additional underwriting requirements for life insurance or critical illness cover.",
          "Occupational health teams at mining, construction, and industrial companies in South Africa conduct regular health assessments that include BMI as part of fit-for-duty evaluations. Some roles have specific BMI requirements due to equipment safety ratings or physical demands.",
          "Fitness and wellness businesses (gyms, personal trainers, wellness coaches) use BMI alongside body measurements and fitness assessments to set goals with clients and track progress over time.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is a healthy BMI range for adults?",
        a: "The World Health Organisation classifies a BMI between 18.5 and 24.9 as 'normal' or 'healthy weight'. However, optimal health outcomes are not confined to this narrow range, and many healthy individuals fall slightly outside it due to muscle mass, age, or body type. Use the BMI category as a guide, not an absolute judgement.",
      },
      {
        q: "Is BMI the same for men and women?",
        a: "The same BMI thresholds (18.5, 25, 30) are used for both men and women. However, at the same BMI, women typically have more body fat than men because women have more essential fat for hormonal function and reproductive health. Some health professionals use separate body fat percentage targets for men and women that account for this difference.",
      },
      {
        q: "My BMI says I am overweight but I exercise regularly. Is that possible?",
        a: "Yes. BMI does not distinguish between muscle and fat. If you have a significant amount of muscle mass, your weight will be higher than a less muscular person of the same height, and your BMI will reflect that higher weight even if your body fat percentage is low. Athletes and very active people frequently have overweight BMI classifications despite being in excellent physical condition.",
      },
      {
        q: "How quickly can I reduce my BMI?",
        a: "BMI changes as weight changes. Losing 1 to 2 kilograms per month through a sustainable calorie deficit and exercise is the generally recommended pace. For a person of 170cm, losing 5kg reduces BMI by approximately 1.7 points. So moving from a BMI of 28 to 25 (healthy range) requires losing approximately 8.5kg for someone of that height.",
      },
      {
        q: "Is there a different BMI calculation for children?",
        a: "Yes. For children and teenagers under 18, BMI is calculated the same way (weight/height squared) but interpreted using age- and gender-specific percentile charts rather than fixed cutoffs. The same BMI number means different things at age 10 versus age 16. Paediatric BMI assessment is always done in a clinical context by a healthcare professional.",
      },
      {
        q: "What is the BMI cutoff for bariatric (weight loss) surgery?",
        a: "Bariatric surgery (such as gastric bypass or sleeve gastrectomy) is generally considered for adults with a BMI above 40, or above 35 with serious obesity-related health conditions (type 2 diabetes, sleep apnoea, hypertension). In South Africa, bariatric surgery is performed at several private hospitals and specialist centres, and medical scheme funding varies.",
      },
      {
        q: "What is the obese BMI threshold and what does it mean for health?",
        a: "A BMI of 30 or above is classified as obese. Obesity significantly increases the risk of type 2 diabetes, cardiovascular disease, certain cancers (breast, colon, endometrial), sleep apnoea, joint problems, and reduced life expectancy. Even a 5 to 10% reduction in body weight at BMIs above 30 produces measurable improvements in these risk factors.",
      },
      {
        q: "Does BMI account for ethnicity?",
        a: "Standard BMI cutoffs were developed based on predominantly European population data and may not optimally represent risk across all ethnicities. Research suggests that people of Asian descent face elevated diabetes and cardiovascular risk at lower BMIs (proposed alternative thresholds: overweight at 23, obese at 27.5). For South African populations, research is still developing on whether ethnic-specific thresholds improve risk prediction.",
      },
      {
        q: "Can I have a normal BMI but still be unhealthy?",
        a: "Yes. 'Normal weight obesity' describes people with a BMI in the 18.5 to 24.9 range but elevated body fat percentage and visceral fat. This pattern is associated with metabolic risk factors similar to those seen in higher BMI categories. It is more common in people who are not physically active and have lost muscle mass. Waist circumference and body composition measurements are more sensitive than BMI for detecting this.",
      },
      {
        q: "What is the ideal BMI for longevity?",
        a: "Population studies suggest the lowest all-cause mortality is associated with BMIs in the range of 22 to 25 for younger adults and 25 to 27 for older adults (where slightly higher weight appears protective against frailty). The 'obesity paradox', where some studies show overweight individuals surviving certain illnesses better than normal-weight individuals, is debated and likely reflects the limitations of BMI as a health measure.",
      },
    ],
  },

  age: {
    title: "Age Calculator: Complete Guide",
    intro: [
      "Calculating age seems trivial until you need precision: does a contract term expire on a specific date, did someone turn 65 before a pension fund deadline, how old is someone in months and days for a child health record, or how many days are left until a legally binding deadline? In these situations, a precise age calculator that accounts for leap years, varying month lengths, and time zones saves time and prevents mistakes.",
      "TrufflShuffl's Age Calculator gives you exact age in years, months, and days from any two dates. This guide explains the practical and professional uses of precise age calculation, with examples from South African legal, medical, and administrative contexts.",
    ],
    sections: [
      {
        heading: "When to Use an Age Calculator",
        paragraphs: [
          "Legal and contractual contexts often require exact age on a specific date. The age at which someone signs a contract, reaches majority (18), becomes eligible for a pension, or qualifies for a legal benefit can determine whether a transaction is valid or whether certain consequences apply. Confirming the exact date-of-age milestone using a calculator eliminates ambiguity.",
          "Medical and paediatric contexts use age in months and weeks for developmental assessment. A child assessed at 18 months and 12 days has a different developmental benchmark than one assessed at exactly 18 months. Paediatricians, school psychologists, and occupational therapists use exact age for standardised testing.",
          "Employment and HR contexts require age calculation for retirement eligibility, pension fund vesting, age-based promotion criteria, and mandatory retirement age compliance. In South Africa, mandatory retirement at a specific age may be governed by employment contracts, fund rules, or collective bargaining agreements.",
          "Personal milestones and planning: upcoming significant birthdays, calculating how old you will be when a child finishes school or university, working out the age of a historical figure or ancestor, and other personal calculations that benefit from a precise answer.",
        ],
      },
      {
        heading: "How to Use the Age Calculator",
        paragraphs: [
          "Enter the date of birth using the date picker. The calculator accepts any historical date, including dates before 1900 for genealogical research.",
          "Enter the date to calculate age on. The default is today's date, but you can set any date: a past date to calculate someone's age at a historical moment, or a future date to calculate when someone will reach a specific age.",
          "The calculator outputs age in years, months, and days. It correctly accounts for leap years and varying month lengths, which manual calculation often gets wrong. February 29 birthdays are handled correctly: a person born on February 29 turns one year older on March 1 in non-leap years.",
          "The output also shows total days elapsed, total months elapsed, and the next birthday date. These additional figures are useful for contract term calculations and for anyone who tracks time-based milestones.",
        ],
      },
      {
        heading: "Legal Age Milestones in South Africa",
        paragraphs: [
          "Age 18 is the age of majority in South Africa under the Children's Act. At 18, a person acquires full legal contractual capacity and can sign legally binding agreements without parental consent. Under 18, minors can only enter into contracts with parental or guardian approval for non-trivial matters.",
          "Age 16 is the minimum legal age for marriage in South Africa, subject to parental and court consent. Age 16 is also the minimum age for certain types of employment under the Basic Conditions of Employment Act, with restrictions on working hours and types of work.",
          "Age 60 is the qualifying age for the State Old Age Grant, subject to a means test. Certain medical scheme benefit enhancements (such as increased day-to-day benefits for chronic conditions) and tax rebates also kick in from age 65.",
          "Age 65 marks the standard South African retirement age for most pension and provident funds, the age at which the secondary tax rebate applies, and the threshold above which the interest income tax exemption increases from R23,800 to R34,500.",
          "Age 75 is the threshold for the tertiary tax rebate in South Africa, providing an additional tax credit on top of the primary and secondary rebates.",
        ],
      },
      {
        heading: "Age in Medical Contexts",
        paragraphs: [
          "Gestational age in obstetrics is typically measured from the first day of the last menstrual period, making the 'age' of the pregnancy dated from two weeks before conception. A newborn delivered at '40 weeks' is 40 weeks gestational age but only 38 weeks post-conception. The age calculator can be used to calculate gestational age in weeks if the LMP date is entered.",
          "Chronological age versus developmental age is relevant in paediatrics. A child born prematurely may have a chronological age of 12 months but a corrected developmental age of 9 months (12 months minus 3 months of prematurity). Corrected age is used for developmental assessments until 24 months of age.",
          "Drug dosing for children is often calculated based on exact age in months, because pharmacokinetics change rapidly in early childhood. An incorrect age calculation could lead to an incorrect dose, particularly for weight-based and age-based medications.",
          "Geriatric medicine increasingly uses functional age and biological age alongside chronological age to assess frailty and treatment suitability. Chronological age (which the calculator measures) is the starting point for these assessments, with additional clinical tools used to assess biological condition.",
        ],
      },
      {
        heading: "Industries and Professional Contexts for Age Calculation",
        paragraphs: [
          "South African law firms and conveyancing attorneys use age calculations when drafting or reviewing contracts that specify age conditions: beneficiary ages for trusts, minority protection clauses, age of consent to transactions, and age-based conditions in wills.",
          "Insurance underwriters use age at the time of application (and sometimes exact age at the policy anniversary date) to rate premiums. Life insurance premiums typically step up at each birthday, so the age at application can affect the quoted premium.",
          "Human resources departments calculate retirement dates, service milestones (5-year, 10-year, 25-year), and age-based benefit eligibility for every employee. Automated HR systems do this, but manual verification using a calculator is sometimes needed for edge cases or disputes.",
          "Schools and educational institutions use exact age calculations to determine school readiness and grade placement. In South Africa, a child must turn 5 before June 30 to be eligible for Grade R admission in that year, and must turn 7 before January 1 to be eligible for Grade 1. These cut-off dates require precise age calculations.",
          "Genealogy researchers use age calculators to estimate birth dates from census or registration data, to check consistency of ages across documents, and to calculate approximate ages of ancestors whose exact birth dates are unknown.",
        ],
      },
      {
        heading: "Worked Examples",
        paragraphs: [
          "Example 1: Retirement eligibility. An employee was born on July 14, 1960. Their employer's pension fund requires them to retire on the last working day of the month in which they turn 65. Using the age calculator: they turn 65 on July 14, 2025. The last working day of July 2025 is July 31. Their retirement date is July 31, 2025.",
          "Example 2: Child benefit eligibility. A child was born on March 8, 2022. To qualify for a specific early childhood development grant that requires the child to be under 36 months, the application must be submitted before their 36-month birthday. Using the age calculator from March 8, 2022: 36 months later is March 8, 2025. The deadline for the application (to catch the last eligible month) is February 28, 2025.",
          "Example 3: Contract term calculation. A lease agreement specifies a 36-month term starting on September 15, 2022. The exact end date: September 15, 2022 plus 36 months equals September 15, 2025. The age calculator between those two dates confirms 3 years exactly. If September 15 falls on a weekend, the last working day before or after it (depending on the contract wording) is the relevant date.",
        ],
      },
    ],
    faqs: [
      {
        q: "How does the calculator handle a February 29 birthday in a non-leap year?",
        a: "The calculator treats February 28 as the birthday anniversary in non-leap years for people born on February 29. This is the standard legal interpretation in most jurisdictions.",
      },
      {
        q: "What is the age of majority in South Africa?",
        a: "The age of majority in South Africa is 18, as set by the Children's Act. At 18, a person acquires full legal capacity to enter into contracts, marry without parental consent, and exercise other adult legal rights.",
      },
      {
        q: "Can I calculate someone's exact age at a historical date?",
        a: "Yes. Enter the date of birth and then enter the historical date (any date in the past) as the 'age on date' field. The calculator returns the exact age on that specific historical date, useful for genealogy research, historical context, and legal document review.",
      },
      {
        q: "What is the minimum retirement age in South Africa?",
        a: "Most occupational pension and provident funds allow retirement from age 55. However, access to certain tax benefits on lump-sum withdrawals and annuities is structured around age 55 as the minimum retirement age under the Income Tax Act. Early access before 55 is generally only permitted for disability or emigration.",
      },
      {
        q: "How is age calculated for a newborn?",
        a: "Newborns are typically measured in days, then weeks, then months for the first two years, before switching to years. The age calculator can show age in days and weeks for young children. Paediatric developmental assessments use months as the primary unit, with corrected age (months minus prematurity) used for premature babies.",
      },
      {
        q: "Is there a difference between chronological age and biological age?",
        a: "Yes. Chronological age is the time elapsed since birth, which is what the calculator measures. Biological age is a measure of how well the body functions relative to what is expected at the chronological age. Various tests assess biological age, but there is no single standardised measure. The calculator measures chronological age only.",
      },
      {
        q: "What is the voting age in South Africa?",
        a: "South African citizens may vote in national, provincial, and local elections from age 18. There are no exceptions or lower thresholds for specific elections. The electoral system requires registration as a voter, which can be done from age 16 in preparation for voting eligibility at 18.",
      },
      {
        q: "At what age can someone sign a legal contract in South Africa?",
        a: "The age of majority is 18. Minors (under 18) can enter into contracts for their benefit with guardian consent. Certain contracts are absolutely prohibited for minors regardless of consent (such as mortgage agreements). Contracts entered into by minors without consent are generally voidable at the minor's option upon reaching majority.",
      },
      {
        q: "How are service milestones calculated for employment recognition?",
        a: "Service milestones are calculated from the employment start date to the anniversary date each year. A 10-year service award is given on the exact 10-year anniversary of the start date. If someone started on November 3, 2015, their 10-year anniversary is November 3, 2025. The age calculator, used with the employment start date instead of date of birth, can verify these milestones.",
      },
      {
        q: "How is age used in tax calculations in South Africa?",
        a: "Age affects the tax rebates available under SARS tax tables. The primary rebate applies to all taxpayers. The secondary rebate (R9,444 in 2024/25) applies to taxpayers aged 65 and over. The tertiary rebate (R3,145 in 2024/25) applies to taxpayers aged 75 and over. These rebates increase the effective tax threshold and reduce the PAYE deducted from pension income for older South Africans.",
      },
    ],
  },

  "clothing-size": {
    title: "Clothing Size Calculator: Complete Guide",
    intro: [
      "Buying clothes online from international retailers has become commonplace in South Africa, but clothing sizes are not standardised globally. A UK size 14 is not the same as a US size 14, and neither is the same as a European size 40 or an Asian market size. Without the right conversion, you get a garment that does not fit, which means the cost and inconvenience of a return.",
      "TrufflShuffl's Clothing Size Calculator converts between the major international sizing systems so you can shop confidently regardless of where a garment originates. This guide explains the major sizing systems, how to measure yourself correctly, and how to handle the variability that still exists even within the same nominal size.",
    ],
    sections: [
      {
        heading: "When to Use the Clothing Size Calculator",
        paragraphs: [
          "Use it every time you shop from a retailer whose sizing system is unfamiliar. This includes any purchase from US retailers, European brands, UK stores, or Asian marketplaces like Shein, Takealot imports, or AliExpress where sizing runs smaller than Western standards.",
          "Use it when buying a gift. If you know someone's South African or European size in a specific category (tops, bottoms, dresses), the calculator converts it to the US, UK, or Asian equivalent for the specific retailer you are using.",
          "Use it before a trip abroad. Knowing your size in the local system of the country you are visiting makes shopping abroad faster and easier. A South African woman who is a size 34 in European terms, a UK 8, and a US 4 can communicate her size confidently in each country.",
          "Use it when the size on a garment does not match your expectation. Sizing varies between brands even within the same nominal system, but knowing the size you should be in the correct system is the starting point for identifying whether the garment itself runs large or small.",
        ],
      },
      {
        heading: "How to Take Your Measurements Correctly",
        paragraphs: [
          "Bust or chest: Measure around the fullest part of your chest, keeping the tape level and parallel to the floor. Keep a finger between the tape and your body so it is snug but not tight. For menswear, this is the chest circumference used for shirts.",
          "Waist: Measure around your natural waist, which is the narrowest part of your torso, typically 2 to 3 cm above your belly button. Stand naturally and breathe out gently before reading the measurement. Do not hold your breath in.",
          "Hips: Measure around the fullest part of your hips and seat, keeping the tape level. This is typically 18 to 22 cm below the natural waist.",
          "Height: Stand against a wall without shoes, back straight, heels together. Measure from the floor to the top of your head. Height is used in sizing systems that differentiate between petite, regular, tall, and plus-fit cuts.",
          "Inseam: For trousers, measure from the crotch seam to the ankle along the inside of the leg. This is best done by measuring a pair of trousers that fits you well rather than measuring your body directly.",
        ],
      },
      {
        heading: "International Sizing Systems Explained",
        paragraphs: [
          "UK sizing uses numerical sizes for women (6, 8, 10, 12, 14, 16) and collar/chest sizes for men's shirts and suits. UK women's sizes are sometimes also available in letters (XS, S, M, L, XL) which correspond roughly to UK 8-10 (XS), 10-12 (S), 12-14 (M), 14-16 (L), and 18-20 (XL). South African clothing retailers historically based their sizing on the UK system, so SA sizes and UK sizes are generally the same for women's clothing.",
          "US sizing for women typically runs 2 sizes below UK (UK 12 equals US 8, UK 14 equals US 10). For men's formal shirts, US and UK use the same collar and chest measurements. For jeans, both systems use waist and inseam measurements in inches.",
          "European (EU) sizing for women starts at 34 (equivalent to UK 6) and increases in steps of 2 (so UK 8 is EU 36, UK 10 is EU 38, and so on). For men's shoes and clothing, EU sizing follows a different scale. EU dress sizing is widely used by European and international designer brands.",
          "Asian sizing (particularly for Chinese fast-fashion retailers) tends to run significantly smaller than Western sizing. An Asian medium may be equivalent to a Western small or even extra-small. Always check the centimetre measurements provided by the specific retailer rather than relying only on the letter size.",
          "Italian sizing uses its own numerical system, and sizes from Italian fashion houses often run small by European standards. A size 42 in Italian sizing is typically equivalent to a UK 10 or EU 38.",
        ],
      },
      {
        heading: "Why Sizes Vary Between Brands",
        paragraphs: [
          "Vanity sizing is the practice of labelling garments with smaller nominal sizes than their actual measurements to make buyers feel better about the size they wear. This has been documented predominantly in markets targeting women and has made nominal sizes increasingly unreliable over time. A woman who wore a size 14 in 1990 wears the same physical measurements but today may fit into a size 10 or 12 from brands that have engaged in vanity sizing.",
          "Technical specifications vary by brand. The same nominal size at two different brands may differ by 2 to 4 cm in the critical measurements because each brand's pattern makers draft their blocks differently. Luxury brands often use slimmer blocks; mass-market brands use more relaxed blocks. Checking the brand's specific size guide for key measurements, rather than relying on the size number alone, is the most reliable approach.",
          "Fabric stretch affects fit independently of nominal size. A stretchy jersey fabric in a size medium may fit someone who wears a size large in woven fabric. The clothing size calculator gives a starting point, but the fabric content and construction also affect the final fit.",
        ],
      },
      {
        heading: "Shopping for Clothing Online in South Africa",
        paragraphs: [
          "South African online retailers including Woolworths, Zara, H&M, and Superbalist provide size guides on their websites. These size guides give the body measurements (in cm) corresponding to each size, which are more reliable than the size number itself. When in doubt, measure your body and compare against the retailer's guide.",
          "International sites shipping to South Africa include Amazon, ASOS, Net-a-Porter, Farfetch, and various Chinese fashion platforms. Import duties and taxes apply on purchases above R500 (South Africa's de minimis threshold), with the applicable import VAT and customs duties depending on the type of garment. Factor in these costs when comparing international versus local prices.",
          "Return policies for international purchases are important to understand before ordering uncertain sizes. ASOS has a well-regarded international return system. Some direct-from-China platforms have minimal return options. Where returns are difficult or expensive, ordering two sizes to try is sometimes cheaper than the return cost.",
        ],
      },
      {
        heading: "Industries That Use Clothing Size Calculations",
        paragraphs: [
          "Fashion retail and e-commerce is the primary industry. Every global fashion platform that ships to South Africa must either standardise to a single sizing system or provide conversion tools, and many have invested in virtual try-on and AI sizing tools to reduce return rates.",
          "Corporate uniform procurement involves ordering large quantities of clothing in standardised sizes for employees, often converting international manufacturer sizes to a local size chart that matches the workforce profile.",
          "Costume and fashion design uses standardised measurement and sizing when creating patterns for garments. Fashion design courses at South African institutions like LISOF and Fedisa train students in pattern making using international grading systems.",
          "Online gift shopping is a use case where clothing size conversion is needed constantly: a South African family member buying a gift from an overseas website, or an overseas relative sending a gift to South Africa, both need to convert sizes accurately.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is South African clothing sizing the same as UK sizing?",
        a: "Generally yes for women's clothing. South African retailers have historically followed the UK sizing standard, so a South African size 12 is typically equivalent to a UK 12. However, this varies by retailer and some South African brands use their own sizing systems. Always check the brand's specific size guide.",
      },
      {
        q: "Why does an Asian size medium not fit like a European medium?",
        a: "Asian sizing standards (particularly for Chinese fast-fashion brands) are calibrated for body measurements that are typically smaller than European average measurements. An Asian medium may correspond to measurements closer to a European small or even extra-small. Always check the retailer's specific centimetre measurements rather than comparing letter sizes across systems.",
      },
      {
        q: "How do I convert a European size to a South African size?",
        a: "SA women's sizes generally correspond to UK sizes, and UK sizes are approximately 6 lower than European sizes numerically (UK 12 equals EU 38). So a EU 38 dress is likely to be a SA 12. However, this conversion is a starting point; always check the specific brand's size guide.",
      },
      {
        q: "What measurements do I need to convert clothing sizes accurately?",
        a: "The key measurements are bust/chest, waist, and hip circumference in centimetres, plus your height. Inseam is needed for trousers. Having these measurements allows you to compare against any retailer's size guide regardless of the sizing system they use.",
      },
      {
        q: "Do plus sizes follow the same conversion rules?",
        a: "Plus size ranges (typically size 18 and above in UK/SA terms, or 1X and above in US terms) use the same underlying measurement principles but the numerical conversion steps may differ between brands. Always refer to the plus size specific chart rather than assuming the regular size chart conversion applies.",
      },
      {
        q: "How do children's clothing sizes work internationally?",
        a: "Children's clothing is typically sized by age (2Y, 4Y, 6Y, etc.) in most markets, but actual measurements for these age sizes vary significantly by country. European and UK children's sizes are often more closely aligned to actual body measurements. When buying children's clothing internationally, compare height and chest measurement against the size chart rather than relying on the age label.",
      },
      {
        q: "Is there a universal standard for clothing sizes?",
        a: "No. Despite ISO and various national standardisation attempts, clothing sizes remain inconsistent between brands, countries, and even product categories within a single brand. The closest thing to a universal approach is stating measurements in centimetres, which is why reliable size guides list actual body measurements rather than just nominal sizes.",
      },
      {
        q: "What does 'fit' mean in different contexts?",
        a: "In clothing, 'fit' describes the relationship between the garment's dimensions and the wearer's body. A 'regular fit' is designed for average body proportions. 'Slim fit' is cut closer to the body. 'Relaxed' or 'oversized' is cut larger. When using a size converter, note the fit category as well as the size, because a slim-fit size M and a regular-fit size M are not the same garment.",
      },
      {
        q: "Can I use my bust measurement to find my dress size?",
        a: "For many dress size systems, bust measurement is the primary size determinant. In the UK and SA systems, a size 12 corresponds to approximately 88cm bust, 70cm waist, 94cm hips. However, if your measurements do not follow the standard proportions (for example, if your hips are significantly larger relative to your bust), you may need to size up from what your bust measurement suggests to accommodate your hip measurement.",
      },
      {
        q: "How should I measure my inseam for trouser size?",
        a: "The most accurate method is to measure the inseam of a pair of trousers that fits you well: lay them flat and measure from the crotch seam to the hem along the inside leg. Alternatively, stand straight and have someone measure from the crotch to the floor along the inside of your leg. Typical SA trouser inseam lengths run from about 76cm (short) to 86cm (regular) to 91cm (long).",
      },
    ],
  },

  "shoe-size": {
    title: "Shoe Size Calculator: Complete Guide",
    intro: [
      "Shoe sizing is arguably the most confusing of all clothing size systems because not only does each country use a different numerical scale, but the scales themselves have different measurement bases (some are in barleycorns, some in Paris points, some in centimetres). Buying the wrong shoe size is a problem with real comfort and health consequences, so getting the conversion right matters.",
      "TrufflShuffl's Shoe Size Calculator converts between UK, US, EU, and other sizing systems for both men's and women's shoes. This guide explains how each system works, how to measure your foot correctly, and what to do about the width issue that size numbers do not capture.",
    ],
    sections: [
      {
        heading: "When to Use the Shoe Size Calculator",
        paragraphs: [
          "Use it when buying shoes online from a retailer that uses a different size system. Most South African shoe retailers use UK sizing as their primary reference, but Nike, Adidas, and many US brands use US sizing on their websites. International brands based in Europe (Birkenstock, Clarks UK, Ecco) use EU sizing.",
          "Use it when buying shoes as a gift and you know the recipient's size in one system but the retailer uses another. A recipient who tells you they are a UK 7 in men's shoes needs a US 8 from US retailers and an EU 41.",
          "Use it when your shoe size seems to vary between brands and you want to understand why. Different brands use slightly different interpretations of their size scales, but knowing the correct conversion for the system gives you the best starting point.",
          "Use it when travelling and planning to buy shoes in Europe, the UK, or the US. Knowing your size in advance saves time in store.",
        ],
      },
      {
        heading: "How Shoe Size Systems Work",
        paragraphs: [
          "UK shoe sizes for men's and women's shoes both start at the same incremental scale but diverge in numerical value at the same foot length: men's UK 9 and women's UK 9 are the same actual foot length (roughly 27cm). However, US sizing separates men's and women's by about 1.5 sizes: a men's US 9 is a UK 8; a women's US 9 is a UK 7. This is a common source of confusion when switching between UK and US sizing.",
          "European (EU) sizing is based on Paris points, where one point equals 2/3 of a centimetre. UK size 8 men equals EU 42, which corresponds to approximately 27.3cm foot length. EU sizes run continuously across men's and women's (there are not separate numerical scales), which is convenient for comparison.",
          "US men's sizing is 1 size above UK (US 9 equals UK 8). US women's sizing is 1.5 sizes above UK (US 7.5 equals UK 6, US 8.5 equals UK 7). This means a women's US 9 equals UK 7.5 equals EU 41.",
          "Mondopoint is an international standard that expresses shoe size as foot length in millimetres. It is used by the military in some countries and is the clearest system because it directly states foot length. 265 Mondopoint equals 265mm foot length.",
        ],
      },
      {
        heading: "How to Measure Your Foot for Accurate Sizing",
        paragraphs: [
          "Measure your foot in the afternoon or evening. Feet swell slightly throughout the day, and a morning measurement will give you a shoe that feels slightly tight by evening.",
          "Stand on a piece of paper and trace around your foot with a pencil held vertically. Measure the distance from the back of the heel to the tip of the longest toe (which may be the second toe, not the big toe, for many people). This measurement in centimetres is your foot length.",
          "Also measure the width of your foot at the widest point (usually across the ball of the foot). Width is an important factor that size numbers do not capture, but it is essential for comfort, especially for people with wider or narrower than average feet.",
          "Compare your foot length in centimetres against the size chart for the specific shoe brand you are considering. Different brands last their shoes on different widths and length scales, so a foot length of 27cm might be a size 42 in one brand and a 42.5 in another.",
          "When in doubt, size up half a size for shoes you will wear with thick socks (walking boots, sports shoes), and size down for sandals, flat shoes, or shoes you will wear without socks.",
        ],
      },
      {
        heading: "Shoe Width and Fit Considerations",
        paragraphs: [
          "Width fittings are not standardised globally, but most major brands offer at least standard and wide options. UK/EU shoes use letter codes: A or B (narrow), D (standard), E or EE (wide), EEE (extra wide). US brands use a similar system but may start at N (narrow) and go to W or WW for wide.",
          "In South Africa, most locally manufactured shoes are available in standard D width for men and D/B width for women. Major South African shoe retailers like Shoe City, Edgars, and Woolworths stock primarily standard width. Wider fittings are generally available in senior-friendly shoe stores or through specialist online retailers.",
          "Children's shoes should always be professionally fitted if possible. Children's feet change rapidly and ill-fitting shoes can affect gait development. The standard South African retailer recommendation is to measure children's feet every three months and replace shoes when there is less than 12mm of growing room in the toe box.",
        ],
      },
      {
        heading: "Industries That Use Shoe Size Conversion",
        paragraphs: [
          "Online fashion retail is the largest user. Any platform shipping international brands to South Africa needs accurate size conversion tools to reduce return rates and improve customer satisfaction.",
          "Corporate uniform and safety footwear supply requires converting sizing when procurement involves international manufacturers. Safety boots in South Africa often follow European CE standards (EN ISO 20345) with EU sizing.",
          "Sports retailers and equipment suppliers work with a mix of US and EU brand sizing. Running shoe manufacturers like Nike, New Balance, and Asics typically use US sizing on their websites, while European brands like Salomon use EU sizing.",
          "Medical and orthopaedic shoe suppliers need accurate sizing for therapeutic footwear, where getting the fit wrong has health consequences. Diabetic footwear and orthopaedic shoes are particularly sensitive to sizing errors.",
        ],
      },
      {
        heading: "Common Shoe Size Conversions Quick Reference",
        paragraphs: [
          "Men's UK to EU: Add 33 to UK size for EU equivalent. UK 7 equals EU 40, UK 8 equals EU 41, UK 9 equals EU 42, UK 10 equals EU 43, UK 11 equals EU 44, UK 12 equals EU 46. UK to US men's: Add 1. UK 8 equals US 9.",
          "Women's UK to EU: Add 33 to UK size. UK 4 equals EU 37, UK 5 equals EU 38, UK 6 equals EU 39, UK 7 equals EU 40, UK 8 equals EU 41. UK to US women's: Add 1.5. UK 6 equals US 7.5, UK 7 equals US 8.5, UK 8 equals US 9.5.",
          "Children's UK to EU: Generally add 17 for very young children (UK 1 infant equals EU 18) and the gap narrows as children grow. UK 1 junior (older child's size) equals EU 33, UK 2 equals EU 34, UK 3 equals EU 35, UK 4 equals EU 37.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a UK shoe size the same as a South African shoe size?",
        a: "Yes. South African shoe retailers generally follow the UK sizing system, so SA and UK shoe sizes are the same. If you are a UK 8 men's, you are also a SA 8 men's at most South African retailers.",
      },
      {
        q: "How do I convert a men's UK shoe size to EU?",
        a: "Add 33 to your UK size. UK 9 men's equals EU 42. UK 10 equals EU 43. This formula works for most brands, though some brands round to the nearest half size and may give EU 42.5 for UK 9.",
      },
      {
        q: "Why are women's US shoe sizes different from men's US sizes?",
        a: "Historically, women's and men's shoes were sized on different lasts with different measurement starting points in the US system, resulting in women's sizes running approximately 1.5 sizes higher than men's for the same foot length. This is a convention rather than a logical design; EU and UK systems do not have this split.",
      },
      {
        q: "How do I know if a shoe brand runs large or small?",
        a: "Read reviews from buyers with verified purchases, specifically looking for comments about sizing. Many online retailers include a 'fit' rating alongside reviews. Established shoe brand websites often note in their size guide whether the brand runs narrow, wide, true to size, or runs large or small relative to standard.",
      },
      {
        q: "What does half a shoe size represent in centimetres?",
        a: "In UK and EU sizing, each full size increment is approximately 6.67mm (two thirds of a centimetre). A half size is therefore approximately 3.3mm. For most people, a half size difference is barely perceptible, but for people between sizes or with unusual proportions, it can mean the difference between comfortable and uncomfortable footwear.",
      },
      {
        q: "Do shoe sizes vary between types of shoes (sneakers vs dress shoes)?",
        a: "Yes. Dress shoes often run smaller in effective fit than sneakers at the same nominal size because dress shoe toe boxes are narrower and the construction is more rigid. Most people find they need a half to full size up in running or sports shoes compared to formal footwear. Always try on or carefully check measurements when crossing between shoe categories.",
      },
      {
        q: "What shoe size is a UK 9 in US women's?",
        a: "A UK 9 women's equals US 10.5 women's. UK women's sizes are 1.5 sizes below the US equivalent: UK 7 = US 8.5, UK 8 = US 9.5, UK 9 = US 10.5.",
      },
      {
        q: "Can I order shoes from Zara or H&M in South Africa and use EU sizes directly?",
        a: "Yes. Zara and H&M use EU sizing in their South African stores and online, consistent with their European parent operations. Their size guides specify the foot length in centimetres corresponding to each EU size, which is the most reliable way to confirm your correct size.",
      },
      {
        q: "What does EE width mean in shoe sizing?",
        a: "EE (or 2E) indicates a wide width shoe, one width increment above the standard E or D width. Shoes marked EE provide more room across the ball of the foot and generally have a wider toe box. They are particularly suited to people with wide feet, bunions, or those who find standard width shoes too tight across the front of the foot.",
      },
      {
        q: "How do I measure children's feet at home?",
        a: "Have the child stand on a piece of paper and trace around each foot. Measure the foot length from heel to longest toe on each foot (children's feet are often slightly different sizes; use the larger foot to determine shoe size). Compare the measurement to the size chart from the specific retailer. Allow 10 to 12mm of growing room between the longest toe and the front of the shoe.",
      },
    ],
  },

  "belt-ring": {
    title: "Belt and Ring Size Calculator: Complete Guide",
    intro: [
      "Belts and rings are two items where incorrect sizing causes immediate practical problems. A belt that is too long looks untidy and fails to function correctly. A ring that does not fit cannot be worn and often cannot be returned. Yet both are commonly bought as gifts or online without the buyer knowing the recipient's size.",
      "TrufflShuffl's Belt and Ring Size Calculator converts between international sizing systems and helps you measure for both types of accessory at home. This guide covers the different sizing systems, how to take accurate measurements, and what to do when buying online or as a gift.",
    ],
    sections: [
      {
        heading: "Belt Sizing: How It Works",
        paragraphs: [
          "Belt sizes in South Africa and internationally are most commonly stated as the waist measurement in centimetres or inches, corresponding to the length of the belt from the buckle fold to the middle hole. Most belts have five holes spaced 2.5cm apart, so a 'size 85' belt fits waists from 80 to 90cm comfortably.",
          "The common rule of thumb is to buy a belt 5cm larger than your trouser waist size. If you wear size 32 (81cm) jeans, buy a size 85 or 90 belt. The reasoning: your trouser waist measurement is the waist of the trouser, not your actual waist circumference through the belt loops, which is typically larger.",
          "Belt length is measured from the end of the buckle's fold (where the leather doubles back over the buckle) to the middle hole (of 5 holes). A size 85 belt is 85cm from this point to the middle hole. When buying online, manufacturers may state the total length or the wearable length, so check which measurement is being quoted.",
          "International belt sizing conversions: European sizes in centimetres (85, 90, 95, 100, 105, 110) correspond directly to waist measurements. US and UK belts are commonly sized in inches (32, 34, 36, 38, 40). A US/UK 34 inch belt is approximately equivalent to a European 85 to 90. The TrufflShuffl Belt Size Calculator converts between these systems.",
        ],
      },
      {
        heading: "Ring Sizing: Systems and Conversions",
        paragraphs: [
          "Ring sizes are measured as the internal diameter of the ring in millimetres, though the way sizes are numbered differs by system. The diameter in mm is the universal starting point that all systems convert from.",
          "US and Canadian ring sizes use a numerical scale from 1 to 16 with half-size increments. A US size 7 has an internal diameter of approximately 17.35mm. UK ring sizes use alphabetical codes from A to Z with half sizes. UK H corresponds approximately to US 4. South African jewellers typically use either UK letters or direct millimetre measurements.",
          "EU/French ring sizes use the internal circumference in millimetres, which avoids any conversion confusion. A ring with a 17mm internal diameter has a circumference of approximately 53.4mm, making it an EU size 53. This is the most logical system because it directly states the measurement rather than an arbitrary code.",
          "Japanese and Asian ring sizes are similar to US sizes but shifted by about a full size (Japanese size 12 equals US size 6). When buying from Asian jewellers or platforms, always confirm whether the diameter in mm is stated alongside the nominal size.",
        ],
      },
      {
        heading: "How to Measure Your Ring Size at Home",
        paragraphs: [
          "Method 1 (string method): Wrap a thin strip of paper or string around the base of the finger you want to wear the ring on. Mark or cut where the two ends meet. Lay it flat and measure the length in millimetres. This is the internal circumference. Divide by pi (3.14159) to get the internal diameter. Compare against size charts. Allow 1mm extra diameter for ease of wearing.",
          "Method 2 (existing ring): Place an existing ring that fits comfortably on a piece of paper and trace the inside of the ring. Measure the diameter of the traced circle in millimetres. This gives the internal diameter directly.",
          "Measure at the end of the day, when fingers are warmest and slightly swollen to their largest size. Cold fingers are smaller and a ring fitted to a cold finger may be difficult to remove after warming up. If you are between two sizes, size up.",
          "If the ring is to sit above a knuckle (like many knuckle rings), measure the knuckle rather than the base of the finger. For a standard band ring that sits at the base of the finger, measure the base and ensure the ring also fits over the knuckle for comfortable removal.",
        ],
      },
      {
        heading: "Buying Rings Online",
        paragraphs: [
          "Reputable online jewellers in South Africa include Shimansky, Charles Greig, and various platform retailers. Most South African fine jewellers use either UK letter sizes (asking you to go to a local jeweller to be measured) or a direct millimetre chart on their website.",
          "International jewellery platforms like Etsy (particularly handmade jewellers) will often list ring sizes in US and EU. The conversion chart in the TrufflShuffl Ring Size Calculator handles all three major systems.",
          "Ring resizing is possible for most ring styles. Expanding a ring by up to two sizes is relatively easy for a skilled jeweller. Narrowing a ring is also possible. However, very elaborate rings with pave settings, eternity bands with stones all the way around, or rings with engravings are harder to resize without damaging the design. If in doubt between two sizes for a gift, choose the larger size, which is easier to resize down.",
          "For engagement rings purchased as a surprise, the standard workaround is to borrow a ring the recipient currently wears on the appropriate finger and either have it sized at a jeweller or use the trace method described above. The jeweller does the sizing without the recipient knowing.",
        ],
      },
      {
        heading: "Industries That Work With Accessory Sizing",
        paragraphs: [
          "Fine jewellery retailers and custom jewellers in South Africa are the primary professional users of ring size conversion. South African jewellery students at institutions like the ICA (International Jewellery Manufacturing) learn both UK and US sizing systems.",
          "Fashion accessory retail for belts, watches (watch strap length, not size), and jewellery requires consistent sizing guidance for online customers. Return rates for incorrectly sized accessories are a significant cost for online fashion retailers.",
          "Wedding planning and bridal services involve ring sizing for wedding bands. Many couples are sized at the jeweller during the engagement ring selection process, but wedding band sizing sometimes requires recalculation if significant time passes between engagement and the wedding (weight fluctuations affect finger size).",
          "Gift purchasing for corporate and personal occasions frequently involves belts, cufflinks, and jewellery. Corporate gifting teams working with promotional merchandise suppliers often need to manage sizing across a range of recipient sizes.",
        ],
      },
      {
        heading: "Worked Examples",
        paragraphs: [
          "Example 1: Belt size for a man with a 34-inch trouser waist. 34 inches equals approximately 86cm. Recommended belt size: 90cm (European) or 35-36 inches (US/UK). A size 90 European belt has its middle hole at 90cm from the buckle fold, with holes also at 85, 87.5, 92.5, and 95cm, accommodating waists from 85 to 95cm.",
          "Example 2: Ring size conversion. A woman measures the internal diameter of her favourite ring at 16.5mm. In US size terms, that is approximately size 6. In UK terms, that is approximately size L or M (between the two). In EU terms, 16.5mm diameter equals 51.8mm circumference, which is EU size 52.",
          "Example 3: Buying a ring as a gift. The recipient's partner finds a ring they currently wear on their right middle finger. They lay it on paper, trace the inside, and measure the circle at 18.1mm diameter. Using the size chart: US 8, UK Q, EU 57. The online retailer uses US sizing, so they order size 8.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I find my belt size without measuring?",
        a: "The approximate rule is: belt size = trouser waist size + 5cm (or +2 inches for US/UK sizing). If you wear size 32 inch trousers, buy a 34-inch belt. If you wear 90cm trousers, buy a 95cm belt. This accounts for the fact that belt loops add girth relative to the trouser's stated waist measurement.",
      },
      {
        q: "What size ring is the average South African woman?",
        a: "The average South African woman's ring finger is typically around size L to N in UK terms (US 6 to 7; EU 51 to 55), corresponding to an internal diameter of approximately 16 to 17mm. However, there is significant natural variation, and the only reliable measure is to measure the specific recipient's finger.",
      },
      {
        q: "Do ring sizes change with weight gain or loss?",
        a: "Yes. Fingers get slightly larger with weight gain and smaller with weight loss. The change per kilogram of body weight is small but can add up to a half or full ring size with significant weight changes. If you have recently gained or lost more than 10kg, it is worth getting your ring size checked before ordering.",
      },
      {
        q: "Can a jeweller resize any ring?",
        a: "Most plain metal rings (gold, silver, platinum) can be resized up or down by two sizes relatively easily. Rings with pave or channel-set stones around the full circumference, signet rings with engravings, and titanium or tungsten rings are difficult or impossible to resize. When buying a ring in a material or style that limits resizing, getting the size right from the start is particularly important.",
      },
      {
        q: "What is the most accurate method for measuring ring size at home?",
        a: "The most accurate method is to trace the inside of a ring that fits comfortably on the target finger, then measure the traced circle's diameter in millimetres. The string method (wrapping paper or string around the finger) works but can introduce errors if the material stretches or if you do not account for ease of wearing (measuring too tightly).",
      },
      {
        q: "Are leather belts and fabric belts sized the same way?",
        a: "Standard leather dress belts are sized in the way described above (length to middle hole in cm or inches). Fabric or canvas belts, military-style belts, and some casual belts are sized by overall length and require a different sizing approach. Always read the manufacturer's sizing instructions for non-leather belts.",
      },
      {
        q: "What is the difference between a UK ring size and a US ring size?",
        a: "UK ring sizes use letters (A through Z+5) where each letter increment is approximately 1.25mm in circumference. US ring sizes use numbers (1 through 16) where each full size is approximately 2mm in circumference. UK size L equals approximately US size 6; UK N equals approximately US 6.75 to 7. The TrufflShuffl Ring Size Calculator provides the exact conversion.",
      },
      {
        q: "Is there a standard belt width for men's trousers in South Africa?",
        a: "Standard men's dress trouser belt loops accommodate belts 30 to 35mm wide. Casual and jeans belt loops are wider, typically accommodating 35 to 50mm belts. If you need to check compatibility, measure your trouser belt loop width and compare it to the belt's stated width. Belts wider than 40mm will not pass through dress trouser loops.",
      },
      {
        q: "Can I use a measuring tape instead of string to measure my ring size?",
        a: "A soft measuring tape (the type used for sewing) can be wrapped around your finger to measure circumference directly. This is actually more accurate than the string method because it does not stretch. Divide the circumference in mm by pi (3.14159) to get the diameter. Compare to the size chart for your target sizing system.",
      },
      {
        q: "What material are ring sizers made from and can I make one at home?",
        a: "Jewellers use metal ring sizer gauges (a set of rings in every half size) or plastic sizing strips. At home, you can print a ring sizer template (many jewellers offer downloadable PDF templates) on card, cut it out, and use it to measure your finger. These home tools are accurate to within about half a ring size, which is sufficient for most purposes.",
      },
    ],
  },

  units: {
    title: "Unit Converter: Complete Guide",
    intro: [
      "The TrufflShuffl Unit Converter is a hub for conversions across twelve measurement categories: length, weight, temperature, area, volume, speed, time, data, pressure, energy, and power. Instead of searching for a specialised converter for each type of measurement, you can find all the most common unit conversions in one place.",
      "This guide covers which unit categories are included, when each is most useful, which industries rely on different types of unit conversion, and how measurement standardisation affects modern life in South Africa and globally.",
    ],
    sections: [
      {
        heading: "Why Unit Conversion Matters",
        paragraphs: [
          "South Africa officially uses the International System of Units (SI), also called the metric system, as its legal standard for trade, science, and government. This means kilometres, kilograms, litres, and degrees Celsius are the official units. However, many South Africans interact with non-metric units daily, whether in imported products, foreign media, sports coverage, or international business.",
          "The construction and property sector in South Africa historically used a mix of metric and imperial measurements. Old building plans may reference feet and inches. Imported materials may be specified in inches. Global suppliers may use different pressure and temperature standards depending on their country of origin.",
          "In consumer contexts, food packaging uses metric (grams, millilitres), but many traditional recipes still use cups and tablespoons. Road distances and speeds are in kilometres and km/h in South Africa, but international road trip planning involving Namibia or nearby countries may involve miles and mph for portions.",
          "Digital and technology contexts increasingly involve data size conversions (MB, GB, TB) as file sizes, storage capacities, and data transfer rates are discussed in these units by people whose natural intuition about sizes is developing as technology evolves.",
        ],
      },
      {
        heading: "Length Conversions",
        paragraphs: [
          "Length conversions are needed when working with imported materials, reading technical specifications from US or UK sources, planning international travel, or interpreting results from sports with different measurement traditions (athletics uses metres, American football uses yards).",
          "The most common length conversions in South Africa are kilometres to miles (for navigation and travel context), metres to feet (for building and property), and centimetres to inches (for clothing, screen sizes, and furniture dimensions). All 14 length conversion pairs on TrufflShuffl are available as dedicated pages with conversion tables for common values.",
          "A useful anchor: one metre is slightly longer than one yard (1m equals 1.094 yards). One kilometre is about 0.621 miles. One inch is exactly 2.54 centimetres (this is a defined exact value). One foot is exactly 30.48 centimetres.",
        ],
      },
      {
        heading: "Weight, Temperature, and Area Conversions",
        paragraphs: [
          "Weight conversions are needed for international food and product labelling, medical and pharmacy contexts (where ounces may appear on imported medications), and sports contexts (boxing and wrestling use weight classes in both kg and pounds, depending on the governing body).",
          "Temperature conversions between Celsius and Fahrenheit are needed when reading US cooking recipes (which use Fahrenheit), checking international weather forecasts, or working with imported equipment with temperature gauges in Fahrenheit. The key conversions to remember: water freezes at 0°C (32°F) and boils at 100°C (212°F). A comfortable room temperature of 22°C equals 71.6°F.",
          "Area conversions are essential for property and land measurement. South Africa uses hectares for agricultural land and square metres for residential property, while the US uses acres and square feet. A single hectare is approximately 2.47 acres or 10,000 square metres. One acre is approximately 4,047 square metres.",
        ],
      },
      {
        heading: "Volume, Speed, and Data Conversions",
        paragraphs: [
          "Volume conversions are used in cooking (US recipes use cups, tablespoons, and fluid ounces), fuel (litres and gallons), and liquid product imports (many US-sourced cleaning products and personal care items state volumes in fluid ounces). One US gallon is approximately 3.785 litres. One cup is approximately 237ml.",
          "Speed conversions are needed when South African drivers travel to Namibia, Botswana, or Swaziland (which use km/h, same as SA), or when reading about international motorsport, aviation (knots), or scientific contexts (metres per second). One mph equals 1.609 km/h. One knot (nautical mile per hour) equals 1.852 km/h.",
          "Data size conversions are increasingly important for consumers as they manage cloud storage, smartphone storage, and data plan allocations. The key relationship: 1 gigabyte (GB) equals 1,000 megabytes (MB) in the SI decimal system (used by storage manufacturers and most consumer contexts). 1 terabyte equals 1,000 GB.",
        ],
      },
      {
        heading: "Pressure, Energy, and Power Conversions",
        paragraphs: [
          "Pressure conversions are relevant in industrial, automotive (tyre pressure), medical (blood pressure), and meteorological contexts. Tyre pressure in South Africa is typically measured in bar or kilopascals (kPa). In the US and UK, PSI (pounds per square inch) is used. One bar equals 14.5 PSI; a typical passenger car tyre runs at 2.2 to 2.4 bar or 32 to 35 PSI.",
          "Energy conversions appear in nutrition (kilojoules to kilocalories for food labelling), electricity billing (kWh for consumption measurement), and fuel energy content analysis. South African food labels are required to show energy in kilojoules (kJ); recipes from other countries often use kilocalories (kcal) or just 'calories'. One kilocalorie equals 4.184 kilojoules.",
          "Power conversions between kilowatts (kW) and horsepower (hp) are used in the automotive industry, generator sizing, and electric motor specifications. South African and European cars state engine power in kW; US cars and some global car reviews still use horsepower (hp). One kilowatt equals 1.341 horsepower. A 100kW engine (common in compact cars) produces approximately 134hp.",
        ],
      },
      {
        heading: "Industries That Rely on Unit Conversion",
        paragraphs: [
          "Engineering and manufacturing: South African engineers working with imported equipment, global supply chains, or multinational clients frequently need to convert between metric and imperial specifications. Engineering drawings from US or UK sources often use imperial measurements that need to be converted to metric for local fabrication.",
          "Healthcare and pharmacy: Dosing calculations use metric throughout South Africa (mg per kg of body weight, mL of medication), but some imported medical literature and equipment from the US uses ounces, pounds, and Fahrenheit, requiring conversion.",
          "Agriculture and food processing: South African commercial agriculture operates in metric (hectares, tonnes per hectare, litres per hectare for chemical application), but international commodity markets quote volumes in bushels, acres, and short tons that need conversion for comparison.",
          "Education: Science education from primary through to university level involves unit conversion as a core skill. Dimensional analysis (also called the factor-label method) is taught to help students systematically convert between any units using known conversion factors.",
          "Aviation and maritime: Navigation uses specific units including nautical miles, knots, and feet for altitude. South African pilots and maritime professionals are trained in these units and need to convert to and from metric equivalents for certain applications.",
        ],
      },
      {
        heading: "SI Units and the Metric System",
        paragraphs: [
          "The International System of Units has seven base units from which all other units are derived: the metre (length), kilogram (mass), second (time), ampere (electric current), kelvin (temperature), mole (amount of substance), and candela (luminous intensity). South Africa adopted SI units fully in the 1970s under the Weights and Measures Act.",
          "SI prefixes (milli-, centi-, kilo-, mega-, giga-, tera-) allow any quantity to be expressed at different scales without changing the underlying unit. One kilometre is 1,000 metres; one millimetre is 0.001 metres. This consistency makes calculation and conversion easier than the imperial system's arbitrary conversion factors (12 inches in a foot, 5,280 feet in a mile).",
          "Despite the global adoption of SI, the United States remains the largest hold-out from full metrication, using the US customary system for most everyday measurements. This makes US-South Africa unit conversion one of the most common needs for South Africans engaging with American content, products, or data.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the metric system and does South Africa use it?",
        a: "The metric system (formally the International System of Units, or SI) is a decimal-based measurement system. South Africa officially adopted the metric system in 1973 under the Metrication Act and uses it as the legal standard for trade, science, and everyday measurement. Road signs are in kilometres, food is labelled in grams and millilitres, and temperature is measured in Celsius.",
      },
      {
        q: "Why do some South Africans still use miles and pounds?",
        a: "Imperial units were used in South Africa during the colonial period, and older South Africans who grew up before metrication in the 1970s still think in imperial. Additionally, South African media, travel, and business interact heavily with the US and UK, where imperial units remain in common use. Younger South Africans are more fluent in metric but still encounter imperial in media and imported goods.",
      },
      {
        q: "How many kilograms are in a stone?",
        a: "One stone equals 14 pounds, which equals approximately 6.35 kilograms. A person who weighs 12 stone weighs approximately 76.2 kilograms. Stone is used for body weight primarily in the UK and Ireland and is not officially recognised in South Africa or the US.",
      },
      {
        q: "What is the easiest way to mentally convert Celsius to Fahrenheit?",
        a: "A quick approximation: multiply by 2 and add 30. For 20°C: 20 x 2 = 40, plus 30 = 70°F (actual: 68°F). This is close enough for weather purposes. The exact formula is: °F = (°C x 9/5) + 32. For a body temperature of 37°C: (37 x 9/5) + 32 = 66.6 + 32 = 98.6°F.",
      },
      {
        q: "How many litres are in a US gallon versus a UK gallon?",
        a: "A US gallon contains approximately 3.785 litres. A UK (imperial) gallon is larger, at approximately 4.546 litres. The difference matters when reading US fuel economy (miles per gallon), which is based on the smaller US gallon. A South African fuel consumption figure of 8L/100km converts to approximately 35 mpg US or 29 mpg UK.",
      },
      {
        q: "What is the difference between MB and MiB (megabytes vs mebibytes)?",
        a: "MB (megabyte) in the SI decimal system equals exactly 1,000,000 bytes. MiB (mebibyte) in the binary system equals 1,048,576 bytes (1024 x 1024). Hard drive manufacturers use decimal MB/GB, which makes drives appear larger in advertising. Operating systems traditionally used binary MiB/GiB, which is why a '1TB' drive showed as less than 1TB in older operating systems. Modern macOS and most modern systems have switched to decimal measurement, reducing this confusion.",
      },
      {
        q: "How do I convert tyre pressure from bar to PSI?",
        a: "Multiply bar by 14.5038. A tyre at 2.2 bar equals 2.2 x 14.5038 = 31.9 PSI (approximately 32 PSI). Standard passenger car tyres in South Africa run at 2.2 to 2.4 bar (32 to 35 PSI) for the front tyres and 2.0 to 2.2 bar for the rear, but always check your vehicle's specification in the door jamb or owner's manual.",
      },
      {
        q: "What is horsepower and how does it compare to kilowatts?",
        a: "Horsepower (hp) was originally defined as the power output needed to move a horse-drawn mill and was codified by James Watt in the 18th century. One mechanical horsepower equals approximately 745.7 watts or 0.7457 kW. A 150kW car engine produces approximately 201hp. South Africa and Europe express engine power in kW; the US primarily uses hp.",
      },
      {
        q: "How does South Africa's electricity system relate to energy units?",
        a: "South African electricity is measured and billed in kilowatt-hours (kWh). One kWh is the energy consumed by a 1,000W (1kW) device running for one hour. A 100W lightbulb running for 10 hours consumes 1 kWh. Eskom's residential tariffs in 2025 are approximately R2.50 to R4.00 per kWh depending on the municipality, time of use, and consumption tier.",
      },
      {
        q: "What is a nautical mile and why is it different from a land mile?",
        a: "A nautical mile is defined as one minute of arc of latitude along the Earth's surface, which equals approximately 1,852 metres or about 1.15 statute (land) miles. It is used in aviation and maritime navigation because it relates directly to the latitude coordinates on charts. A knot is one nautical mile per hour.",
      },
    ],
  },

  investing: {
    title: "Investing Calculator: Complete Guide",
    intro: [
      "The TrufflShuffl Investing Calculator covers three of the most important tools for self-directed investors: dollar-cost averaging (DCA), compound annual growth rate (CAGR), and dividend income projection. Each tab answers a different question — how much will I accumulate if I invest regularly, what return has my portfolio actually delivered, and what income can I expect from dividend-paying shares. Together, they give you a complete picture of your investment strategy.",
      "This guide explains every input and output on each tab, shows you how to interpret the results, and highlights the common mistakes that lead investors to draw wrong conclusions from their numbers. All calculations work with any currency, making the calculator equally useful whether you are investing in a local index fund, a US stock portfolio, or a global ETF.",
    ],
    sections: [
      {
        heading: "DCA Tab: How Dollar-Cost Averaging Compounds Over Time",
        paragraphs: [
          "Enter your monthly contribution — the fixed amount you plan to invest every month regardless of market conditions. Then set the number of years and the expected annual return. The calculator assumes contributions are made at the start of each month and compounds monthly.",
          "The result shows your total future value, total amount contributed, and total gains from compounding. The growth table breaks this down year by year, so you can see exactly when the compounding curve begins to accelerate. In the early years, contributions dominate. After roughly the midpoint of your horizon, compounding gains overtake new contributions — this crossover is the visual proof of why time in the market matters more than timing the market.",
          "The expected return rate is the most sensitive input. Use a conservative rate for planning: 7–10% per year is a reasonable assumption for a diversified equity portfolio over the long run, but actual returns vary significantly year to year. Running the calculator at both a low (6%) and high (12%) scenario shows the range of outcomes and helps you size contributions to hit your goal even in the conservative case.",
        ],
      },
      {
        heading: "CAGR Tab: Measuring True Investment Performance",
        paragraphs: [
          "Enter the starting value, ending value, and number of years. The CAGR calculator returns the compound annual growth rate — the single annual percentage that, applied consistently, takes you from start to end over that period. It also shows the total return as a percentage.",
          "CAGR is the only honest way to compare investments of different lengths. A fund that turned R100 000 into R180 000 over 6 years has a CAGR of 10.3%, not 13.3% (which is the simple total return divided by years). Use CAGR to compare your portfolio against a benchmark index, or to evaluate whether switching to a different product is worth the costs.",
          "A common pitfall: CAGR smooths out volatility. A portfolio that dropped 40% in one year and recovered strongly still shows an attractive CAGR if the end value is high. Always look at CAGR alongside maximum drawdown and volatility data from your fund's fact sheet.",
        ],
      },
      {
        heading: "Dividends Tab: Projecting Passive Income From Shares",
        paragraphs: [
          "Enter your current portfolio value, the dividend yield percentage, the expected annual dividend growth rate, and the number of years. The calculator projects Year 1 annual dividend income, the income in the final year of your projection, and total dividends received over the entire period.",
          "Dividend growth is as important as current yield. A share with a 3% yield growing dividends at 8% per year will yield 6.5% on your original investment in 10 years and 14% in 20 years (yield-on-cost). A share with a 7% yield and no dividend growth stays at 7% forever. Growth compounds; high static yield does not.",
          "The dividend tab does not model reinvestment (DRIP). If you reinvest dividends, run the DCA tab with your dividend income as the monthly contribution and your portfolio as the starting principal — the combined result approximates a dividend reinvestment strategy. Including dividend reinvestment typically adds 30–50% to total returns over a 20-year period.",
        ],
      },
      {
        heading: "Interpreting Results and Common Mistakes",
        paragraphs: [
          "The biggest mistake is confusing nominal and real returns. If you enter 10% as your expected return but inflation runs at 4%, your real return is closer to 6%. Your future portfolio value in nominal terms looks impressive, but its purchasing power is significantly less than the number suggests. For retirement planning, always calculate using a real return (after inflation) assumption.",
          "Fees have a dramatic compounding effect that calculators rarely show directly. A 1% annual management fee on a portfolio compounding at 10% reduces the effective rate to 9%, which sounds small but costs you roughly 17% of your total portfolio value over 20 years. If your fund charges 1.5%, that cost rises to 25% of what you would have earned in a fee-free index fund. Account for fees by reducing your expected return input by the annual total expense ratio (TER) of your chosen product.",
        ],
      },
    ],
    faqs: [
      {
        q: "What monthly contribution rate should I use as a target?",
        a: "Financial planners generally recommend saving 15–20% of gross income for retirement and a further 5–10% for medium-term goals. Use the DCA calculator to work backward: set your target future value and years, then adjust the monthly contribution until you hit it. This tells you the exact savings rate required, which you can compare against your income.",
      },
      {
        q: "Why does the DCA result look different from simple multiplication?",
        a: "Because contributions earn returns for different periods. The first month's contribution grows for the full period; the last month's contribution earns almost nothing. The calculator accounts for this correctly using the future value of an annuity formula. Simple multiplication would overstate the result.",
      },
      {
        q: "What is a realistic CAGR for a global equity index fund?",
        a: "Global equity index funds (MSCI World, S&P 500) have historically delivered 8–10% CAGR in USD over rolling 20-year periods. In local currency terms this varies significantly with exchange rate movements. A conservative planning assumption is 7–9% nominal, or 4–6% real (after inflation). Past performance does not guarantee future returns.",
      },
      {
        q: "What dividend yield is considered sustainable?",
        a: "A dividend yield of 3–5% from a well-established company with consistent earnings is generally considered sustainable. Yields above 7% often signal that the share price has fallen (yield = dividend / price), which may indicate financial stress. Always check the dividend payout ratio: a company paying out more than 80% of earnings as dividends has little room to maintain the dividend if earnings dip.",
      },
      {
        q: "How do I use the calculator to check if I am on track for retirement?",
        a: "Enter your current retirement savings as the DCA starting value, your monthly contribution, your expected return, and your years to retirement. Compare the projected future value to your retirement income target: a common rule is to accumulate 25× your desired annual income (the 4% withdrawal rule). If the projected value falls short, the calculator tells you exactly how much to increase monthly contributions to close the gap.",
      },
      {
        q: "Does the calculator account for tax on investment returns?",
        a: "No — the calculator uses pre-tax returns. In practice, returns from unit trusts, ETFs, and fixed deposits may attract dividends tax, capital gains tax, or income tax depending on your jurisdiction and account type. For tax-advantaged accounts (pension, provident, retirement annuity in South Africa; ISA in the UK; IRA/401k in the US), the calculator's pre-tax figures are more accurate since growth is tax-deferred.",
      },
      {
        q: "What is yield-on-cost and why does it matter for dividend investors?",
        a: "Yield-on-cost is your current annual dividend income divided by your original purchase price. If you bought at R100 and the dividend has grown to R8 per share, your yield-on-cost is 8%, even if the current share price is R200 (making the current yield 4%). Yield-on-cost shows how rewarding a past investment decision was; it's a useful personal tracking metric but irrelevant for new capital allocation decisions.",
      },
      {
        q: "Can I model ETF vs lump-sum vs DCA strategies in the calculator?",
        a: "Yes. For a lump-sum strategy, enter the full amount as the starting value with zero monthly contribution. For pure DCA, enter zero starting value and your monthly contribution. For a combination (starting lump sum plus regular contributions), enter both. Running all three scenarios side by side shows which approach delivers the best outcome under your specific return and time assumptions.",
      },
    ],
  },

  automotive: {
    title: "Automotive Calculator: Complete Guide",
    intro: [
      "The TrufflShuffl Automotive Calculator covers three distinct but related vehicle calculations: tyre size comparison and speedometer error, vehicle depreciation over time, and braking distance at various speeds and road conditions. Whether you are modifying your vehicle, making a buying decision, or trying to understand the true cost of car ownership, these tools give you precise numbers rather than rough estimates.",
      "This guide explains what each tab calculates, how to enter your values correctly, and how to apply the results to real decisions. The calculations are based on standard automotive physics and depreciation models used by fleet managers and insurers worldwide.",
    ],
    sections: [
      {
        heading: "Tyre Size Tab: Understanding Diameter, Speedo Error, and Legality",
        paragraphs: [
          "Enter your current (OEM) tyre size in the standard format: width/aspect ratio/wheel diameter (e.g., 225/55R17). Then enter the new tyre size you are considering. The calculator converts both to overall diameter, shows the percentage difference, and calculates the speedometer error at any speed you specify.",
          "The speedometer error works because your vehicle's speedometer is calibrated to the rotations-per-kilometre of your original tyre size. A taller tyre rotates fewer times per kilometre, making the speedo read lower than actual speed (you are going faster than the display shows). A shorter tyre rotates more, making the speedo read high (you appear slower than you are going to a speed camera).",
          "Most manufacturers specify an allowable tyre size range in the vehicle handbook. Legally, most jurisdictions allow a diameter change of up to ±3% from original. Beyond this, the change may require a roadworthy certificate, may affect your insurance cover, and will interfere with ABS and traction control calibration. The calculator flags whether your proposed change falls within this tolerance.",
        ],
      },
      {
        heading: "Depreciation Tab: The True Cost of Car Ownership",
        paragraphs: [
          "Enter the vehicle's purchase price, the annual depreciation rate, and the number of years. The calculator shows the residual value at each year, the total depreciation cost, and the annual depreciation amount. You can compare two vehicles side by side by running the calculator twice.",
          "The default depreciation model uses a declining balance method (the same percentage applied to the remaining value each year), which mirrors how vehicle values actually behave in most markets. A 20% annual rate means the vehicle retains 80% of its previous year's value each year: after 5 years it's worth 32.8% of the original price (0.8⁵ = 0.328).",
          "Use the depreciation output as part of a total cost of ownership calculation: annual depreciation + annual insurance + annual fuel + annual servicing = true cost per year. Dividing by annual kilometres gives you a cost per kilometre figure that is far more revealing than the pump price alone. Many people are surprised to find that depreciation exceeds fuel cost as the single largest expense for a newer vehicle.",
        ],
      },
      {
        heading: "Braking Distance Tab: The Physics of Stopping",
        paragraphs: [
          "Enter your vehicle speed, the road surface type (dry tarmac, wet tarmac, gravel, or ice), and your reaction time. The calculator returns braking distance (from brake application to stop), reaction distance (distance covered while you perceive the hazard and apply the brake), and total stopping distance.",
          "The key physics: braking distance scales with the square of speed. At 60 km/h you need roughly 27m to stop on dry tarmac. At 120 km/h (double the speed) you need 108m (four times the distance, not double). This quadratic relationship is why each 10 km/h increment at highway speeds adds disproportionately more stopping distance than the same increment at lower speeds.",
          "The friction coefficient (μ) for each surface is: dry tarmac 0.75–0.80, wet tarmac 0.45–0.55, gravel 0.40–0.55, ice 0.10–0.20. Worn tyres reduce the coefficient by 15–30% even on dry surfaces. The calculator's surface presets use mid-range values; if your tyres are worn, the actual stopping distance will be longer than shown.",
        ],
      },
      {
        heading: "Applying These Calculations to Real Decisions",
        paragraphs: [
          "For tyre changes: always calculate the speedo error before purchasing. A 2% speedo error at 120 km/h means you are actually travelling at 122.4 km/h when the instrument shows 120 — enough to attract a speed fine in many jurisdictions. Also verify that the new tyre fits within the wheel arch without rubbing at full lock and maximum suspension compression.",
          "For vehicle purchases: run the depreciation calculator for both the new vehicle you are considering and a 3-year-old equivalent. The difference in residual values after 5 years of your ownership tells you how much of the price premium for new disappears over your holding period. For most buyers who keep vehicles 5–8 years, the premium for new is not recovered in any financial sense.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I read a tyre size code?",
        a: "The code 225/55R17 means: 225mm tyre width, 55% aspect ratio (sidewall height = 55% of 225mm = 123.75mm), R = radial construction, 17-inch wheel diameter. The overall diameter = wheel diameter in mm (17 × 25.4 = 431.8mm) + 2 × sidewall height (2 × 123.75 = 247.5mm) = 679.3mm total.",
      },
      {
        q: "What annual depreciation rate should I use?",
        a: "New passenger vehicles typically depreciate at 15–25% per year. Luxury vehicles and those with high running costs depreciate faster (20–30%). Vehicles with strong reliability reputations and high demand depreciate more slowly (10–15%). Fleet vehicles and commercial vehicles use straight-line depreciation for accounting. For a typical new family car, 18–20% per year is a reasonable estimate.",
      },
      {
        q: "What reaction time should I use in the braking distance calculator?",
        a: "Alert, undistracted drivers have a reaction time of approximately 0.75 seconds. The legal standard in most countries assumes 1.0 second. Distracted or fatigued drivers may take 1.5–2.5 seconds. Most road safety guidelines use 1.5 seconds for conservative stopping distance calculations. Enter 1.5 seconds unless you are doing a specific performance analysis.",
      },
      {
        q: "Does tyre aspect ratio affect handling as well as diameter?",
        a: "Yes. A lower aspect ratio (e.g. 40 vs 55) means a shorter, stiffer sidewall. This typically improves handling precision (less sidewall flex in corners) but produces a harsher ride and makes the tyre more vulnerable to pothole damage. Going to a significantly lower aspect ratio also means fitting a larger wheel to maintain overall diameter, adding wheel cost to the modification.",
      },
      {
        q: "Why do vehicles depreciate so fast in the first year?",
        a: "A new vehicle commands a price premium for its warranty, factory specification, and zero previous owners. The moment it is registered and driven off the forecourt, it becomes a used vehicle and is priced accordingly. Part of the first-year drop is also the dealer margin: the retail markup means the market price of a second-hand version is below the new price even on day one. This is why finance on a new vehicle is financially inefficient — you are borrowing at interest to fund an asset that immediately loses 15–25% of its value.",
      },
      {
        q: "Is braking distance the same for all vehicles at the same speed?",
        a: "No. Heavier vehicles have more kinetic energy to dissipate at the same speed, which requires longer braking distances unless the braking force is proportionally higher. ABS-equipped vehicles brake significantly shorter than non-ABS vehicles on slippery surfaces. High-performance vehicles with wider tyres, stickier compounds, and larger brake systems stop in shorter distances than standard family cars. The calculator uses mid-range values; sports cars may stop in 20–30% less distance, while heavy SUVs may need 10–20% more.",
      },
      {
        q: "How do I calculate the cost per kilometre of running my vehicle?",
        a: "Cost per kilometre = (annual depreciation + annual insurance + annual fuel + annual servicing + tyres + licensing) ÷ annual kilometres. The depreciation tab gives you the annual depreciation figure. Add your actual insurance premium, fuel spend (litres × price per litre × annual kilometres ÷ 100 for your consumption rate), and typical service costs. The result is typically 2–4× the fuel cost alone.",
      },
      {
        q: "What happens to ABS if I change tyre sizes significantly?",
        a: "ABS and stability control (ESC) rely on wheel speed sensors. If the tyre diameter changes, the wheel rotates at a different speed for a given vehicle speed, and the ECU may interpret this as wheel slip and intervene incorrectly — or fail to intervene when it should. A diameter change within ±3% is generally safe. Beyond this, the ECU may need recalibration, which requires dealer-level diagnostic equipment.",
      },
    ],
  },

  ev: {
    title: "Electric Vehicle Calculator: Complete Guide",
    intro: [
      "The TrufflShuffl EV Calculator has three tabs designed to answer the questions that matter most to current and prospective EV owners: how much does a charge cost, what is my real cost per kilometre, and how does running an EV compare financially to keeping a petrol or diesel vehicle. Each tab isolates a different part of the economics so you can see exactly where the savings come from — and where they do not.",
      "This guide walks through every input on each tab, explains the formulas behind the results, and highlights the real-world factors that can cause your actual costs to differ from the calculator's output. All calculations support any currency, making the tool equally useful whether you are pricing charging costs in South Africa, the UK, Australia, or the US.",
    ],
    sections: [
      {
        heading: "Charging Cost Tab: What Each Charge Session Actually Costs",
        paragraphs: [
          "Enter your vehicle's battery capacity in kWh (found in the spec sheet or owner's manual), your current state of charge (e.g. 20%), your target charge level (e.g. 80%), and your electricity rate in the local currency per kWh. The calculator returns the energy required, the cost of that charge session, and the effective cost per 100km based on your vehicle's consumption figure.",
          "The key input is your electricity tariff. Home overnight charging is typically the cheapest option — in most markets this is 0.15–0.30 per kWh. Public AC chargers typically cost 1.5–2× the home rate. DC fast chargers (50–350 kW) can cost 2–4× the home rate because the infrastructure investment is amortised across fewer sessions. The calculator lets you compare all three rates side by side.",
          "Charging efficiency matters: not all the electricity drawn from the grid makes it into the battery. Most EVs have a charging efficiency of 90–95% for AC charging and slightly lower for DC fast charging due to the additional conversion step. The displayed kWh on a charge session is the energy drawn from the grid, not what enters the battery, so some difference between the stated capacity and the measured charge is normal.",
        ],
      },
      {
        heading: "Cost Per km Tab: Your True Running Cost",
        paragraphs: [
          "Enter your vehicle's real-world consumption (kWh per 100km, found in your in-car display after a few weeks of driving), your electricity tariff, and your annual mileage. The calculator returns your cost per kilometre, monthly energy cost, and annual energy cost.",
          "Real-world consumption typically runs 10–20% higher than the manufacturer's stated WLTP figure. A vehicle rated at 18 kWh/100km commonly delivers 20–22 kWh/100km in mixed driving, especially in winter when cabin heating draws from the battery. Use at least 4 weeks of your actual driving data for the most accurate input.",
          "The tab also shows the equivalent litres-per-100km your electricity spend represents at the current fuel price — a useful translation for comparing to your previous petrol vehicle. If electricity at your rate costs the equivalent of 2.5 L/100km in petrol terms, and your old car used 8.5 L/100km, the energy saving is immediately visible.",
        ],
      },
      {
        heading: "ICE vs EV Comparison Tab: The Full Financial Picture",
        paragraphs: [
          "Enter the purchase price of the EV, the purchase price of the equivalent petrol/diesel vehicle (ICE), both vehicles' running costs (energy and servicing), and your annual mileage. The calculator computes the annual running cost difference, the cumulative cost advantage of the EV, and the break-even year — the point at which the lower running costs offset the higher purchase price.",
          "Servicing costs are a significant part of the comparison and are often understated in favour of EVs. EVs have no oil changes, spark plugs, timing belts, or exhaust replacements, and reduced brake wear from regenerative braking. However, tyre wear on heavy EVs is higher than average. A realistic EV servicing cost is 40–60% of an equivalent ICE vehicle over a 5-year period.",
          "The comparison does not automatically include battery replacement cost, which remains a variable depending on vehicle age and usage pattern. For most current buyers planning 5–8 year ownership, battery replacement is unlikely to be necessary with normal use. For longer ownership periods or high annual mileage, factor in a battery replacement cost at year 10–12 to keep the comparison fair.",
        ],
      },
      {
        heading: "Factors That Affect Your Real-World Numbers",
        paragraphs: [
          "Climate is the largest variable. In cold climates (below 5°C regularly), EV range and efficiency can drop 20–40% because lithium-ion batteries deliver less capacity at low temperatures and cabin heating draws entirely from the battery rather than waste engine heat. If you live in a cold climate, use a consumption figure 25–30% above the manufacturer's WLTP rating for winter planning.",
          "Charging habits matter for long-term cost. If you frequently use expensive public DC fast chargers instead of home charging, the cost advantage narrows significantly. The Charging Cost tab lets you model a realistic mix: enter what percentage of your charging is done at home, at work (free), and at public fast chargers to see your blended effective rate.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I find my EV's real-world kWh/100km consumption?",
        a: "The most accurate method is to note the total kWh added during a full charge-to-charge cycle (your home charger app or the car's display shows this) and divide by the kilometres driven in that cycle. After several cycles, average the results. The car's in-built efficiency display is a close second — look in the trip or energy menu for kWh/100km.",
      },
      {
        q: "What electricity rate should I use for home charging?",
        a: "Use the rate shown on your electricity bill for the tariff block that applies to overnight use. If you have a flat tariff, use that rate directly. If you have time-of-use pricing, use the off-peak rate since most EV owners schedule overnight charging for the cheapest window. The Charging Cost tab allows you to compare home and public rates directly.",
      },
      {
        q: "How long does it take to charge from 20% to 80%?",
        a: "Charging time = energy required (kWh) ÷ charger power (kW). For a 60 kWh battery from 20% to 80% (36 kWh needed): on a 7.4 kW home charger = 36 ÷ 7.4 = 4.9 hours. On a 50 kW DC fast charger = 36 ÷ 50 = 0.72 hours (43 minutes). Note that DC charging slows above 80% to protect the battery, so 80% is the practical fast-charge limit.",
      },
      {
        q: "Does charging to 100% damage the battery?",
        a: "Regularly charging to 100% accelerates lithium-ion battery degradation because the cells are under maximum stress at full charge. Most EV manufacturers recommend a daily charging limit of 80% for longevity, with 100% charges reserved for long trips. Conversely, regularly depleting below 10–15% also stresses the battery. The sweet spot for daily cycling is 20–80%.",
      },
      {
        q: "What is the real break-even point for switching from a petrol car to an EV?",
        a: "It depends on the price premium, annual mileage, and the fuel-to-electricity price ratio. With typical inputs in most markets (EV premium of $5,000–$15,000, electricity at 25% of the equivalent petrol cost per km, 15,000 km/year), break-even falls between 3 and 7 years. Higher annual mileage and a larger fuel-to-electricity price gap shorten the break-even significantly.",
      },
      {
        q: "How much cheaper is EV servicing than petrol car servicing?",
        a: "EV annual servicing typically costs 40–60% of equivalent petrol vehicle servicing over a 5-year period. Services consist mainly of tyre rotation, cabin air filter replacement, brake fluid check (brake pads last longer due to regenerative braking), and software updates. Oil changes, spark plugs, timing belt replacements, and exhaust work are eliminated entirely.",
      },
      {
        q: "Are public DC fast chargers always more expensive?",
        a: "Yes, in most markets. Public DC fast charging typically costs 2–4× the home electricity rate per kWh because operators must recover the capital cost of the charger, installation, grid connection, and land use through the per-kWh charge. Some networks offer subscription plans that reduce the per-kWh rate for frequent users. Use public DC chargers for long trips and home/workplace charging for daily use.",
      },
      {
        q: "How does cold weather affect the ICE vs EV comparison?",
        a: "Cold weather narrows the EV's efficiency advantage. A petrol car's fuel economy changes little with temperature (engines warm up quickly); an EV's efficiency can drop 20–40% in cold conditions. In very cold climates, the break-even year lengthens and the annual running cost saving is smaller. However, EVs still break even in most climates — the advantage is just less dramatic in the cold.",
      },
    ],
  },

  solar: {
    title: "Solar Power Calculator: Complete Guide",
    intro: [
      "The TrufflShuffl Solar Calculator covers the three questions that every prospective solar owner needs to answer before committing to a system: how many panels does my household need, how long will my battery last during an outage or off-grid period, and when will the system pay for itself and what is the long-term return on investment. Getting these numbers right before engaging installers saves you from over-specifying an expensive system or under-specifying one that doesn't meet your actual needs.",
      "This guide explains every input on each tab, describes the formulas used, and highlights where real-world results typically differ from ideal calculations. The calculator applies globally — whether you are sizing a grid-tied system in South Africa, a hybrid system in Australia, or an off-grid setup in Europe.",
    ],
    sections: [
      {
        heading: "Panel Sizing Tab: How Many Panels Do You Need?",
        paragraphs: [
          "Enter your daily electricity consumption in kWh (from your electricity bill: monthly kWh ÷ 30), the peak sun hours for your location (the number of hours per day at 1,000 W/m² irradiance — typically 4–6 for most of Africa, Australia, and southern Europe; 2–4 for northern Europe), and your panel wattage (typically 400–550 W for modern monocrystalline panels).",
          "The calculator applies a system derate factor of 0.80 by default, which accounts for inverter efficiency losses (~4%), wiring losses (~2%), soiling and shading (~5%), and temperature derating (~7%) that reduce real-world output below the nameplate specification. This is the industry-standard derate factor; in dusty environments or with significant shading, reduce to 0.70–0.75.",
          "The result is the minimum number of panels. Always round up to a whole panel. Your installer may add 1–2 additional panels depending on roof space and inverter input capacity. More panels than the minimum size produce surplus energy, which can be exported to the grid (if a feed-in tariff applies) or used to charge batteries faster.",
        ],
      },
      {
        heading: "Battery Backup Tab: How Long Will It Last?",
        paragraphs: [
          "Enter your battery capacity (kWh), the depth of discharge (DoD) your battery type supports (LFP/LiFePO4: 80–95%; lead-acid: 40–50%; NMC lithium: 70–80%), and the connected load in watts. The calculator returns the runtime in hours.",
          "The connected load input is where most people make their mistake. Use the actual load during an outage, not your full household consumption. During a power cut, you typically run only essentials: a fridge (80–150W), lights (40–80W LED), router (15–25W), laptop and phone chargers (60–100W), and possibly a TV (80–150W). A selective essential load of 300–500W will last many times longer on the same battery than a full household load of 2,000–4,000W.",
          "Battery capacity degrades over time. A 10 kWh battery rated for 3,000 cycles to 80% DoD will retain roughly 80% of its original capacity after those cycles (around 8–10 years of daily cycling). The calculator uses nameplate capacity; for an older battery, reduce the capacity input by the estimated degradation percentage to get a more accurate current runtime estimate.",
        ],
      },
      {
        heading: "Payback & ROI Tab: When Does the System Pay for Itself?",
        paragraphs: [
          "Enter your total system cost, current monthly electricity bill, the percentage of your bill you expect to offset (typically 60–90% for a well-sized grid-tied system), and your assumed annual electricity tariff escalation rate. The calculator returns the simple payback period and a 25-year return on investment.",
          "Tariff escalation is the most powerful variable in a solar payback calculation. If electricity prices rise 8% per year (a conservative assumption in many markets), the value of each unit of self-generated solar energy increases every year — dramatically accelerating the payback. A system with a 7-year simple payback at today's tariff may effectively pay back in 5 years when the rising value of displaced electricity is included.",
          "The 25-year ROI reflects the full lifespan of quality solar panels (warranted to 80% output at 25 years, with real lifespans typically exceeding 30 years). After the payback period, all energy generated is pure financial return. A well-designed system in a good solar resource area with rising tariffs can deliver a 15–25% internal rate of return — comparable to a high-performing equity investment but with zero volatility.",
        ],
      },
      {
        heading: "What the Calculator Does Not Include",
        paragraphs: [
          "The panel sizing tab assumes unshaded panels facing the optimal direction (north in the southern hemisphere, south in the northern hemisphere) at the optimal tilt angle. Shading from trees, neighbouring buildings, or the roof edge significantly reduces output and may require a string inverter to be replaced with microinverters or power optimisers at additional cost. Have a shading analysis done before finalising the design.",
          "The ROI tab does not include maintenance costs (panel cleaning, inverter replacement at 10–15 years, battery replacement at 8–12 years for most lithium chemistries). For a complete ROI picture, add an annualised maintenance provision of 0.5–1% of system cost per year, and a battery replacement cost at year 10 if your system includes storage.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I find the peak sun hours for my location?",
        a: "The most reliable source is the Global Solar Atlas (globalsolaratlas.info), which provides irradiance data in kWh/m²/day for any location — this figure directly equals peak sun hours per day. Alternatively, solar installers will have local data. For planning purposes: most of sub-Saharan Africa: 5–6, Australia: 4.5–6, southern Europe and southern US: 4.5–6, central Europe and northern US: 3–4.5, northern Europe: 2–3.",
      },
      {
        q: "What panel wattage should I use in the sizing calculator?",
        a: "Use the wattage of the specific panel your installer quotes, or use 400W as a planning default if you have not yet obtained quotes. Modern residential panels range from 400W to 550W. Using a higher wattage panel produces more energy per panel, so you need fewer panels for the same output — but the panels cost more each. The total system cost often ends up similar regardless of panel wattage.",
      },
      {
        q: "What depth of discharge should I set for my battery?",
        a: "For LFP (lithium iron phosphate) batteries — the current standard for residential solar: set DoD to 80–90%. Manufacturers typically warrant 80% DoD for their rated cycle life. For lead-acid batteries: use 40–50% DoD to prevent premature degradation. For NMC (nickel manganese cobalt) lithium: use 70–80%. Never use 100% DoD for planning — always leave a buffer.",
      },
      {
        q: "Will my solar system still work during a power outage if I have no battery?",
        a: "No. A grid-tied system without battery storage automatically shuts down during a power outage for safety reasons (to prevent the solar panels from back-feeding into the grid and injuring line workers). Only a hybrid or off-grid system with battery storage continues to operate independently during grid outages. If backup power during outages is your priority, batteries are essential.",
      },
      {
        q: "What percentage of my electricity bill can solar realistically offset?",
        a: "A well-designed grid-tied system can offset 60–90% of annual electricity consumption for a typical household. The offset is not 100% because solar produces nothing at night and less on overcast days, requiring grid power during those periods. With battery storage, the offset can reach 80–95% for most households. The ROI tab lets you adjust this percentage based on your specific situation.",
      },
      {
        q: "How does annual tariff escalation affect the payback calculation?",
        a: "Every percentage point of annual electricity tariff increase shortens the payback period because the value of self-generated electricity rises each year. At 0% escalation, payback depends entirely on current bill savings. At 8% annual escalation, the value of displaced electricity nearly doubles over 9 years, cutting the effective payback period by 20–30% compared to the simple calculation.",
      },
      {
        q: "What causes real-world solar output to be lower than calculated?",
        a: "The main factors: temperature (panels lose efficiency above 25°C — typically 0.4% per °C above rated temperature, meaning a 35°C panel temperature reduces output by 4%); soiling and dust on panels; partial shading from objects or roof features; inverter efficiency losses; wiring resistance; and panel-to-panel mismatch in a string. The system derate factor (default 0.80) captures the combined effect of all these.",
      },
      {
        q: "Is it worth adding batteries to an existing panels-only solar system?",
        a: "The financial case depends on your tariff structure and outage frequency. If you have significant time-of-use pricing (high peak rates, low off-peak), battery arbitrage — charging from cheap off-peak grid power and discharging during expensive peak hours — can generate returns. If your main driver is backup power, estimate the value of avoided outage disruption. Batteries added to an existing system typically have a longer payback (5–10 years) than panels alone.",
      },
    ],
  },

  electricity: {
    title: "Home Electricity Calculator: Complete Guide",
    intro: [
      "The TrufflShuffl Home Electricity Calculator breaks your electricity bill into its component parts. The Appliance Cost tab identifies which devices are responsible for the largest share of your consumption. The UPS Runtime tab tells you exactly how long your battery backup will run during an outage under a specified load. The Geyser tab calculates the daily, monthly, and annual cost of heating your water, which is typically the single largest item on a residential electricity bill.",
      "This guide explains how to use each tab, what each input means, and how to interpret the results. Understanding where your electricity goes is the first step to reducing your bill — and these three tools cover the three areas where the largest savings are typically found.",
    ],
    sections: [
      {
        heading: "Appliance Cost Tab: Finding Your Biggest Consumers",
        paragraphs: [
          "Start by entering your electricity tariff (the rate you pay per kWh, from your electricity bill). Then add each appliance: its wattage (found on the device label or in its manual), and the number of hours per day it runs. The calculator shows the daily, monthly, and annual cost for each appliance individually and as a total.",
          "Wattage for variable-speed or thermostat-controlled appliances (fridges, air conditioners, geysers) is the peak or rated wattage, not the average. A fridge rated at 150W does not draw 150W continuously — its compressor cycles, and average consumption is typically 30–50% of the rated wattage. Use the appliance's actual annual kWh from its energy label for more accuracy, or divide that figure by 365 to get daily kWh.",
          "The most impactful appliances to investigate are always thermal loads: anything that heats or cools. A 2000W bar heater running 5 hours a day uses 10 kWh — at a typical tariff this costs as much per day as all your LED lights running all day combined. Switching from resistive electric heating to a heat pump (4–5× more efficient) is the single highest-impact appliance change most households can make.",
        ],
      },
      {
        heading: "UPS Runtime Tab: Planning Your Backup Power",
        paragraphs: [
          "Enter the UPS capacity in VA (volt-amperes), the power factor (typically 0.6–0.8 for office-type UPS units; check the specs), the UPS efficiency (typically 85–95%), and the total wattage of connected loads. The calculator returns usable watts and estimated runtime.",
          "The load input should be the combined wattage of everything you plan to connect during an outage: desktop PC (80–200W), monitor (20–40W), router (15–25W), a lamp (5–10W LED). Keep the connected load to 70% of the UPS's usable watts to allow for surge currents when devices start and to preserve battery health.",
          "UPS batteries degrade significantly over 3–5 years. If your UPS is older, the actual runtime will be lower than the calculator shows because the battery can no longer hold its full rated charge. Most UPS units display a battery health indicator; if the battery is flagged for replacement, treat the calculator's output as the new-battery ideal rather than the current reality.",
        ],
      },
      {
        heading: "Geyser Cost Tab: Your Largest Single Appliance",
        paragraphs: [
          "Enter your geyser (hot water heater) tank size in litres, the element wattage (stamped on the element or visible in the settings, typically 2–4 kW), the cold water inlet temperature (15–20°C in most climates, lower in winter), the thermostat set temperature (typically 55–65°C), and your tariff. The calculator returns the energy to heat a full tank and the cost.",
          "The formula is: Energy (kWh) = tank volume (litres) × 4.186 × temperature rise (°C) ÷ 3,600 ÷ element efficiency. For a 150-litre tank heating from 18°C to 60°C: 150 × 4.186 × 42 ÷ 3,600 = 7.32 kWh per heat-up cycle. At a typical tariff this is a significant daily cost — and if the geyser has poor insulation or is in a cold roof space, the cycle may repeat 2–3 times per day.",
          "The most cost-effective geyser interventions are: installing a timer (heat only during off-peak tariff windows or before peak demand periods), insulating the geyser blanket and the first metre of hot water pipe (reduces standby losses by 30–40%), and reducing the thermostat temperature from 65°C to 55–60°C (saves 15–25% in heating energy with minimal practical impact on available hot water volume).",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I find the wattage of an appliance?",
        a: "Check the label on the appliance, its manual, or its energy rating sticker. It may be expressed in watts (W) or kilowatts (kW). If you find the amps (A) and voltage (V), calculate wattage as W = V × A. For most countries: 230V (Europe, Africa, Australia, Asia) or 120V (US, Canada). A 10A appliance on a 230V supply draws 2,300W.",
      },
      {
        q: "What does kWh mean and how does it relate to my bill?",
        a: "A kilowatt-hour (kWh) is the energy used by a 1,000-watt device running for one hour. Your bill charges you per kWh consumed. To calculate the cost of any appliance: (watts ÷ 1000) × hours per day × days × tariff per kWh. A 2,000W heater running 4 hours per day for 30 days at $0.25/kWh = 2 × 4 × 30 × 0.25 = $60/month.",
      },
      {
        q: "How long will a 1000VA UPS last with my PC and monitor?",
        a: "A typical desktop PC draws 80–200W and a monitor 20–40W, so roughly 100–240W total. A 1000VA UPS with 0.7 power factor delivers approximately 700W usable. At 90% efficiency, that is 630W available. At a 150W load: 630 ÷ 150 = 4.2 hours theoretical. In practice, the battery may be older and partially degraded, so expect 2–3 hours for a typical setup.",
      },
      {
        q: "What temperature should my geyser thermostat be set to?",
        a: "55–60°C is the recommended range. Below 55°C there is a risk of Legionella bacteria growth in stored water (a health risk). Above 65°C is unnecessary and wastes energy, and poses a scalding hazard at the tap without a tempering valve. At 60°C most households have sufficient hot water and the geyser runs at near-optimal efficiency.",
      },
      {
        q: "Will a geyser timer actually save money?",
        a: "Yes, in two ways. First, if you have time-of-use tariffs, scheduling the geyser to run during off-peak (cheaper) hours directly reduces cost. Second, even on flat tariffs, a timer prevents the thermostat from cycling throughout the day to maintain temperature when no hot water is being drawn — reducing standby energy losses. A basic 24-hour mechanical timer costs very little and typically pays back within weeks.",
      },
      {
        q: "How do I reduce my electricity bill by the most in the least time?",
        a: "Focus on your three biggest consumers in order: (1) geyser — add a timer and insulation, consider a solar water heater; (2) space heating/cooling — switch from resistive heating to heat pump, improve insulation; (3) pool pump if applicable — reduce daily run hours and install a variable-speed pump. LED lighting upgrades have a lower impact than commonly believed because the energy saving per bulb is small — but they are easy and cumulative.",
      },
      {
        q: "Is it worth upgrading to a heat pump water heater?",
        a: "Generally yes, with a payback period of 2–5 years in most markets. A heat pump water heater uses 60–75% less energy than a resistive element geyser because it moves heat from the air rather than generating it directly. In warm climates (above 10°C ambient air temperature), heat pumps operate efficiently. In cold climates they are less efficient but still significantly better than resistive heating.",
      },
      {
        q: "How accurate are the appliance wattage values I find online?",
        a: "Wattage published online or in appliance databases is the rated peak wattage, which appliances rarely draw continuously. A washing machine rated at 2200W only draws that during the heating phase; it uses much less during the wash and spin cycle. For accurate cost calculation, a plug-in energy monitor (smart plug with power metering) measures actual consumption over a full usage cycle and is the most reliable method.",
      },
    ],
  },

  water: {
    title: "Water Calculator: Complete Guide",
    intro: [
      "The TrufflShuffl Water Calculator covers three interconnected water planning tasks: estimating your household's daily water consumption and monthly bill, calculating the rainwater harvesting potential from your roof, and determining how long a water storage tank will last at your consumption rate. Used together, these three tools let you assess your water self-sufficiency and plan any combination of efficiency, harvesting, and storage interventions.",
      "This guide explains each tab's inputs, the formulas behind the calculations, and how to apply the results to real water management decisions. The principles are universal and apply whether you are planning for drought resilience, calculating for an off-grid property, or simply trying to understand your water bill.",
    ],
    sections: [
      {
        heading: "Daily Usage Tab: Knowing Where Your Water Goes",
        paragraphs: [
          "Enter the number of people in your household, then adjust the daily usage for each category: shower duration and flow rate, toilet flushes per person per day, washing machine cycles per week, garden area and irrigation days, and an allowance for other uses (cooking, handwashing, dishwasher). The calculator totals these to give a daily household consumption in litres and an estimated monthly water cost based on your tariff.",
          "Flow rates matter significantly. A standard shower head flows at 10–15 litres per minute; a low-flow head at 6–8 litres per minute. A 5-minute shower on a standard head uses 50–75 litres; on a low-flow head, 30–40 litres. This single fixture change, multiplied by every shower in the household every day, is often the highest-impact conservation intervention.",
          "Compare the calculator's total to your water bill. If the calculated consumption is substantially lower than your billed consumption, the most likely explanation is a leak. A continuously running toilet wastes 200–400 litres per day invisibly. Verify by reading your water meter before and after a 2-hour period with zero water use — any movement indicates a leak.",
        ],
      },
      {
        heading: "Rainwater Harvesting Tab: Your Collection Potential",
        paragraphs: [
          "Enter your roof catchment area in m², your local annual rainfall in mm, and the collection efficiency of your system. The calculator returns monthly and annual collection volumes in litres.",
          "Roof area for harvesting purposes is the plan area (footprint) of the roof, not the actual roof surface. A house with a 10m × 8m footprint has 80m² of catchment regardless of the roof pitch. The collection efficiency of 0.80 (default) accounts for evaporation from the roof surface, first-flush losses, and system inefficiencies. In practice, a well-maintained system with a first-flush diverter achieves 78–85% efficiency.",
          "Local monthly rainfall data transforms this tab from an annual average into a seasonal planning tool. In climates with distinct wet and dry seasons, knowing that 70% of annual rain falls in 4 months tells you exactly how large a tank you need to bridge the dry season. Enter your monthly rainfall figures separately to see month-by-month collection estimates and identify the driest period your storage must cover.",
        ],
      },
      {
        heading: "Tank Sizing Tab: Storage Duration and Independence",
        paragraphs: [
          "Enter your tank capacity in litres and your daily household consumption. The calculator shows how many days the tank will sustain your household at that consumption rate — your 'days of independence' from external supply.",
          "For urban households wanting resilience against supply interruptions: 3–7 days of storage (1,500–4,000 litres for a typical family) provides reasonable buffer against short outages. For off-grid or drought-resilient setups: size for your longest expected dry period between rain events, typically 30–90 days depending on climate, requiring 15,000–50,000 litres or more.",
          "Tank sizing must be combined with the harvesting tab. If your roof harvests 4,000 litres per month and your household uses 6,000 litres per month, you have a 2,000-litre monthly deficit regardless of tank size — you will always need to supplement with municipal supply or reduce consumption. Tank sizing solves the timing mismatch between when rain falls and when you need water; it does not solve a supply deficit.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I find my household's average daily water consumption?",
        a: "Check your water bill for the monthly consumption in kilolitres or cubic metres (1 kL = 1,000 litres). Divide by the number of days in the billing period to get daily usage, then divide by the number of people for per-capita usage. Alternatively, use the Daily Usage tab with your actual habits to estimate from first principles and compare the two figures.",
      },
      {
        q: "What is a first-flush diverter and does my rainwater system need one?",
        a: "A first-flush diverter discards the first portion of runoff from each rain event, which carries the dust, bird droppings, and debris accumulated on the roof since the last rain. For non-potable uses (garden, toilet flushing) it is optional but improves water quality. For potable rainwater systems, it is essential and is required by most health regulations. The rule of thumb is to divert 1 litre per 25m² of roof.",
      },
      {
        q: "How much water does a garden irrigation system use?",
        a: "A garden drip system uses approximately 2–4 litres per m² per watering session for established plants. Lawn sprinklers use 10–15 litres per m² per session. A 100m² lawn watered three times per week uses 3,000–4,500 litres per week — often more than the entire indoor consumption of the household. Switching to drought-tolerant plants and drip irrigation typically reduces garden water use by 50–70%.",
      },
      {
        q: "Can I use rainwater for drinking?",
        a: "Rainwater from clean roofs can be made potable with appropriate treatment: a first-flush diverter, particle filtration (at least 1 micron), and UV sterilisation or chlorination. Roofs with lead flashing, painted with lead paint, or with asphalt shingles may contaminate the water and require more extensive treatment. Regulations vary; some jurisdictions prohibit rainwater as a primary drinking water source. Always check local health and building codes.",
      },
      {
        q: "What tank material is best for water storage?",
        a: "Polyethylene (HDPE) tanks are the most common for residential use: lightweight, corrosion-resistant, and food-grade options are available. They must be opaque (black or dark-coloured) to prevent algae growth. For underground tanks, reinforced concrete or fibreglass/GRP is standard. Steel tanks lined with food-grade coating are used for larger capacities. Avoid galvanised steel in contact with drinking water due to zinc leaching.",
      },
      {
        q: "How do I know if I have a water leak?",
        a: "Read your water meter and then avoid using any water for 1–2 hours (including not flushing toilets). Read the meter again. Any movement indicates a continuous flow somewhere — almost certainly a leak. A dripping tap loses 20–150 litres per day; a running toilet 200–400 litres per day; a pressurised pipe leak underground can waste thousands of litres per day. The most common invisible leaks are in toilet cisterns — check by adding food colouring to the cistern and watching if it appears in the bowl without flushing.",
      },
      {
        q: "How much water can I realistically collect from my roof each year?",
        a: "Annual collection (litres) = roof area (m²) × annual rainfall (mm) × collection efficiency (0.80). A 120m² roof in an area with 600mm of annual rainfall at 80% efficiency: 120 × 600 × 0.80 = 57,600 litres per year — about 4,800 litres per month. Whether this is sufficient depends on your monthly consumption from the Daily Usage tab.",
      },
      {
        q: "What is the minimum tank size for a family of four?",
        a: "For 7-day backup at typical consumption of 150 litres per person per day: 4 people × 150 L × 7 days = 4,200 litres minimum. A 5,000-litre tank provides a comfortable buffer. For 30-day independence: 4 × 150 × 30 = 18,000 litres, requiring two to three standard 5,000–10,000-litre tanks. For primary supply rather than backup, size based on the dry period between rainfall events in your area.",
      },
    ],
  },

  construction: {
    title: "Construction Calculator: Complete Guide",
    intro: [
      "The TrufflShuffl Construction Calculator covers four of the most frequently needed materials estimation tasks on a building project: concrete volume, brick count, excavation volume, and rebar weight. Getting these quantities right before you order saves money, prevents site delays, and gives you an accurate basis for comparing contractor quotes. Ordering 10% short means an emergency purchase at retail prices; ordering 20% too much means disposal costs and wasted budget.",
      "This guide explains what each tab calculates, which inputs matter most, and where estimators commonly make mistakes. The formulas used align with standard quantity surveying practice and are applicable in any country regardless of units — the calculator handles both metric and imperial inputs.",
    ],
    sections: [
      {
        heading: "Concrete Tab: Volumes, Mix Ratios, and Wastage",
        paragraphs: [
          "Enter the pour dimensions: length, width, and depth. For slabs, this is straightforward. For footings, enter the cross-section width and depth and use the footing length as the 'length' input. For columns, enter the column cross-section dimensions and height, then multiply by the number of columns in the quantity field.",
          "The volume result is the theoretical net volume. Always add a wastage allowance before ordering: 10% is standard for most residential pours. Pour into the wastage field or simply multiply the volume by 1.10. Wastage accounts for spillage, formwork variations, uneven sub-base, and the fact that ready-mix trucks cannot deliver the exact volume — they round to the nearest 0.5m³.",
          "The mix tab shows quantities of cement, sand, and aggregate for a site-mixed approach. A 1:2:3 mix (1 part cement, 2 parts sand, 3 parts aggregate by volume) produces general-purpose concrete at approximately C20 strength — suitable for residential floor slabs, pathways, and non-structural elements. For driveways use a richer 1:1.5:3 mix (C25). For structural elements like beams, columns, and suspended slabs, always use an engineer-specified mix with a minimum C25 strength and have it supplied by a ready-mix plant.",
        ],
      },
      {
        heading: "Bricks Tab: Wall Areas, Openings, and Brick Rates",
        paragraphs: [
          "Enter the wall length and height to get the gross wall area, then subtract each door and window opening by entering their dimensions. The net brick area is the wall area minus all openings. Select the brick size and mortar joint width — the calculator applies the correct bricks-per-m² rate for that combination.",
          "Standard metric brick (230 × 110 × 76mm) with 10mm joints gives 50 bricks per m² for a single-leaf (half-brick) wall. A double-leaf (full-brick) wall doubles this. Non-standard bricks (maxi, imperial, jumbo) have different courses-per-metre and therefore different per-m² rates — always confirm with your brick supplier before calculating.",
          "Wastage for brickwork: 5% for straightforward walls with few openings. 7–10% for walls with multiple openings, corners, and cut bricks at the edges. 12–15% for decorative bond patterns (herringbone, diagonal, soldier course) that require more cutting. Round up to the nearest full-pallet quantity when ordering — bricks returned from site in good condition can usually be credited, while a short delivery causes work stoppages.",
        ],
      },
      {
        heading: "Excavation Tab: Volumes, Swell, and Truck Loads",
        paragraphs: [
          "Enter the excavation plan dimensions and depth. The calculator returns the in-situ volume (the volume of earth to be removed from the ground) and the bulked (expanded) volume after removal. Enter your soil type to apply the correct swell factor: clay 25–30%, sand 10–15%, mixed/loam 15–20%, soft rock 30–40%, hard rock 40–60%.",
          "The bulked volume is what goes into the trucks — this is the critical figure for transport planning, not the in-situ volume. If you order truck disposals based on in-situ volume and your soil has a 25% swell, you will need 25% more truck trips than planned and incur proportionally higher disposal costs.",
          "The truck load count assumes a standard-capacity tipper truck. Enter the actual capacity of the trucks being used (typically 5–10m³ for a small tipper, 10–16m³ for a medium rigid, and larger for multi-axle trucks) to get a realistic truck count. Add 10% to the truck count for delays, breakdowns, and site access limitations.",
        ],
      },
      {
        heading: "Rebar Tab: Diameter, Length, and Weight",
        paragraphs: [
          "Enter the bar diameter in millimetres, total length in metres, and quantity. The calculator uses the standard formula: weight (kg) = (diameter²/162) × length. For multiple bar sizes, add each as a separate entry and the calculator totals the weight. Rebar is ordered and priced by weight (kg or tonnes), so the total weight is the ordering quantity.",
          "Add a wastage allowance of 10% to the calculated weight for laps, hooks, bends, and cutting offcuts. For complex reinforcement cages with many short bars and tight bends, increase the wastage to 12–15%. The total weight including wastage is what you order.",
          "Bar mark schedules from structural drawings list each bar with its mark number, diameter, shape code, total length per bar, and quantity. Enter each mark separately into the calculator and sum the weights. This is the professional quantity surveying approach and ensures nothing is missed from the schedule.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I calculate concrete for a slab with a step-down?",
        a: "Calculate each section separately as if it were a separate slab, then add the volumes. If the slab has a 100mm thick main area and a 300mm thick thickened edge beam, calculate the main area volume and the edge beam volume as a strip footing, then sum them. Add 10% wastage to the total.",
      },
      {
        q: "What does '50 bricks per m²' mean for a double-skin wall?",
        a: "50 bricks per m² applies to a single-skin (single-leaf, 110mm thick) wall. For a double-skin (full-brick, 220mm + mortar) wall you effectively have two single-leaf walls built side by side, so use 100 bricks per m² of wall face. For a cavity wall (two single skins with an air gap), calculate each skin separately at 50 bricks per m².",
      },
      {
        q: "What is the difference between in-situ and bulked volume for excavation?",
        a: "In-situ volume is the volume of earth as it sits in the ground, undisturbed. Bulked volume is the volume of that same soil once it has been excavated and loaded onto a truck — soil loosens when disturbed, occupying 10–60% more volume depending on soil type. In-situ volume tells you how big the hole is; bulked volume tells you how many truck loads to order.",
      },
      {
        q: "How do I calculate the number of cement bags needed for a concrete pour?",
        a: "For a standard 1:2:3 mix (one part cement, two parts sand, three parts aggregate by volume): approximately 8 x 50kg bags of cement per cubic metre of concrete. For a richer 1:1.5:3 mix: approximately 9–10 bags per m³. For 5m³ of 1:2:3 concrete: 5 × 8 = 40 bags of cement, plus approximately 0.55m³ of sand and 0.85m³ of aggregate per m³.",
      },
      {
        q: "What is the formula for rebar weight?",
        a: "Weight (kg) = diameter² ÷ 162 × length (m). For a 12mm diameter bar, 1 metre weighs 12² ÷ 162 = 144 ÷ 162 = 0.889 kg/m. For 100 metres of 12mm bar: 88.9 kg. Common weights: 6mm = 0.222 kg/m, 8mm = 0.395 kg/m, 10mm = 0.617 kg/m, 12mm = 0.888 kg/m, 16mm = 1.579 kg/m, 20mm = 2.469 kg/m.",
      },
      {
        q: "Do I need an engineer for residential construction calculations?",
        a: "For all structural elements — foundations, load-bearing walls, beams, suspended slabs, columns, and retaining walls over 600mm high — an engineer's design is required by building regulations in most countries. The Construction Calculator gives you material quantity estimates, not structural designs. Always work from an engineer's drawings for anything that bears load or affects building safety.",
      },
      {
        q: "What swell factor should I use for Cape soil or black clay?",
        a: "Expansive clays (black cotton soil, Uitenhage clay, Cape clay) have high swell factors in the 25–35% range. For planning purposes, use 30% for any dark clay soil. These soils also present significant structural risk due to volume change with moisture — excavations in expansive clay should be supervised by a geotechnical engineer to determine appropriate foundation design.",
      },
      {
        q: "How much mortar do I need for brickwork?",
        a: "A standard rule of thumb: approximately 55 litres of mortar per square metre of single-skin brickwork. For a 1:3 cement:sand mortar mix, that is approximately 15 litres of cement and 45 litres of sand per m². For 1,000 bricks in a standard wall, you need roughly 0.35m³ of mortar. Add 10–15% for waste and waste from the joint tooling.",
      },
    ],
  },

  fitness: {
    title: "Fitness Calculator: Complete Guide",
    intro: [
      "The TrufflShuffl Fitness Calculator covers four tools that serious athletes and casual exercisers alike find invaluable: running pace conversion and race time prediction, cycling calorie estimation, heart rate training zone calculation, and one-repetition maximum (1RM) estimation for strength training. Each tab takes a different approach to quantifying your fitness performance and gives you numbers you can act on directly in your training.",
      "This guide explains what each tab calculates, how to interpret the output, and how to apply the results to build more effective training plans. Whether you are targeting a marathon finish time, trying to understand your energy expenditure on the bike, or programming a strength training cycle, the numbers this calculator provides are the foundation of evidence-based training.",
    ],
    sections: [
      {
        heading: "Running Pace Tab: Speed, Splits, and Race Predictions",
        paragraphs: [
          "Enter a known performance — either a distance and a time, or a pace directly — and the calculator converts between pace formats (min/km and min/mile) and projects finish times across common race distances: 5km, 10km, half marathon (21.1km), and full marathon (42.2km). The race time projections use the Riegel fatigue formula, which accounts for the fact that you slow down proportionally more over longer distances.",
          "The Riegel formula: T2 = T1 × (D2/D1)^1.06, where T1 is your known time for distance D1, and T2 is the projected time for distance D2. The exponent 1.06 captures the typical rate of fatigue increase with distance. If you run 5km in 25 minutes, the formula projects your 10km at approximately 51:45 (not 50:00), your half marathon at 1:55:00, and your full marathon at 4:00:00. Use these as planning targets, not guarantees — individual aerobic efficiency varies.",
          "The required pace tab works in reverse: enter your goal finish time for a race distance and the calculator tells you what pace per kilometre you must sustain. Use this to set your GPS watch target pace for training runs and on race day. A common race strategy is to target a pace 5–10 seconds per km slower than your theoretical maximum in the first half, then accelerate if you feel strong.",
        ],
      },
      {
        heading: "Cycling Calories Tab: Energy Expenditure on the Bike",
        paragraphs: [
          "Enter your body weight, the duration of your ride, and the intensity level. The calculator uses the MET (Metabolic Equivalent of Task) method: calories = MET × weight (kg) × hours. MET values for cycling range from 4.0 (very light, <16 km/h) through to 16.0 (racing intensity, >32 km/h). The intensity selector applies the appropriate MET for each effort level.",
          "For cyclists with power meters, the kilocalorie estimate is more precise: 1 kilojoule of mechanical work requires approximately 4 kcal of metabolic energy (assuming 25% mechanical efficiency, typical for a trained cyclist). One hour at 200W = 200 × 3,600 ÷ 1,000 = 720 kJ ≈ 720 kcal. Enter your average power and duration for this method.",
          "Calorie estimates have significant individual variation — two riders of the same weight at the same speed can burn 15–20% different amounts of energy depending on fitness level, pedaling efficiency, and bike/rider aerodynamics. Use the estimates for fuelling planning and relative comparison between workouts, not as precise measurements.",
        ],
      },
      {
        heading: "Heart Rate Zones Tab: Training the Right System",
        paragraphs: [
          "Enter your age (for the 220-minus-age maximum heart rate estimate) and optionally your resting heart rate (for a more accurate Karvonen zone calculation). The calculator returns the five training zones in BPM and as percentages of maximum heart rate.",
          "The 220-minus-age formula has significant individual variation: actual maximum heart rate can be 10–20 BPM above or below the estimate. For more accurate zones, perform a maximum heart rate test: after a proper warm-up, run or cycle at maximum effort for 2–3 minutes. The highest reading in the final 30 seconds approximates your true maximum.",
          "Zone 2 (60–70% max HR) is the most important zone for building endurance base: this is the intensity at which fat oxidation is maximised and mitochondrial density increases most efficiently. Most recreational athletes spend too much time in Zone 3 (the 'grey zone' — too hard to be truly aerobic, not hard enough for performance benefits). Use your heart rate zones to ensure your easy days are genuinely easy.",
        ],
      },
      {
        heading: "One-Rep Max Tab: Estimating Your Strength Ceiling",
        paragraphs: [
          "Enter the weight lifted and the number of clean repetitions performed (to the point where another rep would fail). The calculator applies the Epley formula: estimated 1RM = weight × (1 + reps/30). It also shows standard training load percentages: the weight you should use for strength work (80–90% 1RM), hypertrophy (65–80%), and endurance (below 65%).",
          "The formula is most accurate for rep ranges of 3–10. Above 10 reps, the estimate becomes less reliable because the limiting factor shifts more to muscular endurance than absolute strength. If you do a set of 15 reps, the estimated 1RM will typically be an overestimate. For best results, test with a weight you can lift for 3–6 repetitions.",
          "Recalculate your 1RM estimate every 4–6 weeks as your strength improves, or after completing a training programme block. As the weight increases on your working sets, update the percentage-based prescription accordingly. Stale 1RM estimates lead to training at the wrong intensity — either too light to drive adaptation, or too heavy to complete the planned volume safely.",
        ],
      },
    ],
    faqs: [
      {
        q: "What pace do I need to run a sub-2-hour half marathon?",
        a: "A sub-2:00 half marathon requires completing 21.1km in under 120 minutes: 120 ÷ 21.1 = 5:41 per km (or 9:09 per mile). The Running Pace tab calculates this instantly from your target time. In practice, accounting for the first-kilometre warm-up and the fatigue curve, target 5:35–5:38 per km in training runs to have a buffer on race day.",
      },
      {
        q: "How do I use heart rate zones to structure a week of training?",
        a: "A polarised training model (proven effective for endurance athletes) allocates roughly 80% of weekly training volume in Zone 1–2 (easy aerobic) and 20% in Zone 4–5 (high intensity). The 'grey zone' (Zone 3) is used sparingly. Practically: 3–4 easy runs or rides per week in Zone 2, one tempo session in Zone 4, one interval session touching Zone 5, and one long easy effort in Zone 1–2.",
      },
      {
        q: "Is it safe to estimate my 1RM without actually attempting a maximum lift?",
        a: "Yes — the submaximal rep estimation method used here is the standard approach for most athletes. Attempting a true 1RM carries significant injury risk without a spotter and thorough warm-up, and is generally only appropriate for competitive powerlifters in a controlled environment. The estimated 1RM from 3–6 rep sets is accurate enough for programming and is far safer.",
      },
      {
        q: "How many calories do I burn cycling 20km?",
        a: "At a moderate recreational pace (20–25 km/h), a 75 kg rider burns approximately 300–400 kcal for 20km (roughly 45–60 minutes). At a brisk training pace (25–30 km/h), the same rider burns 400–500 kcal. Use the Cycling Calories tab with your actual weight, duration, and intensity for a more precise estimate.",
      },
      {
        q: "Why does my running pace projection for a marathon seem slower than expected?",
        a: "The Riegel formula uses an exponent of 1.06, which means pace degrades approximately 3–4% for each doubling of distance in a healthy runner. A 5km pace of 5:00/km projects to a marathon pace of approximately 5:43/km. This is a physiologically normal degradation — marathon performance requires a pacing strategy well below 5km race pace to manage glycogen depletion and thermoregulation over 42km.",
      },
      {
        q: "What is the Karvonen method for heart rate zones?",
        a: "The Karvonen method uses heart rate reserve (HRR) instead of maximum heart rate alone. HRR = max HR − resting HR. Zone percentage = resting HR + (target percentage × HRR). This produces more personalised zones because it accounts for individual cardiovascular fitness (fitter athletes have lower resting HRs). Enter your resting heart rate in the Heart Rate tab to use this method.",
      },
      {
        q: "How often should I update my 1RM estimate?",
        a: "Every 4–6 weeks as part of a training programme cycle. Most strength programmes are structured in 4–6 week blocks with a deload week before a new block starts. At the start of each new block, perform a rep-max test (3–5 reps at near-maximal effort) and recalculate. Alternatively, update whenever your working weights feel substantially easier than when you set the estimate.",
      },
      {
        q: "What if my actual race time is much slower than the calculator predicts?",
        a: "The Riegel formula assumes comparable aerobic conditioning at both distances. If your 5km time is from a flat, well-paced race but your marathon takes place on a hilly course, in heat, or if you went out too fast — your result will be slower than the prediction. The formula also does not account for specific race-distance training: a runner who only trains up to 15km may not achieve the predicted marathon time due to insufficient long-run adaptation.",
      },
    ],
  },

  pets: {
    title: "Pet Calculator: Complete Guide",
    intro: [
      "The TrufflShuffl Pet Calculator helps pet owners with three tasks that come up constantly in everyday animal care: converting your pet's age to a meaningful human-equivalent figure, calculating the correct daily food portion based on the animal's weight and life stage, and determining medication doses by body weight. These are the calculations veterinary nurses perform routinely, and having them at your fingertips reduces the risk of under-feeding, over-feeding, or incorrect dosing.",
      "This guide explains each tab's inputs, the science behind the calculations, and what you should — and should not — do with the results. The medication tab in particular provides reference information; it is not a substitute for veterinary advice, and prescription medications should always be dosed under professional guidance.",
    ],
    sections: [
      {
        heading: "Pet Age Tab: Beyond the 7-Year Myth",
        paragraphs: [
          "Select the species (dog or cat), the size category for dogs (small: under 10kg, medium: 10–25kg, large: 25–45kg, giant: over 45kg), and enter the pet's age in years. The calculator returns the human-equivalent age using a size-adjusted model for dogs and a standard feline aging model for cats.",
          "For dogs, the model used is derived from epigenetic (DNA methylation) research rather than the oversimplified 7× rule. Dogs age very rapidly in their first two years — a 1-year-old dog is biologically equivalent to a human in their late twenties. After year 2, the aging rate slows and diverges significantly by size: a small breed dog at 15 years is roughly equivalent to a 74-year-old human, while a giant breed at the same age may be equivalent to a 93-year-old.",
          "For cats, the standard feline equivalency model applies: a 1-year-old cat is approximately 15 in human years, a 2-year-old is 24, and each additional year adds approximately 4 human years. At 10 years, a cat is in its senior phase (equivalent to about 56 human years); at 15 years, it is a super-senior (approximately 76 human years). These figures explain why senior health checks become increasingly important for cats from 10 years onward.",
        ],
      },
      {
        heading: "Feeding Tab: Getting Portions Right for Your Individual Pet",
        paragraphs: [
          "Enter the pet's current weight, the target weight (for overweight animals, this should be the ideal weight, not the current weight — caloric target is based on ideal body weight to facilitate healthy weight loss), the life stage (puppy/kitten, adult, senior), and the caloric density of the food in kcal per 100g (found on the food packaging).",
          "The calculator uses the Resting Energy Requirement (RER) formula: RER (kcal/day) = 70 × body weight (kg)^0.75, then multiplies by a life-stage activity factor. For adult dogs at rest: 1.6×; for adult dogs with moderate activity: 2.0×; for working dogs: 3.0×. For adult cats: 1.2× (sedentary) to 1.4× (active). Puppies and kittens use higher multipliers of 2.0–3.0× depending on age.",
          "Body condition score (BCS) is the practical feedback tool — compare the calculated ration against what you observe on the animal. If you can easily see the ribs, increase the portion by 10%. If you cannot feel the ribs without pressing firmly, decrease by 10%. Adjust gradually over 2–4 weeks and reassess. Never change portions by more than 10–15% at once as this can cause digestive upset.",
        ],
      },
      {
        heading: "Medication Tab: Weight-Based Dose Reference",
        paragraphs: [
          "Enter the pet's body weight and the dose rate prescribed by the veterinarian or stated on the product label (in mg per kg of body weight). The calculator returns the total dose in mg and, if you enter the product concentration in mg/ml, the volume in ml to administer.",
          "Common over-the-counter dose references included in the calculator (anti-parasitics, some anti-histamines, probiotics) are provided as general reference values. Always verify the dose against the product packaging, and never assume that the same molecule or product name dosed for one species is safe for another. Many dog medications are toxic to cats at any dose; some human medications are acutely toxic to both.",
          "If your pet has been prescribed a compounded liquid medication with an unusual concentration, use the mg/ml field to get the correct volume. Liquid medications for small animals are often concentrated, and even a small dosing error (1ml instead of 0.5ml) can represent a dangerous 100% overdose for a 3–4kg cat. Use a graduated syringe, not a kitchen spoon.",
        ],
      },
      {
        heading: "When to See a Veterinarian",
        paragraphs: [
          "The Pet Calculator is a planning and reference tool, not a diagnostic or clinical resource. Use it to understand your pet's needs and provide accurate information to your veterinarian — weight, typical daily intake, and any medications being given. Never use the calculator to diagnose illness or adjust medications prescribed by your vet.",
          "Weight loss or gain in a pet despite unchanged feeding is always a reason for a veterinary visit: it may indicate metabolic disease (thyroid problems, diabetes), dental pain, parasites, or other underlying conditions that require diagnosis and treatment. The feeding calculator assumes a healthy animal; sick animals have different caloric needs.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why is the '7 dog years per human year' rule wrong?",
        a: "The rule assumes linear aging, but dogs age fastest in their early years and more slowly later. A 1-year-old dog is sexually mature and physically adult — biologically equivalent to a human in their late twenties. The 7× rule would say 7 years, which is clearly wrong. The rate of equivalence also varies significantly by breed size: large breeds age faster than small breeds in later life, which the 7× rule completely ignores.",
      },
      {
        q: "How do I know if my dog or cat is overweight?",
        a: "Use the Body Condition Score (BCS) assessment. At ideal weight: you can feel (but not see) the ribs without pressing; there is a visible waist when viewed from above; there is a slight abdominal tuck when viewed from the side. Overweight: ribs require firm pressure to feel, no visible waist, no abdominal tuck, rounded abdomen. Obese: ribs cannot be felt even with pressure, obvious fat deposits on back and base of tail.",
      },
      {
        q: "How do I calculate the caloric density of my pet's food?",
        a: "It should be printed on the packaging as kcal/kg or kcal per cup/per 100g. If not listed, it can often be found on the manufacturer's website. If you cannot find it, use a typical value: premium dry dog food is approximately 350–400 kcal/100g; standard dry food is 310–360 kcal/100g; wet food is typically 80–120 kcal/100g due to its high moisture content.",
      },
      {
        q: "At what age should I switch from puppy to adult food?",
        a: "Small breeds (under 10kg adult): 9–12 months. Medium breeds (10–25kg): 12 months. Large breeds (25–45kg): 12–18 months. Giant breeds (over 45kg): 18–24 months. Switching too early deprives a growing puppy of nutrients. Staying on puppy food too long for a large breed puppy can provide excess calcium, increasing the risk of developmental orthopaedic disease. Use the Feeding tab with 'puppy' life stage selected until the appropriate switch age.",
      },
      {
        q: "Can I give my cat a medication prescribed for my dog?",
        a: "Never, without explicit veterinary instruction. Cats lack certain liver enzymes that metabolise many compounds, making drugs safe for dogs acutely toxic to cats. Paracetamol (acetaminophen) is lethal to cats; aspirin is toxic at dog doses; many NSAIDs and antiparasitics are dangerous or fatal. Always confirm with your vet before giving any animal a medication not specifically prescribed for that individual animal.",
      },
      {
        q: "How accurate is the feeding calculator for my specific pet?",
        a: "The RER-based calculation is accurate to within ±20% for most healthy animals. Individual variation in metabolic rate, activity level, and body composition means some animals need 20% more and some 20% less than the formula suggests. Treat the result as a starting point and adjust based on your pet's BCS over a 4–6 week period. Animals that gain weight despite the calculated ration have a lower metabolic rate and need less; those that lose weight on the calculated ration need more.",
      },
      {
        q: "Why is my cat's 'human age' so much higher than I expected?",
        a: "Cats reach physiological adulthood (sexually mature, full adult organs) within their first year. A 1-year-old cat is equivalent to a late-teenager or young adult in human development terms, not a 7-year-old (which the 7× rule would suggest). The equivalencies jump quickly in years 1–2 then slow: 1 year ≈ 15 human years, 2 years ≈ 24, each subsequent year ≈ 4 human years.",
      },
      {
        q: "What is the safest way to give liquid medication to a cat?",
        a: "Use a graduated syringe (provided with most liquid medications). Draw up the exact prescribed volume. Hold the cat gently but securely with its body supported. Insert the syringe tip into the corner of the mouth (between the back teeth and cheek). Administer the liquid slowly in small amounts, allowing the cat to swallow between each. Follow immediately with a small amount of food or a treat to ensure the medication is swallowed and does not linger and cause oral irritation.",
      },
    ],
  },

  food: {
    title: "Food & Cooking Calculator: Complete Guide",
    intro: [
      "The TrufflShuffl Food and Cooking Calculator brings precision to four areas of kitchen craft that most cooks handle intuitively but inconsistently: scaling recipes for different serving sizes, dialling in coffee brew ratios, timing meat on the braai or BBQ, and calculating bread dough hydration. For home cooks, these tools replace guesswork with reproducible results. For anyone who cooks for a crowd, a catering event, or a commercial kitchen, they are essential for consistent quality at scale.",
      "This guide explains what each tab calculates, how to enter your inputs accurately, and the principles that make the math work. Understanding the underlying logic helps you know when to apply the calculator directly and when to use your own judgement to adjust the output.",
    ],
    sections: [
      {
        heading: "Recipe Scaling Tab: Adjusting Recipes for Any Yield",
        paragraphs: [
          "Enter the original serving count, the target serving count, and the ingredients with their original quantities and units. The calculator scales all ingredient quantities by the ratio (target ÷ original) and converts units where appropriate. The scaling factor is shown so you can apply it manually to any ingredients not listed.",
          "Most ingredients scale linearly: double the servings, double the meat, vegetables, and liquid. However, three categories require special treatment. Leavening agents (baking powder, baking soda, yeast) should be scaled at 75% of the linear factor when doubling, and at 60–70% when quadrupling — too much leavening produces a metallic taste and a collapsed crumb. Salt can scale linearly but taste and adjust near the end of cooking. Spices and aromatics in large-batch cooking often need only 70–80% of the linear scale because extraction efficiency increases with volume.",
          "Cooking time does not scale with quantity. A doubled batch in the same pan takes longer to cook; the same batch in a wider pan may take less time. The calculator does not adjust cooking times — this requires recipe-specific knowledge and practical experience. The key rule: check for doneness at the original cooking time and extend if needed, rather than automatically doubling the time.",
        ],
      },
      {
        heading: "Coffee Ratio Tab: Precision Brewing",
        paragraphs: [
          "Enter the brew method, the amount of coffee you want to make in ml, and your preferred coffee-to-water ratio. The calculator returns the exact coffee dose in grams. The Specialty Coffee Association (SCA) reference ratio of 60g per litre (1:16.7) is the default, with presets for common methods.",
          "The ratio expresses how many grams of water per gram of coffee: 1:15 means 15g of water for every 1g of coffee (strong), 1:17 means 17g of water per 1g of coffee (lighter). Espresso is an outlier at approximately 1:2 (18g of coffee to 36g of espresso output). The higher the second number, the more water relative to coffee — a more dilute, lighter brew.",
          "Weight-based measurement is significantly more consistent than volume measurement. Coffee grounds vary in density by 10–30% depending on grind size and roast level, so a volumetric tablespoon can deliver very different brew strengths between grind settings. Using a kitchen scale for both coffee and water eliminates this variable. Even a basic 0.1g-resolution kitchen scale costing very little transforms brew consistency.",
        ],
      },
      {
        heading: "Braai/BBQ Tab: Temperature Over Time",
        paragraphs: [
          "Select the meat type and cut, enter the weight, and choose your target doneness. The calculator returns an estimated cooking time for both direct heat (thin cuts: chops, steaks, sausages, burgers) and indirect heat (thick cuts: whole chicken, whole leg of lamb, roasts). Target internal temperatures are shown for each doneness level.",
          "These are estimates based on standard fire temperatures (approximately 180–220°C for direct, 150–180°C for indirect/low-and-slow). Fire temperature, meat starting temperature, and your specific braai/grill design all affect actual cooking time. The only reliable way to achieve target doneness consistently is an instant-read digital thermometer inserted into the thickest part of the meat, away from bone.",
          "Resting is not optional for thick cuts. After removing from heat, tent with foil and rest for 5 minutes (steaks), 10–15 minutes (whole chicken thighs and portions), or 20–30 minutes (whole roasts and legs). During resting, residual heat equalises throughout the meat and juices that migrated to the centre during cooking redistribute — cutting immediately causes significant juice loss.",
        ],
      },
      {
        heading: "Bread Hydration Tab: The Baker's Percentage System",
        paragraphs: [
          "Enter the flour weight in grams and the water weight in grams. The calculator returns the hydration percentage (water ÷ flour × 100) and optionally shows the baker's percentage for other ingredients if you add them. The baker's percentage system expresses all ingredients as a percentage of the flour weight, making recipe comparison and scaling straightforward regardless of batch size.",
          "Hydration ranges and their typical applications: 55–65% (stiff dough): bagels, pretzels, pizza with tight crumb; 65–75% (medium dough): sandwich bread, most sourdoughs, ciabatta; 75–85% (high hydration): open-crumb artisan sourdough, focaccia, wet-style baguettes; 85%+ (very high): requires strong technique, produces extremely open crumb in skilled hands.",
          "Different flours absorb different amounts of water. Whole wheat and rye absorb 5–10% more water than white bread flour at the same hydration because of their fibre content. All-purpose flour absorbs slightly less water than bread flour. If you substitute one flour for another in a recipe, you may need to adjust water to maintain the same dough consistency even if the percentage stays the same on paper.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why can't I just double all ingredients including baking powder?",
        a: "Chemical leavening works by producing gas in proportion to the batter volume, not just the batter mass. When you double a recipe, the volume doesn't exactly double — it depends on pan size and batter depth. Using the full doubled amount of baking powder produces too much gas, which causes the structure to set before it can rise properly, then collapse. Scale leavening at 75% of the linear factor when doubling, and taste for saltiness separately.",
      },
      {
        q: "What is the correct coffee ratio for a French press?",
        a: "The SCA reference is 60g per litre (1:16.7), which works well for French press. Many dedicated French press users prefer a slightly stronger 1:14 to 1:15 ratio (67–71g per litre) because French press immersion extraction is less efficient than pour-over. Enter your target volume and a 1:14 or 1:15 ratio in the Coffee tab to get your dose in grams.",
      },
      {
        q: "What internal temperature should lamb chops reach?",
        a: "For lamb: medium-rare = 57°C (135°F), medium = 63°C (145°F), well done = 71°C (160°F). Lamb at medium-rare to medium is the standard in most culinary traditions (pink inside, with a browned crust). Well-done lamb is very dry and is not recommended. Use an instant-read thermometer inserted horizontally through the side of the chop to measure the thickest point.",
      },
      {
        q: "What hydration percentage should a beginner bread baker start with?",
        a: "65–70% is the recommended starting range. The dough is workable without being too sticky to shape, produces a decent open crumb, and behaves predictably through the bulk fermentation and shaping stages. Once you are comfortable with the shaping technique, increase to 72–75% to develop a more open crumb. High-hydration (75%+) doughs require developed gluten structure and confident handling to avoid sticking and spreading.",
      },
      {
        q: "How do I use the recipe scaling calculator for catering?",
        a: "Enter the recipe's original yield, then enter your target number of servings. The scaling factor (shown in the output) applies to all measured ingredients. For large-scale catering, remember: leavening and spices scale at 70–80% of the factor; cooking times do not scale; pan sizes must be increased proportionally (a recipe scaled 4× requires 4 pans the same size as the original, or 1 pan with 4× the area); cooling and holding requirements change with larger masses.",
      },
      {
        q: "Is it accurate to estimate braai/BBQ cooking times by weight?",
        a: "Thickness is actually more accurate than weight for cooking time estimation. Two chicken breasts weighing the same can cook at different rates if one is butterflied flat and the other is left whole. The calculator uses weight as a proxy because it's easier to measure, but always treat the output as an estimate and verify with a thermometer. For thick pieces, check internal temperature 10 minutes before the estimated time.",
      },
      {
        q: "What does baker's percentage mean?",
        a: "Baker's percentage expresses every ingredient as a percentage of the total flour weight, not the total recipe weight. Flour is always 100%. Water at 70% hydration means 70g of water per 100g of flour. Salt at 2% means 2g of salt per 100g of flour. This system makes it easy to scale any recipe: just change the flour amount and multiply every other ingredient by the same percentage. A recipe with 1kg of flour at 70% hydration uses 700g of water; at 500g of flour it uses 350g of water.",
      },
      {
        q: "Can I use volume measurements instead of grams for the bread hydration calculator?",
        a: "The calculator requires weights because volume measurements for flour are notoriously inaccurate. A cup of flour can range from 120g to 170g depending on whether it was sifted, spooned loosely, or packed. Hydration percentage calculated from volume is meaningless because the baseline (flour weight from a volume measurement) is too variable. Invest in a kitchen scale — it is the single most impactful tool upgrade for baking.",
      },
    ],
  },

  education: {
    title: "Education Calculator: Complete Guide",
    intro: [
      "The TrufflShuffl Education Calculator provides three practical tools for students managing their academic performance: a GPA calculator that works with multiple credit-weighted subjects, a final exam score calculator that tells you exactly what you need on an upcoming exam to hit your overall target, and a study hours planner that allocates your available time across subjects based on their relative weight. Together, these tools replace academic anxiety with a concrete plan.",
      "This guide explains how each tab works, what the inputs mean, and how to interpret and act on the outputs. The tools apply equally to school, college, and university systems — the underlying mathematics is the same regardless of the grading scale or credit system your institution uses.",
    ],
    sections: [
      {
        heading: "GPA Tab: Calculating Your Grade Point Average",
        paragraphs: [
          "Add each subject (course) with its credit weight and grade. Select your institution's grading scale (US 4.0, UK, South African percentage, Australian 7-point, or custom) and the calculator returns the weighted GPA. Credits ensure that a 4-credit course contributes twice as much to the GPA as a 2-credit course.",
          "The formula is: GPA = Σ(grade points × credits) ÷ Σ(credits). If you have an A (4.0) in a 4-credit course and a C (2.0) in a 2-credit course: GPA = (4.0×4 + 2.0×2) ÷ (4+2) = (16+4) ÷ 6 = 3.33. An unweighted average of the two grades would be (4.0+2.0) ÷ 2 = 3.0 — less accurate because it ignores the difference in credit weight.",
          "The 'scenario planning' function lets you add future courses with anticipated grades. This shows you what GPA you will have after the current semester depending on your performance, and how far above or below your target you land. Use this to identify which subjects you need to prioritise to move the needle on your cumulative GPA.",
        ],
      },
      {
        heading: "Final Exam Tab: What Score Do You Need?",
        paragraphs: [
          "Enter your current grade (continuous assessment/coursework average), the weight of that continuous assessment as a percentage, and your target overall grade. The calculator returns the minimum exam score required and tells you if the target is mathematically possible given the maximum exam score of 100%.",
          "The formula: Required exam score = (Target overall − Current grade × CA weight) ÷ Exam weight. Example: you have 62% in coursework (weighted 60%), you need 65% overall, and the exam counts for 40%: required exam = (65 − 62 × 0.60) ÷ 0.40 = (65 − 37.2) ÷ 0.40 = 69.5%. You need approximately 70% on the exam to achieve 65% overall.",
          "When the required score exceeds 100%, your target is mathematically impossible — the calculator flags this clearly so you can adjust your expectations and focus your energy on other subjects. This is not a reason to give up: a lower target may still be achievable, and finishing the exam with a strong performance preserves GPA for future terms.",
        ],
      },
      {
        heading: "Study Hours Tab: Planning Your Time Across Subjects",
        paragraphs: [
          "Enter your total available study hours, the number of subjects, and optionally the relative weight (credit count or exam weight) of each subject. The calculator allocates hours proportionally and produces a daily study schedule based on your target start date and the number of hours per day you can commit.",
          "A standard guideline: for each credit hour of course contact time, plan 2–3 hours of independent study per week. For a 3-credit course meeting 3 hours per week, that is 6–9 additional hours of study per week during semester. For exam preparation in the final 2–3 weeks, add 10–20 hours per major subject on top of the regular study allocation.",
          "Research on learning consistently shows that spaced repetition outperforms massed practice (cramming). Plan study sessions of 45–90 minutes with short breaks, spread across multiple days, rather than marathon sessions. The planner's daily schedule reflects this — it shows you how to distribute time over the available days rather than concentrating everything at the end.",
        ],
      },
      {
        heading: "Recovering From a Bad Result",
        paragraphs: [
          "Use the GPA tab to model the impact of a poor semester. A student with a 3.5 cumulative GPA after 60 credits who earns a 2.5 semester GPA on 15 credits will have a cumulative GPA of: (3.5×60 + 2.5×15) ÷ 75 = (210+37.5) ÷ 75 = 3.3. This models the mathematical reality: early strong performance provides a buffer that partially absorbs a bad semester. As total credits increase, recovering a bad result becomes harder because more credits are needed to shift the average.",
          "Check your institution's grade replacement, grade forgiveness, or retake policies before deciding to repeat a course. Some institutions replace the original grade in GPA calculations; others average all attempts. Some have one-time academic forgiveness provisions. Understanding the policy determines whether retaking a course will improve or have no effect on your calculated GPA.",
        ],
      },
    ],
    faqs: [
      {
        q: "What GPA do I need to keep my scholarship?",
        a: "Most merit scholarships require a minimum cumulative GPA of 3.0 (B average on a 4.0 scale) for renewal, with some requiring 3.3–3.5 for highly competitive awards. Check your scholarship's specific conditions — some also require minimum credits per semester or prohibit taking courses pass/fail. Use the GPA scenario planner to identify the minimum grades needed in each subject to maintain the required average.",
      },
      {
        q: "How do I calculate GPA from percentage marks?",
        a: "Convert each percentage to a grade point using your institution's scale. A common South African university conversion: 75–100% = 7 (excellent), 70–74% = 6 (meritorious), 60–69% = 5 (credit), 50–59% = 4 (adequate), 40–49% = 3 (elementary), 33–39% = 2 (subminimum), below 33% = 1 (fail). The calculator supports custom scales if your institution uses different cut-offs.",
      },
      {
        q: "What if my required exam score is above 100%?",
        a: "Your target overall grade is mathematically impossible given your current coursework mark. The best response is to set a more realistic target using the same calculator — find the highest achievable overall mark (when exam score = 100%). Then focus on achieving the highest possible exam performance rather than the original target. Exam performance also demonstrates academic capability independent of the final grade.",
      },
      {
        q: "How many study hours per day is productive?",
        a: "Research on deliberate practice and cognitive load suggests a ceiling of 4–6 hours of high-quality, focused study per day beyond which retention and concentration decline. Beyond this, additional study hours produce diminishing returns. Quality matters more than quantity: studying with full attention and active retrieval for 4 hours outperforms passive re-reading for 8 hours. The Study Hours planner allocates realistic daily hours within this range.",
      },
      {
        q: "Should I allocate more study time to my weakest subjects?",
        a: "Allocate time proportionally to both subject credit weight and your current performance gap. A heavily weighted subject where you are close to passing deserves priority over a lightly weighted subject where you are comfortably passing. The study planner allows you to weight subjects — use a combination of credit weight and your perceived difficulty gap for each course.",
      },
      {
        q: "What is the difference between semester GPA and cumulative GPA?",
        a: "Semester GPA covers only the courses taken in one term. Cumulative GPA (CGPA) averages all courses across all completed semesters, weighted by credits. A weak semester GPA has a larger proportional impact when your total credit count is low. As total credits accumulate, a single semester's impact on the cumulative average diminishes. Graduate schools and employers typically request cumulative GPA.",
      },
      {
        q: "How much does one failed subject affect my GPA?",
        a: "It depends on the credit weight of the subject and your total credits. On a 4.0 scale, failing (0.0) a 4-credit course in a 60-credit cumulative GPA of 3.5 changes the cumulative GPA to: (3.5×60 + 0.0×4) ÷ 64 = 210 ÷ 64 = 3.28. The impact is larger if the failed subject carries more credits or if your total credit count is lower. Use the GPA tab to model the exact impact of a fail in any scenario.",
      },
      {
        q: "Is there a minimum study time that guarantees passing?",
        a: "No — there is no universal minimum, and the relationship between study hours and marks is nonlinear. Factors that matter more than hours: quality of study (active retrieval vs passive reading), prior knowledge of the subject, clarity of the material, exam technique, and performance under exam conditions. The Study Hours planner helps you ensure sufficient time allocation across subjects; what you do with that time determines the outcome.",
      },
    ],
  },

  engineering: {
    title: "Engineering Calculator: Complete Guide",
    intro: [
      "The TrufflShuffl Engineering Calculator covers three fundamental electrical and mechanical calculations: Ohm's Law (the relationship between voltage, current, resistance, and power), cable voltage drop (with reference to standard wiring codes), and torque from force and lever arm. These are the calculations that electricians, engineers, technicians, and makers perform constantly — and getting them right is the difference between a system that works safely and one that trips, overheats, or fails mechanically.",
      "This guide explains every input on each tab, the formulas used, and how to interpret and apply the results. The voltage drop calculator is particularly noteworthy: it cross-references standard wiring codes (including SANS 10142 for South Africa, and IEC 60364 for international use) and tells you whether your cable selection is within the permitted limits.",
    ],
    sections: [
      {
        heading: "Ohm's Law Tab: The Foundation of Circuit Analysis",
        paragraphs: [
          "Select the unknown quantity (voltage V, current I, resistance R, or power P), then enter the two known values. The calculator solves for all four quantities simultaneously. This is useful for component selection, circuit troubleshooting, and understanding the relationship between any two electrical parameters.",
          "The core relationships: V = I × R (voltage equals current times resistance). P = V × I = I² × R = V² ÷ R (power in watts is the product of voltage and current). From any two known values, all four can be derived. Common uses: selecting a resistor to limit current to a specific value (R = V ÷ I), calculating the power dissipated in a resistor (P = I² × R), or checking whether a wire's resistance will cause a significant voltage drop (V_drop = I × R_wire).",
          "The tab assumes DC or single-phase AC with a resistive load. For AC circuits with inductive or capacitive loads (motors, transformers, capacitor banks), impedance (Z) replaces resistance in the formula. Impedance is the vector sum of resistance and reactance; for simple resistive loads at mains frequency, R and Z are approximately equal.",
        ],
      },
      {
        heading: "Voltage Drop Tab: Ensuring Compliance and Safety",
        paragraphs: [
          "Enter the supply voltage, circuit current (load amps), cable conductor cross-sectional area (mm²), conductor material (copper or aluminium), single cable length in metres, and circuit type (single-phase or three-phase). The calculator returns the voltage drop in volts and as a percentage of supply voltage, and indicates whether the result complies with the applicable standard.",
          "Most electrical codes specify a maximum voltage drop of 3% for lighting circuits and 5% for power circuits, measured from the distribution board (consumer unit) to the load. For a 230V supply: 3% = 6.9V, 5% = 11.5V. The voltage drop calculator cross-references these limits against your inputs and flags any non-compliant cable selection.",
          "The formula: Voltage drop (V) = 2 × I × L × ρ ÷ A, where I is current (A), L is cable length (m), ρ is resistivity (copper: 0.0171 Ω·mm²/m, aluminium: 0.0282 Ω·mm²/m), and A is conductor cross-sectional area (mm²). The factor of 2 accounts for both the outgoing and return conductors in a single-phase circuit. For three-phase balanced circuits, the factor is √3 ≈ 1.732.",
          "If the result exceeds the code limit, the calculator suggests the minimum conductor size required to comply. This is particularly important for long cable runs: a 30-metre run in a workshop at 15A on a 2.5mm² conductor may exceed the 3% limit, requiring an upgrade to 4mm² or 6mm² for compliance.",
        ],
      },
      {
        heading: "Torque Tab: Force, Lever Arm, and Tightening Specifications",
        paragraphs: [
          "Enter the force applied (in Newtons) and the lever arm length (in metres — the perpendicular distance from the pivot point to the line of force). The calculator returns torque in Newton-metres (Nm) and the equivalent in kilogram-metres (kg·m) and foot-pounds (ft·lb) for reference.",
          "Torque is used in two main contexts for engineering calculations: determining the tightening torque for bolts and fasteners (to achieve the correct clamping force without yielding the bolt), and calculating the rotational force produced or required by motors, gearboxes, and levers. The calculator addresses the first context directly; motor torque calculations require additional input (speed, power).",
          "For bolted joints, the relationship between torque and clamping force is: T = K × d × F, where K is the nut factor (approximately 0.15–0.20 for clean, dry steel; 0.12–0.15 for lubricated), d is bolt nominal diameter (m), and F is the desired clamping force (N). The torque tab can be used in reverse: enter a torque specification and a bolt diameter, and solve for the implied clamping force.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I use Ohm's Law to select a resistor?",
        a: "Identify the supply voltage (V), the desired current through the resistor (I), and calculate R = V ÷ I. Then calculate the power dissipation: P = I² × R, and select a resistor rated for at least twice the calculated power to ensure a safety margin. Example: limiting LED current to 20mA from a 12V supply with a 2V LED: R = (12−2) ÷ 0.02 = 500Ω; select the nearest standard value (470Ω or 510Ω); power = 0.02² × 500 = 0.2W; use a 0.5W resistor.",
      },
      {
        q: "What cable size do I need for a 20A circuit over 25 metres?",
        a: "For a 230V single-phase circuit at 20A over 25m, the voltage drop on 2.5mm² copper is: 2 × 20 × 25 × 0.0171 ÷ 2.5 = 6.84V = 2.97% of 230V. This is just within the 3% limit for lighting but tight for a power circuit (5% limit gives more headroom). For comfortable compliance, use 4mm²: drop = 2 × 20 × 25 × 0.0171 ÷ 4 = 4.28V = 1.86%.",
      },
      {
        q: "What is the difference between voltage drop and power loss?",
        a: "Voltage drop (in volts) is the reduction in voltage from source to load due to cable resistance. Power loss (in watts) is the energy dissipated as heat in the cable: P_loss = I² × R_cable. A cable carrying 20A with 0.5Ω total resistance (both conductors) has a voltage drop of 20 × 0.5 = 10V and a power loss of 20² × 0.5 = 200W — heat generated in the cable that is pure energy waste.",
      },
      {
        q: "Why does the voltage drop formula multiply by 2?",
        a: "Current flows through the live conductor to the load and returns through the neutral conductor. Both conductors have resistance and contribute to the total voltage drop. For a single cable of length L, the total conductor length in the circuit is 2L. For three-phase balanced circuits, the return path is shared among phases (vector addition) so the factor becomes √3 rather than 2.",
      },
      {
        q: "What is the SANS 10142 voltage drop limit?",
        a: "SANS 10142-1 (South African National Standard for electrical installations) specifies a maximum voltage drop of 3% from the main distribution board to the final circuit for lighting, and 5% for other final circuits (power outlets, appliances). These are measured under full load conditions. The calculator applies these limits when South Africa is selected as the jurisdiction.",
      },
      {
        q: "How do I convert between torque units?",
        a: "1 Nm = 0.1020 kg·m = 0.7376 ft·lb = 8.851 in·lb. The Torque tab shows the result in all three major units simultaneously. Torque specifications on fasteners in automotive and industrial applications are usually in Nm (European/metric) or ft·lb (US). Workshop manuals for imported equipment may use either; always convert before applying a torque wrench.",
      },
      {
        q: "Does aluminium cable require a larger size than copper for the same current?",
        a: "Yes. Aluminium has approximately 61% of copper's electrical conductivity, meaning an aluminium conductor must have approximately 1.6× the cross-sectional area of copper to carry the same current with the same voltage drop. A 16mm² aluminium conductor is roughly equivalent to a 10mm² copper conductor. Aluminium is also lighter and cheaper per metre, which is why it is used for large service entrance cables where weight and cost per metre are significant.",
      },
      {
        q: "What happens if voltage drop exceeds the permitted limit?",
        a: "Excessive voltage drop causes connected equipment to operate below its rated voltage: motors run hotter and may trip on thermal overload; LED drivers may flicker or operate outside their tolerance; sensitive electronics may malfunction or be damaged. Long-term operation under low voltage reduces equipment lifespan. Beyond the practical effects, exceeding code limits makes the installation non-compliant and may affect insurance cover and legal liability in the event of a fault.",
      },
    ],
  },

  environment: {
    title: "Environmental Calculator: Complete Guide",
    intro: [
      "The TrufflShuffl Environmental Calculator makes your personal environmental impact tangible through three interconnected tools: a carbon footprint calculator that quantifies your greenhouse gas emissions from daily life, a tree offset calculator that shows how many trees you would need to plant to neutralise a given amount of CO₂, and a water footprint calculator that reveals the embedded water in your diet and lifestyle choices. These numbers transform abstract environmental concepts into a personal starting point for action.",
      "This guide explains how each tab works, what the emission factors and footprint data behind the calculations are based on, and how to interpret and act on the results. The calculator is designed for awareness and planning — not guilt. The most useful outcome is identifying the one or two changes in your life that have the biggest impact.",
    ],
    sections: [
      {
        heading: "Carbon Footprint Tab: Measuring Your Climate Impact",
        paragraphs: [
          "Enter your annual data for each category: vehicle kilometres driven (and fuel type), domestic and international flights (as return trip equivalents), home electricity consumption (kWh/month), home heating fuel type and consumption, diet type, and an estimate for goods and services consumption. The calculator applies standard emission factors to each category and returns your total annual footprint in tonnes of CO₂ equivalent (tCO₂e).",
          "Emission factors come from internationally recognised sources (IPCC, DEFRA, EPA). They vary by country for grid electricity (a country running on renewables has a much lower emission factor per kWh than one relying on coal), but use global averages where country-specific data is not entered. The most significant factors: one passenger kilometre of economy class air travel ≈ 0.15–0.25 kgCO₂e; one km driven in a typical petrol car ≈ 0.12–0.18 kgCO₂e; one kWh of electricity varies from near-zero (Iceland) to over 1 kgCO₂e (coal-heavy grids).",
          "Diet is a major and often underestimated contributor. A meat-heavy diet (red meat daily) has a carbon footprint of approximately 3.3 tCO₂e per year from food alone; a vegetarian diet drops to around 1.7 tCO₂e; a vegan diet to 1.5 tCO₂e. The difference between a meat-heavy and plant-based diet is roughly equivalent to driving an average car for 5,000–6,000 km per year.",
        ],
      },
      {
        heading: "Tree Offset Tab: What a Tree Actually Absorbs",
        paragraphs: [
          "Enter the amount of CO₂ to offset in tonnes, the tree species type (tropical fast-growing, temperate, or mixed), and the time horizon in years. The calculator returns the number of trees needed to sequester that CO₂ over the specified period.",
          "The average sequestration rate used: fast-growing tropical species ≈ 20 kg CO₂/tree/year, mixed plantation ≈ 12 kg CO₂/tree/year, temperate species ≈ 8 kg CO₂/tree/year. These are growing-tree averages; very young trees sequester less, mature trees sequester more, and old-growth trees eventually plateau. For a 10-year offset horizon at 12 kg/year/tree: 1 tonne of CO₂ requires 1,000 ÷ 12 ÷ 10 = approximately 8 trees.",
          "The critical caveat: tree offsets are long-term by nature. Planting 8 trees today does not offset 1 tonne of CO₂ today — it offsets that tonne over 10 years of growth. If you need to offset an emission that is happening now, the trees planted must survive and grow for the full period. Tree mortality from drought, fire, disease, or land-use change returns the carbon to the atmosphere. Quality offset programmes account for this with buffer stocks of extra trees.",
        ],
      },
      {
        heading: "Water Footprint Tab: The Water Behind Your Lifestyle",
        paragraphs: [
          "Enter your dietary habits (servings per week of beef, pork, chicken, fish, dairy, and plant-based foods), clothing purchases per year, and other consumption. The calculator returns your annual water footprint in cubic metres, broken down by category.",
          "Food dominates the water footprint for most people, accounting for 70–80% of total consumption. The water intensity of common foods (litres per kg): beef ≈ 15,400, chocolate ≈ 17,000, pork ≈ 6,000, chicken ≈ 4,300, cheese ≈ 3,200, eggs ≈ 3,300, rice ≈ 2,500, wheat ≈ 1,800, vegetables ≈ 300–400, citrus fruit ≈ 600. These figures include all water used in the supply chain — crop irrigation, animal drinking water, processing, and waste treatment.",
          "Clothing has a surprisingly large water footprint. A single cotton t-shirt requires approximately 2,700 litres of water to produce (primarily for growing the cotton). A pair of jeans requires approximately 10,000 litres. Buying second-hand clothing eliminates the water cost of production for new items and is one of the highest-impact fashion choices for water footprint reduction.",
        ],
      },
      {
        heading: "Using the Results to Identify Priorities",
        paragraphs: [
          "After running all three calculators, the pattern that usually emerges is that 3–4 activities account for 60–70% of your total environmental impact. Focus first on the highest-impact categories. For most people in high-income countries: reducing long-haul flights (1.5–2.5 tCO₂e per avoided return long-haul trip), switching to low-emission transport (electric vehicle or car-free), and reducing red meat consumption (0.5–1.5 tCO₂e/year savings) are the three highest-leverage changes available.",
          "The tree offset calculator is most useful for understanding the scale of natural sequestration — how many trees it takes to absorb various amounts of CO₂ — rather than as a primary strategy for reducing your footprint. One long-haul flight round-trip emits approximately 1.5–2 tCO₂e, which would require 125–160 trees to offset over 10 years. Growing those trees takes space, water, and maintenance. Not taking the flight is simpler and more certain.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is a tonne of CO₂ equivalent?",
        a: "CO₂ equivalent (CO₂e) converts all greenhouse gases to a common scale based on their global warming potential over 100 years. 1 kg of methane (CH₄) = 28–34 kg CO₂e; 1 kg of nitrous oxide (N₂O) = 265 kg CO₂e. One tonne of CO₂e represents the warming equivalent of one tonne of CO₂ — a useful standard unit for comparing sources and mitigation actions across different gas types.",
      },
      {
        q: "What is the average global personal carbon footprint?",
        a: "Approximately 4–5 tCO₂e per person per year globally, but this masks enormous variation. The United States averages approximately 15 tCO₂e per person; the EU average is approximately 7–8 tCO₂e; India averages approximately 1.9 tCO₂e. To limit global warming to 1.5°C, the world needs to reach approximately 2 tCO₂e per person by 2050 — a reduction of over 60% from the current US average.",
      },
      {
        q: "How many trees does it take to offset one tonne of CO₂?",
        a: "At a typical mixed plantation sequestration rate of 12 kg CO₂/tree/year: 1 tonne requires approximately 83 trees to offset over 1 year, 8 trees over 10 years, or 3 trees over 25 years. Faster-growing tropical species can reduce these numbers; slower temperate species require more. The Tree Offset tab calculates this precisely for any combination of amount, species type, and time horizon.",
      },
      {
        q: "Why is beef's carbon footprint so high?",
        a: "Beef has a high carbon footprint for three reasons: (1) cattle produce methane (a potent greenhouse gas) through enteric fermentation in their digestive systems; (2) they require large amounts of feed (grains, soy) to produce relatively little meat by weight (roughly 7kg of grain per 1kg of beef); and (3) their land requirement is very high, and in many regions, raising cattle is associated with deforestation. Together these factors give beef a carbon intensity approximately 7–10× higher than chicken and 15–20× higher than pulses (lentils, beans).",
      },
      {
        q: "Is tree planting an effective offset strategy?",
        a: "It is one legitimate tool among several, but comes with important limitations: trees take decades to accumulate meaningful carbon, are vulnerable to fire, drought, pests, and land-use change, and require active management for permanence. Quality offset projects (verified under Gold Standard or Verra/VCS protocols) account for these risks with buffer stocks. Use tree planting to offset residual emissions after making the highest-impact reductions in your footprint — not as a substitute for reducing emissions at the source.",
      },
      {
        q: "How does my electricity consumption compare to the average?",
        a: "Average household electricity consumption varies widely: approximately 877 kWh/month in the US, 350 kWh/month in the UK, and 900–1,200 kWh/month in South Africa (higher due to electric geysers and air conditioning in extreme climates). The emission factor per kWh depends on the energy mix of your grid: approximately 0.45 kgCO₂e/kWh in the UK, 0.38 in the US average, 0.87 in South Africa (coal-heavy), and near-zero in Norway (predominantly hydroelectric).",
      },
      {
        q: "Does switching to electric vehicle reduce my carbon footprint?",
        a: "In most markets, yes — significantly. An EV running on the average UK grid emits approximately 40–50 gCO₂e/km (including manufacturing); a petrol car emits 120–150 gCO₂e/km. In Norway (near-zero grid), an EV emits near-zero operational emissions. In South Africa (coal-heavy grid, approximately 0.87 kgCO₂e/kWh), an EV at 18 kWh/100km emits approximately 157 gCO₂e/km — close to a petrol car — but the gap improves as the grid decarbonises.",
      },
      {
        q: "What dietary change reduces water footprint most?",
        a: "Reducing beef consumption has the largest single impact. Beef has a water footprint of approximately 15,400 litres per kg. Replacing one 250g beef serving per week with chicken (4,300 L/kg) saves approximately 2,775 litres per week — over 144,000 litres per year from a single dietary substitution. Replacing beef with legumes (300–400 L/kg) saves proportionally more.",
      },
    ],
  },

  lifestyle: {
    title: "Lifestyle Budget Calculator: Complete Guide",
    intro: [
      "The TrufflShuffl Lifestyle Budget Calculator helps you plan the finances of three types of major life events: a wedding, a party or event, and a holiday. Each tab takes a different approach to the same underlying problem — understanding the total cost before you commit, and working out how to fund it without financial stress. These are the occasions where people most commonly overspend because the emotional stakes are high and the costs are distributed across many vendors over a long period.",
      "This guide explains what each tab calculates, how to enter your figures accurately, and the common planning mistakes that cause budgets to blow out. The calculator works with any currency, so it applies equally whether you are budgeting a Johannesburg wedding, a London summer party, or a European holiday.",
    ],
    sections: [
      {
        heading: "Wedding Budget Tab: Allocating Across Categories",
        paragraphs: [
          "Enter your total wedding budget and the number of guests. The calculator distributes the budget across standard wedding expense categories (venue, catering, photography, décor, entertainment, attire, stationery, and contingency) using industry-typical percentage allocations. Adjust each category's percentage to match your priorities — the totals dynamically recalculate.",
          "The per-head cost output is the most actionable number: it shows what you are effectively spending per guest across the variable cost categories (catering, venue hire, and décor scale with guest count). This figure lets you evaluate vendor quotes directly: a caterer charging $120 per head when your per-head budget is $90 tells you immediately that you need to reduce the guest count, choose a different caterer, or reallocate budget from another category.",
          "Catering and venue together typically consume 55–70% of a wedding budget, which is why the guest list is the most powerful lever for managing total cost. Every additional guest adds approximately 0.8–1.0× the per-head cost to the total bill (the full per-head cost applies to catering, and a portion applies to venue, linen, and florals). The tab shows the cost impact of adding or removing guests.",
        ],
      },
      {
        heading: "Event/Party Tab: Scaling a Per-Head Budget",
        paragraphs: [
          "Enter the number of guests and your per-head budget for each cost category (catering, venue, entertainment, décor, and other). The calculator shows the total cost for each category and the event total. This format is ideal for corporate events, birthday parties, and fundraisers where a per-person spend target has been established.",
          "Events budgeted on a per-head basis are easier to scale than fixed-cost budgets: if the guest count grows by 20, you know exactly how much additional budget is needed for the variable cost categories. Only venue (if priced as a flat rate) and some entertainment costs remain fixed as the guest count changes.",
          "Catering complexity significantly affects per-head cost. A casual cocktail-style event with finger foods and a bar runs at 40–60% of the cost of a formal sit-down dinner service per head. The choice between these styles is often the single biggest cost driver after the guest count itself.",
        ],
      },
      {
        heading: "Holiday Savings Tab: From Dream to Monthly Goal",
        paragraphs: [
          "Enter your holiday target cost, your current savings toward the trip, the number of months until you travel, and your savings account interest rate. The calculator shows the monthly savings required and the total interest earned on your savings during the period.",
          "Building a budget estimate before you start saving is the step most people skip. A realistic holiday budget should include: return flights, accommodation, meals (use an average daily food budget for the destination — budget travel: $30–50/day, mid-range: $80–150/day, comfortable: $200+/day), activities and entrance fees, local transport, travel insurance, and a 10–15% contingency for currency movements and unexpected costs.",
          "Currency risk deserves attention for international travel. If you are saving in your home currency but spending in a foreign currency, a 10% exchange rate movement in the wrong direction between now and your travel date increases the effective cost of your holiday by 10%. Build this buffer into your target amount, or consider converting a portion to the destination currency once you are within 3 months of travel.",
        ],
      },
      {
        heading: "Budget Discipline and Contingency",
        paragraphs: [
          "The most common reason large event budgets fail is scope creep: the gradual addition of extras — upgrades, add-ons, additional guests — each of which seems individually small. Set category limits before vendor engagement and enforce them as hard caps. A vendor presenting an option 20% above budget is offering something outside your plan, not within it.",
          "Contingency must be planned, not hoped for. A 10% contingency on the total event budget is the minimum for a well-planned wedding or event. Contingency is not budget for upgrades — it is insurance against the unexpected: a vendor who cancels, a weather event that requires a venue change, a last-minute addition of dietary requirements. If the contingency is not used, it can be redirected to the honeymoon fund or returned to savings.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I set a realistic wedding budget?",
        a: "Start from what you can afford without debt that takes more than 12 months to repay. Divide the total by the expected number of guests to get your effective per-head budget, and check it against local catering quotes (catering alone is typically $50–$150+ per head depending on market and service style). If the per-head budget is below the minimum catering cost, either the guest list needs to shrink or the total budget needs to increase.",
      },
      {
        q: "What percentage of a wedding budget should go to catering?",
        a: "Catering (food, drinks, service staff) typically consumes 30–40% of the total wedding budget in most markets. This is usually the single largest expense. If catering is priced at the higher end, other categories must compress proportionally. Use the Wedding Budget tab to see the allocation and adjust percentages until the category totals align with actual vendor quotes.",
      },
      {
        q: "How much should I save per month for a holiday in 12 months?",
        a: "Monthly savings needed = (target cost − current savings) ÷ months remaining. Adjusted for interest: the calculator accounts for savings interest reducing the required contribution. Example: target $4,000 holiday, current savings $500, 12 months, 4.5% annual interest rate: approximately $285/month. Without interest: ($4,000 − $500) ÷ 12 = $292/month. The interest saving is small at this scale but grows with larger targets and longer horizons.",
      },
      {
        q: "What is a realistic per-head budget for a corporate year-end event?",
        a: "For a corporate sit-down dinner event: $80–$150 per head is mid-range in most markets; below $60 makes full table service difficult; above $200 is premium. For a cocktail-style year-end: $40–$100 per head. These benchmarks vary significantly by city, venue type, and service standard. Request quotes from at least three caterers before fixing the per-head budget.",
      },
      {
        q: "Should I budget for tipping and gratuities in an event budget?",
        a: "Yes, always. Gratuities for venue staff, waiters, and bartenders are often not included in quoted prices and are expected in most markets. A standard 10–15% tip on the food and beverage bill is appropriate for quality service at an event. On a $10,000 catering bill, this adds $1,000–$1,500. Also check whether the caterer's quote includes service charge — some add 10–15% to the final bill automatically.",
      },
      {
        q: "How do I account for exchange rate risk in a holiday budget?",
        a: "Add 10–15% to your target amount as a currency buffer when saving for international travel. Alternatively, once within 3 months of travel, convert your savings to the destination currency through a travel money service or bank forward contract, locking in the current rate. For expensive destinations in currencies historically volatile against yours, a 15% buffer is more appropriate.",
      },
      {
        q: "What is typically underestimated in wedding planning?",
        a: "The most commonly underestimated wedding costs are: overtime charges when events run late (venue and catering both charge for this), alterations and accessories for wedding attire (often 20–30% of the dress purchase price), the rehearsal dinner if hosted by the couple, gratuities for vendors, and the cost of the honeymoon if planned concurrently with the wedding budget. Adding these together can easily add 10–20% to the expected total.",
      },
      {
        q: "Is it better to save in one account or multiple accounts for different goals?",
        a: "Multiple dedicated accounts — one per goal — improves goal achievement because each account's balance represents progress toward a specific objective rather than a general pool that gets raided for unrelated expenses. Use a high-yield savings account or money market account for each goal. Set up automatic transfers on payday so the savings happen before spending does.",
      },
    ],
  },

  tech: {
    title: "Technology Calculator: Complete Guide",
    intro: [
      "The TrufflShuffl Technology Calculator covers four practical calculations that most people face repeatedly but rarely have a precise tool for: how long a file or download will take at a given internet speed, how much storage you need to plan for your data over time, what an AI API will cost at your expected usage volume, and how many write-years remain on your SSD before the write endurance is consumed. Each tab gives a concrete number to a question that otherwise gets answered with a vague guess.",
      "This guide explains what each tab calculates, what the key inputs mean, and how to interpret the output for real purchasing and planning decisions. The calculations apply regardless of country or currency — the underlying technology standards are global.",
    ],
    sections: [
      {
        heading: "Internet Speed Tab: Download Times and What Speed You Actually Need",
        paragraphs: [
          "Enter the file size (in GB, MB, or TB) and your connection speed in Mbps. The calculator converts file size to megabits (1 byte = 8 bits; 1 GB = 8,000 Mb) and divides by speed to give download time in hours, minutes, and seconds. A real-world throughput factor of 75–85% of advertised speed is applied by default, reflecting the typical gap between the ISP's maximum speed and what you actually achieve on a congested network.",
          "The 'what speed do I need' function works in reverse: enter the activities you want to run simultaneously (4K streaming, video calls, gaming, working from home with cloud sync) and the number of users. Each activity has a minimum Mbps requirement, and the calculator aggregates them to give the minimum plan speed that will support all concurrent activities without buffering or lag.",
          "Upload speed matters as much as download for two-way activities: video calls require 3–5 Mbps upload per stream; uploading large files to cloud storage, working from home with video conferencing, and live streaming all require meaningful upload capacity. Most home broadband plans offer asymmetric speeds (download >> upload). Check your plan's upload speed separately if these activities are relevant.",
        ],
      },
      {
        heading: "Storage Planning Tab: How Much Space You Will Need",
        paragraphs: [
          "Enter your current data volume in GB or TB, your estimated annual growth rate (in GB or TB per year, or as a percentage), and the planning horizon in years. The calculator projects the total storage needed at the end of the horizon, including year-by-year growth. The 3-2-1 backup multiplier is optionally applied: 3 copies of all data on at least 2 different storage media types, with 1 copy off-site — meaning your actual storage infrastructure must support 3× the raw data volume.",
          "Data growth rates vary enormously by use case. A typical household adding 1,000 photos and 20 videos per month grows by approximately 50–80 GB/month using smartphone JPEG and compressed video. A RAW photography workflow at 1,000 images/month grows by 200–400 GB/month. A video production workflow with uncompressed or RAW video can grow by 2–10 TB per month. Enter your actual estimated monthly growth from recent months of data creation.",
          "The tab also helps with cost comparison between storage options. For cloud storage: enter the per-GB/TB monthly cost and see the 5-year total cost. For on-premise storage (NAS, external drives): enter the upfront hardware cost and compare to the cloud total. For most high-volume users (photographers, videographers), on-premise NAS storage becomes more economical than cloud after approximately 3–5 years of use.",
        ],
      },
      {
        heading: "AI API Cost Tab: Projecting Spend at Scale",
        paragraphs: [
          "Enter the AI model's input cost per million tokens, output cost per million tokens, your average input tokens per request, your average output tokens per request, and your expected daily request volume. The calculator returns cost per individual request, daily cost, monthly cost, and annual cost.",
          "Tokens are approximately 4 characters or 0.75 words of English text. A system prompt of 500 words ≈ 650–700 tokens. A typical user message of 100 words ≈ 130 tokens. An AI response of 300 words ≈ 400 tokens. For a chatbot with a 500-token system prompt, 100-token user input, and 400-token response: total per request = 600 input tokens + 400 output tokens. At $3/M input and $15/M output: cost per request = (600 × 3 + 400 × 15) ÷ 1,000,000 = $0.0000078 — $7.80 per million requests.",
          "At scale, seemingly tiny per-request costs become significant. 100,000 daily requests at $0.0000078 = $0.78/day = $23/month = $284/year. At 10 million daily requests: $28,000/year. The AI API Cost tab makes this scaling math instantly visible, which is essential for product pricing decisions: the API cost at your expected user load must be covered by your revenue model with appropriate margin.",
        ],
      },
      {
        heading: "SSD Lifespan Tab: Write Endurance and Replacement Planning",
        paragraphs: [
          "Enter the SSD's TBW rating (terabytes written — the manufacturer's specified total write endurance, found in the drive's datasheet), the drive capacity in GB, and your estimated daily writes in GB. The calculator returns the projected lifespan in years before the TBW rating is consumed.",
          "TBW ratings are conservative: most SSDs continue to function reliably well beyond their TBW rating in real-world use, particularly for consumer workloads. However, for write-intensive professional applications (database servers, video recording, continuous backup targets), TBW is the key reliability metric and drives should be monitored and replaced before reaching their rated endurance.",
          "Monitor SSD health using SMART data (S.M.A.R.T. = Self-Monitoring, Analysis and Reporting Technology). Free tools like CrystalDiskInfo (Windows) or smartmontools (Linux/macOS) show attributes including 'Media Wearout Indicator' or 'Percentage of Life Used' — the drive's own estimate of consumed write endurance. Plan replacement when this reaches 80–85% consumed, before the drive enters the higher-risk zone.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why does my actual download speed never match my plan speed?",
        a: "Advertised internet speeds are the maximum under ideal conditions: direct wired connection to the modem, no network congestion, close to the exchange or DSLAM. Real-world throughput is typically 60–90% of the advertised rate due to network congestion (especially during peak hours), Wi-Fi interference and signal loss, router and modem overhead, and distance-related signal degradation on DSL connections. The calculator uses 75% as a conservative real-world factor.",
      },
      {
        q: "What Mbps speed do I need for 4K streaming?",
        a: "Netflix recommends 25 Mbps for 4K Ultra HD streaming. Disney+ and Apple TV+ require 25 Mbps. YouTube 4K typically uses 15–25 Mbps. For a household streaming 4K on two screens simultaneously while on a video call: 25 + 25 + 5 = 55 Mbps minimum — requiring at least a 75–100 Mbps plan to have comfortable headroom for other devices.",
      },
      {
        q: "What is a token in the context of AI API pricing?",
        a: "Tokens are the units that language models use to process text. In English, 1 token ≈ 4 characters ≈ 0.75 words. The word 'understanding' is approximately 2–3 tokens. Most language model APIs price separately for input tokens (your prompt) and output tokens (the model's response). The ratio of input to output tokens significantly affects cost: models with expensive output pricing punish long responses more than models with symmetric pricing.",
      },
      {
        q: "What is TBW for an SSD and how do I find it?",
        a: "TBW (Terabytes Written) is the manufacturer's specified total amount of data that can be written to the drive before reliability is no longer guaranteed. Find it in the product datasheet (usually linked from the product page), in the drive's packaging, or by searching '[drive model] TBW'. Consumer SSDs range from 150 TBW (budget 500GB drives) to 1,200 TBW (premium 4TB drives). Enterprise SSDs may be rated 10,000+ TBW.",
      },
      {
        q: "How much storage do I need for 5 years of 4K video production?",
        a: "4K video at standard bitrates: 4K H.264 (60fps) ≈ 3–6 GB per minute; 4K ProRes (editing format) ≈ 12–30 GB per minute; RAW cinema formats ≈ 50–200+ GB per minute. For a creator editing 10 hours of final video per month using H.264 camera footage (approximately 40 hours of raw footage at 6 GB/min = 14,400 GB/month): 5 years = 864 TB of raw storage, before any backup copies. The 3-2-1 rule multiplies this by 3. Use the Storage Planning tab with your actual monthly capture volume.",
      },
      {
        q: "How do I know which AI model to use for cost efficiency?",
        a: "Balance cost against capability. For tasks requiring nuanced reasoning, long context, and high accuracy (legal analysis, code generation, complex writing): frontier models (GPT-4, Claude Sonnet/Opus) are appropriate despite higher cost. For classification, simple summarisation, customer-facing chatbots where responses are short: lightweight models (GPT-3.5-turbo, Claude Haiku, Gemini Flash) deliver adequate quality at 5–20× lower cost. The API Cost tab lets you model the total annual cost for each model at your volume so you can quantify the cost difference and compare it to any quality difference.",
      },
      {
        q: "How much daily write load is typical for a PC user?",
        a: "A typical desktop PC user writes 5–15 GB per day (OS paging, application caching, downloads, document saves). A developer running builds and tests: 20–50 GB/day. A video editor working on raw footage: 50–200 GB/day. A database server: potentially thousands of GB/day. For a 500 GB consumer SSD rated at 300 TBW with a user writing 10 GB/day: estimated lifespan = 300,000 GB ÷ (10 × 365) = approximately 82 years — far exceeding the physical lifespan of the hardware.",
      },
      {
        q: "Does SSD lifespan differ between NVMe and SATA SSDs?",
        a: "NVMe SSDs are generally faster than SATA but TBW ratings are determined by the NAND flash cell type (TLC, QLC, SLC, MLC), not the interface. A SATA drive with TLC NAND may have a higher TBW rating than an NVMe drive with QLC NAND, or vice versa. Check the TBW specification for each specific model rather than assuming NVMe = more durable. Enterprise NVMe drives (designed for server workloads) have dramatically higher TBW ratings than consumer NVMe drives.",
      },
    ],
  },

  excise: {
    title: "Excise Duty Calculator: Complete Guide",
    intro: [
      "Excise duties are taxes levied on specific goods — principally fuel, tobacco, and alcohol — at the point of manufacture or importation, rather than at the retail sale like GST or VAT. Unlike broad consumption taxes, excise is typically a fixed amount per unit (cents per litre, dollars per stick, pounds per litre of alcohol) rather than a percentage of value. This makes them powerful revenue tools that are easy to administer and hard to avoid through transfer pricing.",
      "This calculator covers excise duties in Australia (ATO), the United Kingdom (HMRC), and the United States (TTB/IRS) as at 2026. Many excise rates are indexed to inflation and updated on fixed schedules — Australian fuel and alcohol rates are indexed twice yearly, tobacco annually; UK rates update in the February budget; US federal rates are largely static and set by Congress. Always verify the current rate with the relevant authority before filing an excise return.",
    ],
    sections: [
      {
        heading: "How Excise Duty Differs from GST/VAT",
        paragraphs: [
          "GST and VAT are ad valorem taxes — calculated as a percentage of the sale price — and apply broadly to most goods and services. Excise is a specific tax on a defined category of goods, usually levied per physical unit (per litre, per stick, per kilogram) rather than per dollar of value. This means that as prices rise with inflation, GST revenue rises automatically with them, but excise revenue from a specific-rate tax does not unless the rate is explicitly indexed.",
          "For businesses, the practical difference is significant: GST is collected from the customer and remitted to the tax authority (with input tax credits available), while excise is typically paid by the manufacturer or importer at the point of production or entry and is not separately recoverable through the GST system. Excise is a cost of production, not a tax collected on behalf of the government from customers — it is embedded in the cost base.",
          "In most jurisdictions, both excise and GST/VAT apply simultaneously. In Australia, fuel excise is paid when the fuel leaves a licensed excise premises, and then GST of 10% is charged on the GST-inclusive price (which already includes the excise). This 'tax on a tax' effect means the effective tax burden on excisable goods is higher than the simple sum of the rates.",
        ],
      },
      {
        heading: "Australia: Fuel Excise",
        paragraphs: [
          "Australia's fuel excise is levied under the Excise Act 1901 and the Excise Tariff Act 1921. The rate for petrol and diesel (and most other fuel types) is indexed twice yearly — on 1 February and 1 August — to movement in the CPI. This indexation was suspended from April 2001 to July 2014, so rates were frozen for 13 years. Since July 2014 indexation has been continuous.",
          "The estimated rate for February 2026 is approximately 52.4 cents per litre, up from 50.8 cents in February 2025. The rate applies at the point the fuel leaves the licensed excise premises (refinery, blending facility, or storage). Importers pay excise at the point of importation. Fuel used for certain off-road purposes (farming, mining, marine) may be eligible for the Fuel Tax Credits scheme, which effectively refunds some or all of the excise.",
          "Small fuel producers (biodiesel, ethanol blends) have historically been eligible for excise duty remissions or production grants. The ATO updates the current excise rate on its website after each indexation. For compliance purposes, always use the ATO's published current rate, not the estimate in this calculator.",
        ],
      },
      {
        heading: "Australia: Tobacco Excise",
        paragraphs: [
          "Tobacco excise in Australia is among the highest in the world and has been increasing aggressively since 2010. The rate is set per stick (per cigarette) and is indexed each September to CPI plus 5 percentage points — meaning the real (inflation-adjusted) rate increases by approximately 5% every year. From 2023, the annual increase was changed to twice yearly to accelerate the reduction in smoking rates.",
          "The 2026 estimated rate is approximately A$1.64 per stick. For a pack of 25 cigarettes, this equates to approximately A$41.00 in excise alone, before GST and retailer margin. Australia's tobacco excise applies to all tobacco products by weight equivalent — cigars, roll-your-own tobacco, and pipe tobacco are all covered. Illicit tobacco is a significant enforcement challenge given the enormous price differential created by high excise rates.",
          "Excise is paid by licensed tobacco manufacturers and importers. There are no legal means for end consumers to access duty-free tobacco for domestic consumption (duty-free allowances apply only to international travellers and are capped at 25 cigarettes or 25 grams of other tobacco products per adult).",
        ],
      },
      {
        heading: "Australia: Alcohol Excise",
        paragraphs: [
          "Alcohol excise in Australia is calculated per litre of pure alcohol (LAL), not per litre of product. To calculate the excise on a product, you need to know the product's alcohol by volume (ABV). For example, a 375ml can of beer at 4.5% ABV contains 0.375 × 0.045 = 0.016875 LAL of alcohol. At the packaged beer rate of approximately A$75.47/LAL, the excise on that can is approximately A$1.27.",
          "The rates differ by product type and how the product is served. Draught beer (beer sold from kegs at licensed venues) attracts a lower rate than packaged beer. Beer under 3.5% ABV attracts a lower rate again. Spirits and RTDs (ready-to-drink pre-mixed beverages) attract the highest excise rate — approximately A$103.25/LAL — regardless of whether they are draught or packaged.",
          "Wine is not subject to the volumetric alcohol excise system. Instead, it is subject to the Wine Equalisation Tax (WET) at 29% of the wholesale value of the wine. This means that for wine, the excise-equivalent tax is ad valorem (percentage of value) rather than volumetric. Wine producers with an annual WET liability may be eligible for the WET producer rebate of up to A$350,000.",
        ],
      },
      {
        heading: "United Kingdom: Fuel and Alcohol Duty",
        paragraphs: [
          "The UK fuel duty rate has been frozen at 52.95 pence per litre since March 2022, when the rate was cut by 5p from 57.95p as a cost-of-living measure. Successive budgets through 2026 have maintained this freeze. The rate applies equally to unleaded petrol, diesel, and biodiesel blends. The UK's combined fuel tax burden (duty + 20% VAT on duty + VAT on the pre-tax price) makes UK pump prices among the highest in Europe in absolute terms.",
          "UK alcohol duty was reformed in August 2023, moving from a product-based system (different rates for beer, wine, spirits regardless of strength) to a strength-based system where duty increases with the alcohol content. This means a 5% ABV craft beer and a 5% ABV cider now attract the same duty rate. The 2026 estimated rates under the new system: beer at 3.5–8.4% ABV approximately £26.51 per LAL; spirits approximately £32.97 per LAL. Rates are typically updated in February and August aligned to CPI.",
          "UK tobacco duty applies to cigarettes, cigars, hand-rolling tobacco, and heated tobacco products. Cigarettes attract a specific (fixed) duty of approximately £6.79 per pack of 20 (est. April 2026) plus an ad valorem element of 16.5% of the retail price. The minimum excise tax applies if the total duty on a pack falls below a floor level. HMRC publishes confirmed rates after each budget.",
        ],
      },
      {
        heading: "United States: Federal Excise Tax",
        paragraphs: [
          "US federal excise taxes are set by Congress and are generally static — the federal gasoline tax of 18.4 cents per gallon has been unchanged since 1993. Unlike many other countries, federal excise rates in the US are not automatically indexed to inflation. The Highway Trust Fund, which is largely funded by fuel excise, has faced recurring shortfalls as a result of inflation eroding the real value of the fixed-rate tax.",
          "US alcohol excise (administered by the Alcohol and Tobacco Tax and Trade Bureau — TTB) distinguishes between large and small producers. The Craft Beverage Modernization Act (CBMA), made permanent in 2020, provides significantly reduced rates for small domestic brewers, wineries, and distilleries on their first tranche of production. For example, standard beer rate is $18 per barrel, but domestic small brewers pay $3.50 per barrel on the first 60,000 barrels annually.",
          "State excise taxes are entirely separate from federal rates and can dwarf the federal component. New York state cigarette tax is $5.35 per pack; California fuel tax is 59.6 cents per gallon (2026 estimate). Total tax on excisable goods in the US is the sum of federal + state (and sometimes local) excise, and must be researched for each specific state.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is excise duty included in the price shown at the petrol station?",
        a: "Yes. In Australia, the UK, and the US, the pump price for fuel is fully inclusive of all applicable taxes — excise/fuel duty, GST/VAT, and any levies. The price you see is the total price you pay. Excise is embedded in the cost structure before the pump price is set, not added separately at the point of sale.",
      },
      {
        q: "How do I calculate excise on Australian beer if I know the volume and ABV?",
        a: "Multiply the volume in litres by the ABV percentage expressed as a decimal to get the litres of pure alcohol (LAL). Then multiply by the applicable excise rate. Example: 24 × 375ml cans at 4.9% ABV = 9 litres of product × 4.9% = 0.441 LAL. At A$75.47/LAL (est. Feb 2026): 0.441 × A$75.47 = A$33.28 excise. Note: the threshold for the packaged beer rate is above 1.15% ABV.",
      },
      {
        q: "What is the difference between the draught beer and packaged beer rate in Australia?",
        a: "Draught beer sold from kegs at licensed venues (hotels, restaurants, pubs) attracts a lower excise rate than beer sold in cans, bottles, or other packaged forms. The rationale is that draught beer is consumed on-premise under licensed supervision. The draught rate is approximately A$61.00/LAL (est. 2026) versus A$75.47/LAL for packaged. Craft breweries selling direct from taps may qualify for the draught rate on eligible sales.",
      },
      {
        q: "Can I claim back fuel excise in Australia?",
        a: "Yes, through the Fuel Tax Credits (FTC) scheme. Businesses that use fuel in machinery, plant, or equipment for eligible off-road activities (agriculture, mining, construction) can claim a credit for some or all of the fuel excise. The FTC rate is the full excise rate for most off-road uses. The credit is claimed on your BAS (Business Activity Statement). On-road use of heavy vehicles (GVM > 4.5 tonnes) also qualifies for a partial FTC at a reduced rate.",
      },
      {
        q: "Why is UK tobacco duty a combination of specific and ad valorem rates?",
        a: "The dual structure (fixed amount per pack + percentage of retail price) is designed to achieve two goals simultaneously: the fixed element ensures a minimum tax floor per cigarette regardless of how cheap the product is (closing a loophole where very cheap cigarettes could be taxed at very low absolute amounts); the ad valorem element captures some of the revenue from premium brands whose price exceeds the floor. Most jurisdictions use one or the other; the UK uses both.",
      },
      {
        q: "Does US excise tax apply to imports?",
        a: "Yes. US federal excise taxes (including alcohol and tobacco excise) apply to imported goods at the same rates as domestically produced goods. For alcohol, imported beverages are taxed by TTB at the applicable rate based on volume and type. For tobacco, US Customs and Border Protection (CBP) collects the excise duty on imported tobacco products at importation. Some CBMA reduced rates for domestic small producers are not available to importers.",
      },
      {
        q: "What is the Wine Equalisation Tax (WET) in Australia?",
        a: "WET is a 29% tax on the wholesale value of wine sold in Australia, applied instead of the volumetric alcohol excise that applies to beer and spirits. It applies to grape wine, wine-based beverages, sake, mead, and similar products. WET is typically paid by the last wholesale supplier of the wine in Australia. Wine producers with eligible Australian-sourced grapes can apply for a WET producer rebate of up to A$350,000 per year, which significantly offsets the WET liability for smaller producers.",
      },
    ],
  },

  customs: {
    title: "Customs Duty & Tariff Calculator: Complete Guide",
    intro: [
      "Customs duties (also called import tariffs) are taxes levied on goods when they cross an international border. Unlike excise duties — which are domestic taxes on specific goods regardless of origin — customs duties apply specifically to imported goods and are determined by three variables: what the goods are (the HS code / tariff classification), where they come from (the country of origin), and their value (the customs value, typically CIF — cost, insurance, and freight to the port of importation).",
      "The global tariff landscape changed dramatically in 2025–2026 with the United States implementing sweeping new reciprocal tariffs, Section 232 national security tariffs on steel, aluminum, and motor vehicles, and a complex web of country-specific rates. This calculator covers the most significant tariff regimes for the United States, European Union, United Kingdom, Australia, and Canada, reflecting 2026 rates including the key 2025–2026 US tariff actions. All rates are estimates — always verify at the exact HS code level with the applicable customs authority before an import transaction.",
    ],
    sections: [
      {
        heading: "How Customs Duty is Calculated",
        paragraphs: [
          "Customs duty is expressed as a percentage of the customs value and is calculated as: Customs Value × Tariff Rate = Duty Payable. The customs value is typically the CIF (Cost + Insurance + Freight) value — the price of the goods plus the cost of insuring and shipping them to the first port of entry in the importing country. Some countries (including the US) use FOB (Free On Board — the price at the port of export, excluding international freight and insurance) as the basis; check the applicable rule for the specific importing country.",
          "The applicable tariff rate depends on the HS (Harmonized System) code — an internationally standardized 6-digit commodity code that classifies all traded goods — and the country of origin. The same good can attract very different rates depending on its origin. A car imported into the US from Germany attracts a different rate to the same car imported from Canada under USMCA. The origin determination itself is a compliance area — goods must genuinely originate in the claimed country to qualify for preferential (FTA) rates.",
          "In addition to the base customs duty, many countries apply other import charges: GST or VAT on the customs value plus duty; anti-dumping duties (country- and product-specific); countervailing duties (to offset foreign government subsidies); and various fees and levies. Total import cost = customs value + customs duty + anti-dumping/CVD (if any) + GST/VAT on the total.",
        ],
      },
      {
        heading: "US Tariffs 2025–2026: Major Changes",
        paragraphs: [
          "The most significant tariff development of 2025–2026 is the US administration's use of emergency trade powers to impose sweeping new tariffs. On April 2, 2025 ('Liberation Day'), executive orders established a universal 10% baseline tariff on imports from virtually all countries, plus higher 'reciprocal' tariffs on countries with large US trade deficits. On April 9, 2025, the higher reciprocal tariffs were paused for 90 days for most countries (except China), reverting to the 10% baseline during the pause period.",
          "For China, the tariff escalated to 145% in April 2025 (combining reciprocal tariff plus existing Section 301 tariffs). On May 12, 2025, the US and China agreed to a 90-day truce reducing China's combined rate to 30% (from 145%) for most goods, effective from mid-May 2025. This 90-day window would expire in mid-August 2025. The rate applicable as at mid-2026 is subject to post-truce negotiations — verify at USTR.",
          "Section 232 national security tariffs, which are separate from and additional to the above, impose 25% tariffs on steel and aluminum from all countries (as expanded in March 2025) and 25% tariffs on automobiles and auto parts from all countries (effective April 2025). These stack on top of other applicable tariffs. USMCA partners Canada and Mexico are not exempt from Section 232 measures, though USMCA-compliant goods generally remain at 0% for the base tariff.",
        ],
      },
      {
        heading: "Free Trade Agreements and Preferential Rates",
        paragraphs: [
          "FTAs allow qualifying goods to enter at reduced or zero tariff rates. To qualify for an FTA preferential rate, goods must meet the rules of origin specified in the agreement — typically requiring a minimum level of domestic processing or content (e.g., the USMCA yarn-forward rule for textiles requires that fiber, yarn, fabric, and garment all be produced in North America).",
          "Key FTAs relevant to this calculator: USMCA (US, Canada, Mexico — successor to NAFTA, in force since July 2020): most goods traded between the three countries qualify for 0% tariff if USMCA origin rules are met. Note that Section 232 steel/aluminum and auto tariffs are separate measures and apply even to USMCA partners. Australia–US FTA (AUSFTA, 2005): substantially eliminates tariffs between the two countries on qualifying goods. Australia–China FTA (ChAFTA, 2015): most tariffs phased to 0% by 2019. EU–various FTAs: the EU has over 40 FTAs providing preferential access; the CPTPP provides the UK with preferential access to 11 Asia-Pacific markets.",
          "The origin of goods is determined by where they last underwent 'substantial transformation.' In complex global supply chains, this can be non-obvious. A product assembled in Vietnam from Chinese components may be considered to originate in Vietnam for tariff purposes — or it may not, depending on the specific transformation test. Customs brokers and lawyers specialise in origin determination for high-value or high-volume imports.",
        ],
      },
      {
        heading: "EU, UK, and Australian Tariff Regimes",
        paragraphs: [
          "The European Union operates the Common External Tariff (CET) — a single tariff schedule applied by all 27 member states to imports from outside the EU. EU MFN (Most-Favoured-Nation) rates average about 4% for industrial goods and about 13% for agricultural goods, though specific products can be much higher (EU peak tariffs on some agricultural products exceed 100%). The EU uses TARIC (Integrated Tariff of the European Union) as its official tariff database. Anti-dumping and countervailing duties on Chinese EVs (17–38.1%, imposed 2024) are significant recent additions.",
          "The United Kingdom's Global Tariff (UKGT) replaced the EU's CET after Brexit in January 2021. The UK broadly retained similar rates to the EU CET on most goods, with some reductions (notably eliminating tariffs on many products the UK does not produce domestically). UK MFN rates average about 4% industrial, 10% agricultural. The UK has progressively signed trade deals post-Brexit, including with Australia (UKFTA) and accession to the CPTPP. A US–UK trade deal was under active negotiation as at 2026.",
          "Australia has one of the most open tariff regimes in the world. Most goods enter at 0% or 5% MFN, and Australia's FTA network — including ChAFTA (China), AUSFTA (US), JAEPA (Japan), KAFTA (Korea), AANZFTA (ASEAN), UK–Australia FTA, and IndAus ECTA (India) — means that goods from most major trading partners enter duty-free. Australia eliminated all tariffs on passenger vehicles in 2010. The Australian Border Force administers the Working Tariff (ICS).",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between MFN and preferential tariff rates?",
        a: "MFN (Most-Favoured-Nation) is the standard WTO tariff rate that a country applies to all other WTO members with whom it does not have a preferential trade agreement. A preferential rate is a lower rate available to countries that have an FTA or other preferential arrangement with the importing country. For example, the EU's MFN rate on passenger cars is 10%, but cars imported from countries with EU FTAs may enter at 0%. To claim a preferential rate, the importer must have proof of origin (certificate of origin or origin declaration) for the goods.",
      },
      {
        q: "What is CIF and why does it matter for calculating customs duty?",
        a: "CIF stands for Cost + Insurance + Freight — the total cost of the goods plus the cost of insuring and shipping them to the importing country's port of entry. Most countries (including the EU, UK, Australia, and Canada) use CIF as the customs value basis, meaning you pay duty on the landed value including shipping. The US uses FOB (Free On Board — the price at the port of export, excluding international freight and insurance), so US customs value is typically lower than CIF value for the same shipment. This difference can be significant for heavy goods with high shipping costs.",
      },
      {
        q: "What are Section 232 tariffs and which goods do they affect?",
        a: "Section 232 of the Trade Expansion Act of 1962 allows the US President to impose tariffs on goods that threaten US national security. Section 232 tariffs currently in effect (2026): 25% on imports of steel and aluminum from all countries (expanded March 2025, now including derivative steel/aluminum articles); 25% on all imported motor vehicles and auto parts (April 2025). These tariffs apply universally — including to USMCA partners Canada and Mexico — and stack on top of other applicable tariff rates including the base MFN or reciprocal tariff.",
      },
      {
        q: "How does country of origin work when goods are manufactured in multiple countries?",
        a: "Country of origin is the country where the goods last underwent 'substantial transformation' — meaning a change in tariff classification or a manufacturing process that creates a fundamentally new and different article. The specific test depends on the HS code and the importing country's rules. For FTA purposes, stricter 'rules of origin' apply (e.g., USMCA textile yarns must be North American; EU origin requires a specific percentage of domestic value added). Goods assembled in a third country from Chinese components may or may not be considered Chinese origin depending on the transformation test — this is a frequent area of customs enforcement.",
      },
      {
        q: "What is anti-dumping duty and how does it differ from standard customs duty?",
        a: "Anti-dumping duty (ADD) is imposed when a government determines that foreign goods are being exported to its market at below-normal value (i.e., below the price in the exporting country's domestic market or below cost of production). It is a trade remedy measure allowed under WTO rules. Unlike standard customs duty — which applies uniformly to all imports of a given product from a given country — anti-dumping duty rates are typically set at specific amounts or percentages for specific named exporters. ADD is additional to, not a replacement for, standard customs duty. Countervailing duty (CVD) is similar but targets foreign government subsidies rather than dumping.",
      },
      {
        q: "Do I pay GST or VAT on top of customs duty?",
        a: "Yes, in most countries. In Australia: the importer pays 10% GST on the sum of customs value + customs duty. In the EU: VAT at the applicable national rate (typically 20–25%) applies on CIF + customs duty. In the UK: 20% VAT on the customs value + duty. GST/VAT-registered importers can typically claim back the import GST/VAT as an input tax credit on their next return, so the net cost is the duty only. Non-registered importers (including individuals) cannot recover import GST/VAT — it is a real additional cost.",
      },
      {
        q: "What is the de minimis threshold and when does customs duty not apply?",
        a: "Most countries have a de minimis threshold below which customs duty (and sometimes GST/VAT) is not collected on imported goods: Australia raised its threshold to AUD 1,000 in 2018, though GST on low-value imports was extended to all values from 2018. US de minimis is USD 800 — the highest in the world — meaning goods valued under USD 800 typically enter duty-free (this threshold was actively debated in 2025 in the context of Chinese e-commerce). UK de minimis for customs duty is GBP 135. EU de minimis for customs duty is EUR 150 (zero VAT threshold was eliminated in 2021). Check the current threshold for your importing country, as these figures are subject to policy change.",
      },
      {
        q: "How do I find the exact tariff rate for my specific product?",
        a: "Use the official tariff databases: US — HTS (Harmonized Tariff Schedule) at hts.usitc.gov; EU — TARIC at trade.ec.europa.eu/access-to-markets; UK — UK Trade Tariff at trade-tariff.service.gov.uk; Australia — Working Tariff / ICS at abf.gov.au; Canada — Customs Tariff at cbsa-asfc.gc.ca. In all cases, you need the correct 6–10 digit HS tariff code for your specific goods. A licensed customs broker can provide the tariff classification and applicable rate with legal certainty.",
      },
    ],
  },
};
