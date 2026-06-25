import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function fmt(n: number, dec = 2) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export default function CreditCardCalculator() {
  const [balance, setBalance] = useState("15000");
  const [apr, setApr] = useState("22");
  const [minPct, setMinPct] = useState("2");
  const [interestResult, setInterestResult] = useState<{
    monthlyRate: number; monthlyInterest: number; minPayment: number; monthsMin: number; totalInterestMin: number;
  } | null>(null);

  const [payoffBalance, setPayoffBalance] = useState("15000");
  const [payoffApr, setPayoffApr] = useState("22");
  const [payoffPayment, setPayoffPayment] = useState("1000");
  const [payoffResult, setPayoffResult] = useState<{ months: number; totalPaid: number; totalInterest: number; schedule: { month: number; payment: number; principal: number; interest: number; balance: number }[] } | null>(null);

  function calcInterest() {
    const bal = Number(balance);
    const monthlyRate = Number(apr) / 100 / 12;
    const monthlyInterest = bal * monthlyRate;
    const minPayment = Math.max(bal * (Number(minPct) / 100), 150);
    let b = bal;
    let months = 0;
    let totalInterestMin = 0;
    while (b > 0.01 && months < 600) {
      const interest = b * monthlyRate;
      const payment = Math.max(b * (Number(minPct) / 100), 150);
      const principal = Math.min(payment - interest, b);
      b -= principal;
      totalInterestMin += interest;
      months++;
    }
    setInterestResult({ monthlyRate, monthlyInterest, minPayment, monthsMin: months, totalInterestMin });
  }

  function calcPayoff() {
    const bal = Number(payoffBalance);
    const monthlyRate = Number(payoffApr) / 100 / 12;
    const payment = Number(payoffPayment);
    let b = bal;
    let months = 0;
    let totalPaid = 0;
    let totalInterest = 0;
    const schedule: typeof payoffResult extends null ? never : NonNullable<typeof payoffResult>["schedule"] = [];
    while (b > 0.01 && months < 600) {
      const interest = b * monthlyRate;
      const actualPayment = Math.min(payment, b + interest);
      const principal = actualPayment - interest;
      b -= principal;
      totalPaid += actualPayment;
      totalInterest += interest;
      months++;
      if (months <= 24) {
        schedule.push({ month: months, payment: actualPayment, principal, interest, balance: Math.max(0, b) });
      }
    }
    setPayoffResult({ months, totalPaid, totalInterest, schedule });
  }

  return (
    <CalculatorLayout
      title="Credit Card Calculator"
      description="Calculate monthly credit card interest and minimum payment costs, and plan a payoff strategy to become debt-free faster."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Interest: enter your balance and interest rate to see monthly interest and minimum payment impact</li>
          <li>Payoff Planner: enter a fixed monthly payment to see exactly when you'll be debt-free and how much interest you'll pay</li>
        </ol>
      }
      testimonial="I had R22 000 on my credit card and was only paying the 2% minimum each month. I knew it was bad but this calculator showed me exactly how bad: I was paying R385 a month in interest alone, and paying only minimums would take me over 12 years to clear the debt while paying more than R20 000 in interest on top of what I already owed. That was a wake-up call. I switched to paying R1 500 a month and the payoff tab showed I'd be clear in 18 months with just under R3 000 in interest. I set up the debit order the same day. The difference between minimum payments and a fixed amount is genuinely shocking — every South African with credit card debt should run these numbers."
    >
      <Tabs defaultValue="interest">
        <TabsList className="w-full">
          <TabsTrigger value="interest" className="flex-1">Monthly Interest</TabsTrigger>
          <TabsTrigger value="payoff" className="flex-1">Payoff Planner</TabsTrigger>
        </TabsList>

        <TabsContent value="interest" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Outstanding Balance (R)</Label>
              <Input type="number" value={balance} onChange={e => setBalance(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Annual Interest Rate (%)</Label>
              <Input type="number" value={apr} onChange={e => setApr(e.target.value)} step="0.25" />
            </div>
            <div className="space-y-1.5">
              <Label>Minimum Payment (%)</Label>
              <Input type="number" value={minPct} onChange={e => setMinPct(e.target.value)} step="0.5" />
            </div>
          </div>
          <Button className="w-full" onClick={calcInterest}>Calculate</Button>
          {interestResult && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background rounded-lg p-4 border border-red-500/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Monthly Interest</p>
                  <p className="font-mono text-xl font-bold text-red-400">R {fmt(interestResult.monthlyInterest)}</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Minimum Payment</p>
                  <p className="font-mono text-xl font-bold text-foreground">R {fmt(interestResult.minPayment)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background rounded-lg p-4 border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Months at Minimum</p>
                  <p className="font-mono text-xl font-bold text-foreground">{interestResult.monthsMin} months</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-red-500/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Interest (min only)</p>
                  <p className="font-mono text-xl font-bold text-red-400">R {fmt(interestResult.totalInterestMin)}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">SA credit cards typically charge prime + 6–14%. Current prime rate: check SARB website.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="payoff" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Balance (R)</Label>
              <Input type="number" value={payoffBalance} onChange={e => setPayoffBalance(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Interest Rate (%)</Label>
              <Input type="number" value={payoffApr} onChange={e => setPayoffApr(e.target.value)} step="0.25" />
            </div>
            <div className="space-y-1.5">
              <Label>Monthly Payment (R)</Label>
              <Input type="number" value={payoffPayment} onChange={e => setPayoffPayment(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcPayoff}>Calculate Payoff Plan</Button>
          {payoffResult && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Payoff Time</p>
                  <p className="font-mono text-xl font-bold text-primary">{payoffResult.months} months</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
                  <p className="font-mono text-xl font-bold text-foreground">R {fmt(payoffResult.totalPaid)}</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-red-500/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                  <p className="font-mono text-xl font-bold text-red-400">R {fmt(payoffResult.totalInterest)}</p>
                </div>
              </div>
              {payoffResult.schedule.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-muted-foreground border-b border-border">
                        <th className="py-1.5 text-left">Month</th>
                        <th className="py-1.5 text-right">Payment</th>
                        <th className="py-1.5 text-right">Principal</th>
                        <th className="py-1.5 text-right">Interest</th>
                        <th className="py-1.5 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payoffResult.schedule.map(r => (
                        <tr key={r.month} className="border-b border-border/50">
                          <td className="py-1">{r.month}</td>
                          <td className="py-1 text-right font-mono">R {fmt(r.payment)}</td>
                          <td className="py-1 text-right font-mono">R {fmt(r.principal)}</td>
                          <td className="py-1 text-right font-mono text-red-400">R {fmt(r.interest)}</td>
                          <td className="py-1 text-right font-mono">R {fmt(r.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {payoffResult.months > 24 && <p className="text-xs text-muted-foreground mt-1">Showing first 24 months of {payoffResult.months}.</p>}
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
