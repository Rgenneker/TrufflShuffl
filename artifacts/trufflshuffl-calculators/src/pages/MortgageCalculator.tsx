import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { calculateMortgage } from "@/lib/calculators/financial";

const MORTGAGE_TYPES = [
  "Fixed Rate", "Variable Rate", "Interest-Only", "Offset Mortgage", "Buy-to-Let",
];

function fmt(n: number) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function MortgageCalculator() {
  const [price, setPrice] = useState("2000000");
  const [deposit, setDeposit] = useState("200000");
  const [rate, setRate] = useState("11.75");
  const [term, setTerm] = useState("20");
  const [type, setType] = useState("Fixed Rate");
  const [incTransfer, setIncTransfer] = useState(true);
  const [incAttorney, setIncAttorney] = useState(true);
  const [incBond, setIncBond] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof calculateMortgage> | null>(null);

  function calculate() {
    setResult(calculateMortgage(
      Number(price), Number(deposit), Number(rate), Number(term),
      incTransfer, incAttorney, incBond
    ));
  }

  const displayData = result ? (showAll ? result.yearlyData : result.yearlyData.slice(0, 5)) : [];

  return (
    <CalculatorLayout
      title="Mortgage Calculator"
      description="Calculate your South African home loan repayments including transfer duty, attorney fees and bond registration costs for a true picture of what you'll pay."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Enter the property purchase price</li>
          <li>Enter your deposit amount</li>
          <li>Set your interest rate (prime is currently ~11.75%)</li>
          <li>Choose loan term — typically 20 years</li>
          <li>Toggle additional costs to include in your total</li>
          <li>Click Calculate to see your full cost breakdown</li>
        </ol>
      }
      testimonial="Buying our first home was terrifying until I found this calculator. The transfer duty auto-calculation alone saved hours of searching — I typed in R2.1 million and it immediately showed me the duty bracket and exact amount. More importantly, seeing the total cost of the property including attorney fees, bond registration, and 20 years of interest changed our thinking entirely. We ended up increasing our deposit and reducing the term from 20 to 15 years, saving over R400,000 in interest. The year-by-year breakdown showing exactly how much of each year's payments go to interest vs principal is the most eye-opening thing any first-time buyer can see. This is the calculator every estate agent should show their clients."
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Property Price (R)</Label>
            <Input data-testid="input-price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Deposit (R)</Label>
            <Input data-testid="input-deposit" type="number" value={deposit} onChange={e => setDeposit(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Annual Interest Rate (%)</Label>
            <Input data-testid="input-rate" type="number" value={rate} onChange={e => setRate(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Loan Term (years)</Label>
            <Input data-testid="input-term" type="number" value={term} onChange={e => setTerm(e.target.value)} />
          </div>
          <div className="space-y-1.5 col-span-2">
            <Label>Mortgage Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger data-testid="select-type"><SelectValue /></SelectTrigger>
              <SelectContent>
                {MORTGAGE_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Include in total cost</p>
          {[
            { label: "Transfer Duty (SA scale)", value: incTransfer, set: setIncTransfer, id: "transfer" },
            { label: "Attorney Fees (~1% + R3,500)", value: incAttorney, set: setIncAttorney, id: "attorney" },
            { label: "Bond Registration Costs", value: incBond, set: setIncBond, id: "bond" },
          ].map(item => (
            <div key={item.id} className="flex items-center justify-between">
              <Label htmlFor={item.id} className="text-sm text-muted-foreground">{item.label}</Label>
              <Switch data-testid={`switch-${item.id}`} id={item.id} checked={item.value} onCheckedChange={item.set} />
            </div>
          ))}
        </div>

        <Button data-testid="button-calculate" className="w-full" onClick={calculate}>Calculate</Button>

        {result && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 col-span-2">
                <p className="text-xs text-muted-foreground mb-1">Monthly Bond Repayment</p>
                <p className="font-mono text-2xl font-bold text-primary" data-testid="result-monthly">R {fmt(result.monthlyPayment)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Loan Amount</p>
                <p className="font-mono text-lg font-bold text-foreground">R {fmt(result.loanAmount)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">LTV Ratio</p>
                <p className="font-mono text-lg font-bold text-foreground">{result.ltv.toFixed(1)}%</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                <p className="font-mono text-lg font-bold text-red-400">R {fmt(result.totalInterest)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1">True Total Cost</p>
                <p className="font-mono text-lg font-bold text-foreground">R {fmt(result.totalCost)}</p>
              </div>
            </div>

            {(incTransfer || incAttorney || incBond) && (
              <div className="bg-background rounded-lg p-4 border border-border space-y-2">
                <p className="text-sm font-semibold text-foreground">Additional Costs</p>
                {incTransfer && <div className="flex justify-between text-xs"><span className="text-muted-foreground">Transfer Duty</span><span className="font-mono text-foreground">R {fmt(result.transferDuty)}</span></div>}
                {incAttorney && <div className="flex justify-between text-xs"><span className="text-muted-foreground">Attorney Fees</span><span className="font-mono text-foreground">R {fmt(result.attorneyFees)}</span></div>}
                {incBond && <div className="flex justify-between text-xs"><span className="text-muted-foreground">Bond Registration</span><span className="font-mono text-foreground">R {fmt(result.bondRegistration)}</span></div>}
              </div>
            )}

            <div>
              <p className="text-sm font-semibold mb-2 text-foreground">Year-by-year breakdown</p>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="text-left py-2 border-b border-border">Year</th>
                    <th className="text-right py-2 border-b border-border">Balance (R)</th>
                    <th className="text-right py-2 border-b border-border">Interest paid (R)</th>
                    <th className="text-right py-2 border-b border-border">Principal paid (R)</th>
                  </tr>
                </thead>
                <tbody>
                  {displayData.map(row => (
                    <tr key={row.year} className="border-b border-border/40 hover:bg-card/60">
                      <td className="py-1.5 font-mono">{row.year}</td>
                      <td className="py-1.5 text-right font-mono">{fmt(row.balance)}</td>
                      <td className="py-1.5 text-right font-mono text-red-400">{fmt(row.interestPaid)}</td>
                      <td className="py-1.5 text-right font-mono text-primary">{fmt(row.principalPaid)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {result.yearlyData.length > 5 && (
                <Button variant="ghost" size="sm" className="mt-2 text-xs" onClick={() => setShowAll(!showAll)}>
                  {showAll ? "Show less" : `Show all ${result.yearlyData.length} years`}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
