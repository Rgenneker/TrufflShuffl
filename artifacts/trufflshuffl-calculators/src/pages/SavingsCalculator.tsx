import { useLang } from "@/context/LanguageContext";
import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CurrencySelect } from "@/components/CurrencySelect";
import { DEFAULT_CURRENCY, fmtCurrency, type Currency } from "@/lib/currencies";

const FREQ_OPTIONS = [
  { value: "12",  label: "Monthly" },
  { value: "4",   label: "Quarterly" },
  { value: "2",   label: "Bi-annually" },
  { value: "1",   label: "Annually" },
  { value: "365", label: "Daily" },
];

export default function SavingsCalculator() {
  const { t } = useLang();
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [initial, setInitial] = useState("5000");
  const [monthly, setMonthly] = useState("500");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const [compFreq, setCompFreq] = useState("12");
  const [result, setResult] = useState<{
    futureValue: number; totalDeposited: number; interestEarned: number; realRate: number;
  } | null>(null);

  function fmt(n: number) { return fmtCurrency(n, currency); }

  function calculate() {
    const P = parseFloat(initial);
    const pmt = parseFloat(monthly);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const n = parseInt(compFreq);

    if ([P, pmt, r, t, n].some(isNaN)) return;

    const periods = n * t;
    const rPerPeriod = r / n;

    const futureValueLump = P * Math.pow(1 + rPerPeriod, periods);
    const futureValueContribs = pmt * (12 / n) * ((Math.pow(1 + rPerPeriod, periods) - 1) / rPerPeriod);
    const futureValue = futureValueLump + futureValueContribs;

    const totalDeposited = P + pmt * 12 * t;
    const interestEarned = futureValue - totalDeposited;

    setResult({ futureValue, totalDeposited, interestEarned, realRate: r * 100 });
  }

  return (
    <CalculatorLayout
      title="Savings Calculator"
      description="Calculate how your savings will grow over time with compound interest and regular contributions. See the power of consistent saving — total deposits vs. interest earned."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Select your currency and enter your starting balance</li>
          <li>Enter your monthly contribution amount</li>
          <li>Set the annual interest rate and compounding frequency</li>
          <li>Enter the savings period in years</li>
          <li>Click Calculate</li>
        </ol>
      }
      testimonial="I started using this savings calculator to plan my emergency fund and it completely changed how I think about money. Seeing that my small monthly contribution would grow so significantly over 10 years made me commit to automating my savings immediately. The split between what I deposit and the interest earned shows exactly why starting early matters. Simple, accurate and motivating."
    guide={CALCULATOR_GUIDES['savings']}
    >
      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label>{t.currency}</Label>
          <CurrencySelect value={currency} onChange={setCurrency} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>{t.initialDeposit} ({currency.symbol})</Label>
            <Input type="number" value={initial} onChange={e => setInitial(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>{t.monthlyContribution} ({currency.symbol})</Label>
            <Input type="number" value={monthly} onChange={e => setMonthly(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>{t.annualInterestRate} (%)</Label>
            <Input type="number" value={rate} onChange={e => setRate(e.target.value)} step="0.25" />
          </div>
          <div className="space-y-1.5">
            <Label>{t.savingsPeriod}</Label>
            <Input type="number" value={years} onChange={e => setYears(e.target.value)} min="1" />
          </div>
          <div className="space-y-1.5 col-span-2">
            <Label>{t.compoundingFrequency}</Label>
            <Select value={compFreq} onValueChange={setCompFreq}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {FREQ_OPTIONS.map(f => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Calculate</Button>
          <Button variant="outline" onClick={() => setResult(null)}>Reset</Button>
        </div>

        {result && (
          <div className="rounded-xl border border-border bg-muted/30 overflow-hidden mt-2">
            <div className="px-5 py-3 border-b border-border">
              <h3 className="font-semibold text-foreground">Savings Projection</h3>
            </div>
            <div className="divide-y divide-border">
              <div className="flex justify-between px-5 py-3 bg-primary/5">
                <span className="text-foreground font-medium text-sm">Future Value</span>
                <span className="font-bold text-primary text-lg">{fmt(result.futureValue)}</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Total Deposited</span>
                <span className="font-semibold text-foreground">{fmt(result.totalDeposited)}</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Interest Earned</span>
                <span className="font-semibold text-green-400">{fmt(result.interestEarned)}</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Interest Share</span>
                <span className="font-semibold text-amber-400">
                  {((result.interestEarned / result.futureValue) * 100).toFixed(1)}% of total
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
