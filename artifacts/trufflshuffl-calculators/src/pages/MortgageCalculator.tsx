import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CurrencySelect } from "@/components/CurrencySelect";
import { DEFAULT_CURRENCY, fmtCurrency, type Currency } from "@/lib/currencies";
import { calculateMortgage } from "@/lib/calculators/financial";

const MORTGAGE_TYPES = [
  "Fixed Rate", "Variable Rate", "Interest-Only", "Offset Mortgage", "Buy-to-Let",
];

export default function MortgageCalculator() {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
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

  function fmt(n: number) { return fmtCurrency(n, currency); }

  function calculate() {
    setResult(calculateMortgage(Number(price), Number(deposit), Number(rate), Number(term), incTransfer, incAttorney, incBond));
  }

  const displayData = result ? (showAll ? result.yearlyData : result.yearlyData.slice(0, 5)) : [];

  return (
    <CalculatorLayout
      title="Mortgage / Home Loan Calculator"
      description="Calculate home loan repayments, total interest, and buying costs — including transfer duty, attorney fees and bond registration. Supports all world currencies."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Select your currency (ZAR transfer duty brackets apply for ZAR only)</li>
          <li>Enter the property purchase price and your deposit</li>
          <li>Set your interest rate and loan term</li>
          <li>Toggle additional costs to include in your total</li>
          <li>Click Calculate to see your full cost breakdown</li>
        </ol>
      }
      testimonial="Buying our first home was terrifying until I found this calculator. The transfer duty auto-calculation alone saved hours of searching. More importantly, seeing the total cost of the property including attorney fees, bond registration, and 20 years of interest changed our thinking entirely. We ended up increasing our deposit and reducing the term from 20 to 15 years, saving a huge amount in interest. The year-by-year breakdown showing exactly how much of each year's payments go to interest vs principal is the most eye-opening thing any first-time buyer can see. This is the calculator every estate agent should show their clients."
    guide={CALCULATOR_GUIDES['mortgage']}
    >
      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label>Currency</Label>
          <CurrencySelect value={currency} onChange={setCurrency} />
          {currency.code !== "ZAR" && (
            <p className="text-xs text-yellow-400">Note: Transfer duty brackets are South Africa–specific (ZAR). For other currencies, disable transfer duty or enter costs manually.</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Property Price ({currency.symbol})</Label>
            <Input data-testid="input-price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Deposit ({currency.symbol})</Label>
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
            { label: "Attorney Fees (~1% + base)", value: incAttorney, set: setIncAttorney, id: "attorney" },
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
                <p className="text-xs text-muted-foreground mb-1">Monthly Repayment</p>
                <p className="font-mono text-2xl font-bold text-primary" data-testid="result-monthly">{fmt(result.monthlyPayment)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Loan Amount</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmt(result.loanAmount)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">LTV Ratio</p>
                <p className="font-mono text-lg font-bold text-foreground">{result.ltv.toFixed(1)}%</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                <p className="font-mono text-lg font-bold text-red-400">{fmt(result.totalInterest)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1">True Total Cost</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmt(result.totalCost)}</p>
              </div>
            </div>

            {(incTransfer || incAttorney || incBond) && (
              <div className="bg-background rounded-lg p-4 border border-border space-y-2">
                <p className="text-sm font-semibold text-foreground">Additional Costs</p>
                {incTransfer && <div className="flex justify-between text-xs"><span className="text-muted-foreground">Transfer Duty</span><span className="font-mono">{fmt(result.transferDuty)}</span></div>}
                {incAttorney && <div className="flex justify-between text-xs"><span className="text-muted-foreground">Attorney Fees</span><span className="font-mono">{fmt(result.attorneyFees)}</span></div>}
                {incBond && <div className="flex justify-between text-xs"><span className="text-muted-foreground">Bond Registration</span><span className="font-mono">{fmt(result.bondRegistration)}</span></div>}
              </div>
            )}

            <div>
              <p className="text-sm font-semibold mb-2 text-foreground">Year-by-year breakdown</p>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="text-left py-2 border-b border-border">Year</th>
                    <th className="text-right py-2 border-b border-border">Balance</th>
                    <th className="text-right py-2 border-b border-border">Interest paid</th>
                    <th className="text-right py-2 border-b border-border">Principal paid</th>
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
