import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { calculateAmortization } from "@/lib/calculators/financial";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function fmt(n: number) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function AmortizationCalculator() {
  const [principal, setPrincipal] = useState("500000");
  const [rate, setRate] = useState("11.75");
  const [term, setTerm] = useState("20");
  const [extra, setExtra] = useState("0");
  const [showAll, setShowAll] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof calculateAmortization> | null>(null);

  function calculate() {
    setResult(calculateAmortization(Number(principal), Number(rate), Number(term), Number(extra)));
  }

  const displayRows = result ? (showAll ? result.schedule : result.schedule.slice(0, 12)) : [];
  const chartData = result ? result.chartData.filter((_, i) => i % 6 === 0 || i === result.chartData.length - 1) : [];

  return (
    <CalculatorLayout
      title="Amortization Calculator"
      description="Generate a complete month-by-month loan repayment schedule showing exactly how each payment splits between principal and interest over the life of your loan."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Enter the loan principal amount</li>
          <li>Set the annual interest rate</li>
          <li>Choose the loan term in years</li>
          <li>Add an extra monthly payment to see interest savings</li>
          <li>Click Generate Schedule for the full amortization table</li>
          <li>Toggle between showing first year and full schedule</li>
        </ol>
      }
      testimonial="As a first-generation homeowner I had no idea what amortization meant until I used this tool. Watching year one of my bond — where almost 80% of every payment goes to interest and only 20% to principal — was sobering but incredibly motivating. I immediately increased my monthly payment by R2,000 and the calculator showed me I'd save R187,000 in interest and pay off 4 years early. The chart makes the crossover point — where more goes to principal than interest — crystal clear. I now check my amortization schedule every January to track progress and decide if I can afford to make extra payments. It has genuinely changed how I think about debt."
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Loan Principal (R)</Label>
            <Input data-testid="input-principal" type="number" value={principal} onChange={e => setPrincipal(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Annual Interest Rate (%)</Label>
            <Input data-testid="input-rate" type="number" value={rate} onChange={e => setRate(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Loan Term (years)</Label>
            <Input data-testid="input-term" type="number" value={term} onChange={e => setTerm(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Extra Monthly Payment (R)</Label>
            <Input data-testid="input-extra" type="number" value={extra} onChange={e => setExtra(e.target.value)} />
          </div>
        </div>

        <Button data-testid="button-calculate" className="w-full" onClick={calculate}>Generate Schedule</Button>

        {result && (
          <div className="space-y-5 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30">
                <p className="text-xs text-muted-foreground mb-1">Monthly Payment</p>
                <p className="font-mono text-xl font-bold text-primary" data-testid="result-monthly">R {fmt(result.monthly)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                <p className="font-mono text-xl font-bold text-red-400">R {fmt(result.totalInterest)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
                <p className="font-mono text-lg font-bold text-foreground">R {fmt(result.totalPaid)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Payoff in</p>
                <p className="font-mono text-lg font-bold text-foreground">{result.payoffMonth} months</p>
                {result.monthsSaved > 0 && <p className="text-xs text-green-400">{result.monthsSaved} months saved</p>}
              </div>
            </div>

            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 20%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(220 15% 55%)" }} label={{ value: "Month", position: "insideBottom", offset: -2, fontSize: 10, fill: "hsl(220 15% 55%)" }} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(220 15% 55%)" }} tickFormatter={v => `R${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => `R ${fmt(v)}`} contentStyle={{ background: "hsl(220 13% 14%)", border: "1px solid hsl(220 13% 20%)", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="principal" name="Principal" stackId="1" stroke="hsl(43 85% 55%)" fill="hsl(43 85% 55% / 0.3)" />
                  <Area type="monotone" dataKey="interest" name="Interest" stackId="1" stroke="hsl(0 65% 50%)" fill="hsl(0 65% 50% / 0.3)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-foreground">Payment Schedule</p>
                <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => setShowAll(!showAll)}>
                  {showAll ? "Show first 12" : `Show all ${result.schedule.length}`}
                </Button>
              </div>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="text-left py-2 border-b border-border">Month</th>
                    <th className="text-right py-2 border-b border-border">Payment (R)</th>
                    <th className="text-right py-2 border-b border-border">Principal (R)</th>
                    <th className="text-right py-2 border-b border-border">Interest (R)</th>
                    <th className="text-right py-2 border-b border-border">Balance (R)</th>
                  </tr>
                </thead>
                <tbody>
                  {displayRows.map(row => (
                    <tr key={row.month} className="border-b border-border/40 hover:bg-card/60">
                      <td className="py-1.5 font-mono">{row.month}</td>
                      <td className="py-1.5 text-right font-mono">{fmt(row.payment)}</td>
                      <td className="py-1.5 text-right font-mono text-primary">{fmt(row.principal)}</td>
                      <td className="py-1.5 text-right font-mono text-red-400">{fmt(row.interest)}</td>
                      <td className="py-1.5 text-right font-mono text-muted-foreground">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
