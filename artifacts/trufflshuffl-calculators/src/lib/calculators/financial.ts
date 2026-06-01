// Investment / Compound vs Simple Interest
export function calculateInvestment(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number,
  compoundFreq: number // times per year; 0 = simple interest
) {
  const data: { year: number; compound: number; simple: number; totalContributions: number }[] = [];
  const r = annualRate / 100;

  for (let y = 1; y <= years; y++) {
    const totalContribs = principal + monthlyContribution * 12 * y;

    // Compound
    let compound = principal;
    if (compoundFreq > 0) {
      const periods = compoundFreq * y;
      compound = principal * Math.pow(1 + r / compoundFreq, periods);
      if (monthlyContribution > 0) {
        const monthlyRate = r / 12;
        const months = y * 12;
        compound += monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      }
    } else {
      compound = principal * (1 + r * y) + monthlyContribution * 12 * y;
    }

    // Simple
    const simple = principal * (1 + r * y) + monthlyContribution * 12 * y;

    data.push({ year: y, compound, simple, totalContributions: totalContribs });
  }

  const final = data[data.length - 1];
  return {
    finalValueCompound: final?.compound ?? principal,
    finalValueSimple: final?.simple ?? principal,
    totalInterestCompound: final ? final.compound - final.totalContributions : 0,
    totalInterestSimple: final ? final.simple - final.totalContributions : 0,
    data,
  };
}

// Loan
export function calculateLoan(
  principal: number,
  annualRate: number,
  termMonths: number,
  extraPayment: number = 0
) {
  const r = annualRate / 100 / 12;
  let monthlyPayment = 0;
  if (r > 0) {
    monthlyPayment = (principal * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1);
  } else {
    monthlyPayment = principal / termMonths;
  }

  const totalPayment = monthlyPayment * termMonths;
  const totalInterest = totalPayment - principal;

  // With extra payment
  let balance = principal;
  let monthsWithExtra = 0;
  let totalInterestWithExtra = 0;
  while (balance > 0 && monthsWithExtra < termMonths) {
    const interest = balance * r;
    totalInterestWithExtra += interest;
    const principalPayment = monthlyPayment - interest + extraPayment;
    balance -= principalPayment;
    monthsWithExtra++;
    if (balance < 0) balance = 0;
  }

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    interestPercent: (totalInterest / principal) * 100,
    monthsSaved: termMonths - monthsWithExtra,
    interestSaved: totalInterest - totalInterestWithExtra,
  };
}

// Mortgage / Transfer Duty (South Africa)
export function calculateTransferDuty(price: number): number {
  if (price <= 1100000) return 0;
  if (price <= 1512500) return (price - 1100000) * 0.03;
  if (price <= 2117500) return 12375 + (price - 1512500) * 0.06;
  if (price <= 2722500) return 48675 + (price - 2117500) * 0.08;
  if (price <= 12100000) return 97075 + (price - 2722500) * 0.11;
  return 1128600 + (price - 12100000) * 0.13;
}

export function calculateMortgage(
  propertyPrice: number,
  deposit: number,
  annualRate: number,
  termYears: number,
  includeTransferDuty: boolean,
  includeAttorneyFees: boolean,
  includeBondRegistration: boolean
) {
  const loanAmount = propertyPrice - deposit;
  const r = annualRate / 100 / 12;
  const n = termYears * 12;

  let monthly = 0;
  if (r > 0) {
    monthly = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  } else {
    monthly = loanAmount / n;
  }

  const transferDuty = includeTransferDuty ? calculateTransferDuty(propertyPrice) : 0;
  const attorneyFees = includeAttorneyFees ? propertyPrice * 0.01 + 3500 : 0;
  const bondRegistration = includeBondRegistration ? loanAmount * 0.005 + 6000 : 0;

  const totalInterest = monthly * n - loanAmount;
  const ltv = (loanAmount / propertyPrice) * 100;

  // Year-by-year table
  const yearlyData: { year: number; balance: number; interestPaid: number; principalPaid: number }[] = [];
  let balance = loanAmount;
  let totalInterestPaid = 0;
  for (let y = 1; y <= Math.min(termYears, 30); y++) {
    let yearInterest = 0;
    let yearPrincipal = 0;
    for (let m = 0; m < 12; m++) {
      const intPayment = balance * r;
      const princPayment = monthly - intPayment;
      yearInterest += intPayment;
      yearPrincipal += princPayment;
      balance -= princPayment;
      if (balance < 0) balance = 0;
    }
    totalInterestPaid += yearInterest;
    yearlyData.push({ year: y, balance: Math.max(0, balance), interestPaid: totalInterestPaid, principalPaid: yearPrincipal });
  }

  return {
    loanAmount,
    monthlyPayment: monthly,
    totalInterest,
    totalCost: propertyPrice + transferDuty + attorneyFees + bondRegistration,
    ltv,
    transferDuty,
    attorneyFees,
    bondRegistration,
    yearlyData,
  };
}

// Bond (Fixed Income)
export function calculateBondPrice(
  faceValue: number,
  couponRate: number,
  couponFreq: number,
  yearsToMaturity: number,
  marketYield: number
): { price: number; duration: number; totalCoupons: number; schedule: { period: number; coupon: number; pv: number }[] } {
  const c = (faceValue * couponRate / 100) / couponFreq;
  const y = marketYield / 100 / couponFreq;
  const n = yearsToMaturity * couponFreq;

  let price = 0;
  let duration = 0;
  const schedule: { period: number; coupon: number; pv: number }[] = [];

  for (let t = 1; t <= n; t++) {
    const pv = c / Math.pow(1 + y, t);
    price += pv;
    duration += t * pv;
    schedule.push({ period: t, coupon: c, pv });
  }
  const pvFace = faceValue / Math.pow(1 + y, n);
  price += pvFace;
  duration = (duration + n * pvFace) / price / couponFreq;

  return { price, duration, totalCoupons: c * n, schedule };
}

export function calculateYTM(
  faceValue: number,
  price: number,
  couponRate: number,
  couponFreq: number,
  yearsToMaturity: number
): number {
  // Binary search for YTM
  let low = 0.0001, high = 5.0;
  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const p = calculateBondPrice(faceValue, couponRate, couponFreq, yearsToMaturity, mid * 100);
    if (p.price > price) low = mid;
    else high = mid;
  }
  return (low + high) / 2 * 100;
}

// Amortization
export function calculateAmortization(
  principal: number,
  annualRate: number,
  termYears: number,
  extraPayment: number = 0
) {
  const r = annualRate / 100 / 12;
  const n = termYears * 12;
  let monthly = 0;
  if (r > 0) {
    monthly = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  } else {
    monthly = principal / n;
  }

  const schedule: { month: number; payment: number; principal: number; interest: number; balance: number }[] = [];
  let balance = principal;
  let totalInterest = 0;
  let totalPaid = 0;
  const chartData: { month: number; principal: number; interest: number }[] = [];

  for (let m = 1; m <= n && balance > 0; m++) {
    const interest = balance * r;
    let principalPay = monthly - interest + extraPayment;
    if (principalPay > balance) principalPay = balance;
    const payment = interest + principalPay;
    balance -= principalPay;
    totalInterest += interest;
    totalPaid += payment;

    schedule.push({ month: m, payment, principal: principalPay, interest, balance: Math.max(0, balance) });
    chartData.push({ month: m, principal: principalPay, interest });

    if (balance <= 0) break;
  }

  const payoffMonth = schedule.length;
  const monthsSaved = n - payoffMonth;

  return { monthly, schedule, totalInterest, totalPaid, payoffMonth, monthsSaved, chartData };
}
