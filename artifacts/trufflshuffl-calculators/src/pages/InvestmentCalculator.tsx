import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CurrencySelect } from "@/components/CurrencySelect";
import { DEFAULT_CURRENCY, fmtCurrency, type Currency } from "@/lib/currencies";
import { calculateInvestment } from "@/lib/calculators/financial";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COMPOUND_FREQS = [
  { label: "Daily (365×)", value: "365" },
  { label: "Monthly (12×)", value: "12" },
  { label: "Quarterly (4×)", value: "4" },
  { label: "Semi-annually (2×)", value: "2" },
  { label: "Annually (1×)", value: "1" },
  { label: "Simple Interest", value: "0" },
];

export default function InvestmentCalculator() {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [principal, setPrincipal] = useState("50000");
  const [monthly, setMonthly] = useState("1000");
  const [rate, setRate] = useState("10");
  const [years, setYears] = useState("10");
  const [freq, setFreq] = useState("12");
  const [result, setResult] = useState<ReturnType<typeof calculateInvestment> | null>(null);

  function fmt(n: number) { return fmtCurrency(n, currency); }

  function calculate() {
    setResult(calculateInvestment(Number(principal), Number(monthly), Number(rate), Number(years), Number(freq)));
  }

  return (
    <CalculatorLayout
      title="Investment Calculator"
      description="Compare compound vs simple interest growth and project how your money grows over time — works with any world currency."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Select your currency from the dropdown</li>
          <li>Enter your starting capital (principal amount)</li>
          <li>Add a monthly contribution if you plan to save regularly</li>
          <li>Set your expected annual interest rate</li>
          <li>Choose how often interest compounds</li>
          <li>Set the investment term in years then click Calculate</li>
        </ol>
      }
      testimonial="TrufflShuffl's Investment Calculator has become my go-to planning tool. I use it every month to check how my unit trust is tracking against my retirement target. The compound vs simple comparison was eye-opening — I had no idea how much of a difference compounding frequency makes over 20 years. My financial advisor even asked me to share the link. The chart makes it incredibly easy to visualise long-term growth and have those honest conversations about whether I'm saving enough. I've recommended it to everyone in my investment club. Finally a calculator that doesn't require a finance degree to use, but still gives you the depth professionals expect."
    guide={CALCULATOR_GUIDES['investment']}
    >
      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label>Currency</Label>
          <CurrencySelect value={currency} onChange={setCurrency} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Principal Amount ({currency.symbol})</Label>
            <Input data-testid="input-principal" type="number" value={principal} onChange={e => setPrincipal(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Monthly Contribution ({currency.symbol})</Label>
            <Input data-testid="input-monthly" type="number" value={monthly} onChange={e => setMonthly(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Annual Interest Rate (%)</Label>
            <Input data-testid="input-rate" type="number" value={rate} onChange={e => setRate(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Term (Years)</Label>
            <Input data-testid="input-years" type="number" value={years} onChange={e => setYears(e.target.value)} />
          </div>
          <div className="space-y-1.5 col-span-2">
            <Label>Compounding Frequency</Label>
            <Select value={freq} onValueChange={setFreq}>
              <SelectTrigger data-testid="select-freq"><SelectValue /></SelectTrigger>
              <SelectContent>
                {COMPOUND_FREQS.map(f => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button data-testid="button-calculate" className="w-full" onClick={calculate}>Calculate</Button>

        {result && (
          <div className="space-y-6 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30">
                <p className="text-xs text-muted-foreground mb-1">Compound Final Value</p>
                <p className="font-mono text-xl font-bold text-primary" data-testid="result-compound-final">{fmt(result.finalValueCompound)}</p>
                <p className="text-xs text-green-400 mt-1">Interest: {fmt(result.totalInterestCompound)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Simple Interest Final Value</p>
                <p className="font-mono text-xl font-bold text-foreground" data-testid="result-simple-final">{fmt(result.finalValueSimple)}</p>
                <p className="text-xs text-muted-foreground mt-1">Interest: {fmt(result.totalInterestSimple)}</p>
              </div>
            </div>

            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="text-sm font-semibold mb-1 text-primary">Compound advantage</p>
              <p className="font-mono text-2xl font-bold text-foreground">
                {fmt(result.finalValueCompound - result.finalValueSimple)}
              </p>
              <p className="text-xs text-muted-foreground">extra earned by compounding</p>
            </div>

            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={result.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 20%)" />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: "hsl(220 15% 55%)" }} label={{ value: "Year", position: "insideBottom", offset: -2, fontSize: 11, fill: "hsl(220 15% 55%)" }} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(220 15% 55%)" }} tickFormatter={v => `${currency.symbol}${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: "hsl(220 13% 14%)", border: "1px solid hsl(220 13% 20%)", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="compound" name="Compound" stroke="hsl(43 85% 55%)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="simple" name="Simple" stroke="hsl(220 60% 60%)" strokeWidth={2} dot={false} strokeDasharray="4 2" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="text-muted-foreground">
                  <th className="text-left py-2 border-b border-border">Year</th>
                  <th className="text-right py-2 border-b border-border">Compound</th>
                  <th className="text-right py-2 border-b border-border">Simple</th>
                  <th className="text-right py-2 border-b border-border">Contributions</th>
                </tr>
              </thead>
              <tbody>
                {result.data.map(row => (
                  <tr key={row.year} className="border-b border-border/40 hover:bg-card/60">
                    <td className="py-1.5 font-mono">{row.year}</td>
                    <td className="py-1.5 text-right font-mono text-primary">{fmt(row.compound)}</td>
                    <td className="py-1.5 text-right font-mono">{fmt(row.simple)}</td>
                    <td className="py-1.5 text-right font-mono text-muted-foreground">{fmt(row.totalContributions)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
