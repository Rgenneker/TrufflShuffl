import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CurrencySelect } from "@/components/CurrencySelect";
import { DEFAULT_CURRENCY, fmtCurrency, type Currency } from "@/lib/currencies";

export default function RetirementCalculator() {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [currentAge, setCurrentAge] = useState("35");
  const [retireAge, setRetireAge] = useState("65");
  const [lifeExp, setLifeExp] = useState("85");
  const [currentSavings, setCurrentSavings] = useState("50000");
  const [monthly, setMonthly] = useState("2000");
  const [returnRate, setReturnRate] = useState("8");
  const [inflationRate, setInflationRate] = useState("5");

  const [result, setResult] = useState<{
    nominalTotal: number;
    realTotal: number;
    monthlyIncome: number;
    yearsToRetire: number;
    retirementYears: number;
    totalContributed: number;
    growthEarned: number;
  } | null>(null);

  function fmt(n: number) { return fmtCurrency(n, currency); }

  function calculate() {
    const ca = parseInt(currentAge);
    const ra = parseInt(retireAge);
    const le = parseInt(lifeExp);
    const cs = parseFloat(currentSavings);
    const mc = parseFloat(monthly);
    const rr = parseFloat(returnRate) / 100;
    const ir = parseFloat(inflationRate) / 100;

    if ([ca, ra, le, cs, mc].some(isNaN) || ra <= ca || le <= ra) return;

    const years = ra - ca;
    const months = years * 12;
    const mr = rr / 12;

    const nominalTotal =
      cs * Math.pow(1 + mr, months) +
      mc * ((Math.pow(1 + mr, months) - 1) / mr);

    const realRate = (1 + rr) / (1 + ir) - 1;
    const realMR = realRate / 12;
    const realTotal =
      cs * Math.pow(1 + realMR, months) +
      mc * ((Math.pow(1 + realMR, months) - 1) / realMR);

    const retirementYears = le - ra;
    const withdrawalMonths = retirementYears * 12;
    const monthlyIncome = (realTotal * realMR) / (1 - Math.pow(1 + realMR, -withdrawalMonths));

    const totalContributed = cs + mc * months;
    const growthEarned = nominalTotal - totalContributed;

    setResult({ nominalTotal, realTotal, monthlyIncome, yearsToRetire: years, retirementYears, totalContributed, growthEarned });
  }

  return (
    <CalculatorLayout
      title="Retirement Calculator"
      description="Project your retirement nest egg based on current savings, monthly contributions, expected investment returns and inflation. See your real purchasing-power value at retirement."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Select your currency and enter your current age and target retirement age</li>
          <li>Enter your current retirement savings balance</li>
          <li>Enter your monthly contribution amount</li>
          <li>Set expected annual return and inflation rates</li>
          <li>Click Calculate</li>
        </ol>
      }
      testimonial="I've been contributing to my retirement annuity for 12 years but never truly understood how much I'd actually have. This calculator showed me the real inflation-adjusted figure and it was eye-opening — I immediately increased my monthly contribution. The breakdown between what I put in versus investment growth made the power of compound interest concrete. Every working adult should use this before their next birthday."
    >
      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label>Currency</Label>
          <CurrencySelect value={currency} onChange={setCurrency} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label>Current Age</Label>
            <Input type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} min="18" max="80" />
          </div>
          <div className="space-y-1.5">
            <Label>Retirement Age</Label>
            <Input type="number" value={retireAge} onChange={e => setRetireAge(e.target.value)} min="40" max="90" />
          </div>
          <div className="space-y-1.5">
            <Label>Life Expectancy</Label>
            <Input type="number" value={lifeExp} onChange={e => setLifeExp(e.target.value)} min="60" max="110" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Current Savings ({currency.symbol})</Label>
            <Input type="number" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Monthly Contribution ({currency.symbol})</Label>
            <Input type="number" value={monthly} onChange={e => setMonthly(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Expected Annual Return (%)</Label>
            <Input type="number" value={returnRate} onChange={e => setReturnRate(e.target.value)} step="0.5" />
          </div>
          <div className="space-y-1.5">
            <Label>Inflation Rate (%)</Label>
            <Input type="number" value={inflationRate} onChange={e => setInflationRate(e.target.value)} step="0.5" />
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Calculate</Button>
          <Button variant="outline" onClick={() => setResult(null)}>Reset</Button>
        </div>

        {result && (
          <div className="rounded-xl border border-border bg-muted/30 overflow-hidden mt-2 space-y-0">
            <div className="px-5 py-3 border-b border-border">
              <h3 className="font-semibold text-foreground">Retirement Projection — {result.yearsToRetire} years to go</h3>
            </div>
            <div className="divide-y divide-border">
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Nominal Total at Retirement</span>
                <span className="font-semibold text-foreground">{fmt(result.nominalTotal)}</span>
              </div>
              <div className="flex justify-between px-5 py-3 bg-primary/5">
                <span className="text-foreground font-medium text-sm">Real Value (today's money)</span>
                <span className="font-bold text-primary text-lg">{fmt(result.realTotal)}</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Estimated Monthly Income ({result.retirementYears} yrs)</span>
                <span className="font-semibold text-amber-400">{fmt(result.monthlyIncome)}/mo</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Total Contributions</span>
                <span className="font-semibold text-foreground">{fmt(result.totalContributed)}</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Investment Growth Earned</span>
                <span className="font-semibold text-green-400">{fmt(result.growthEarned)}</span>
              </div>
            </div>
            <div className="px-5 py-3 bg-muted/50 text-xs text-muted-foreground">
              For educational purposes only. Consult a licensed financial advisor for personalised retirement planning.
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
