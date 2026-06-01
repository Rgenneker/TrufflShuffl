import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateLoan } from "@/lib/calculators/financial";

const LOAN_TYPES = [
  "Personal Loan", "Vehicle Finance", "Student Loan",
  "Business Loan", "Payday Loan", "Credit Card",
];

function fmt(n: number) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function LoanCalculator() {
  const [amount, setAmount] = useState("100000");
  const [rate, setRate] = useState("18");
  const [term, setTerm] = useState("60");
  const [extra, setExtra] = useState("0");
  const [loanType, setLoanType] = useState("Personal Loan");
  const [result, setResult] = useState<ReturnType<typeof calculateLoan> | null>(null);

  function calculate() {
    setResult(calculateLoan(Number(amount), Number(rate), Number(term), Number(extra)));
  }

  const principalPct = result ? (Number(amount) / result.totalPayment) * 100 : 0;
  const interestPct = result ? (result.totalInterest / result.totalPayment) * 100 : 0;

  return (
    <CalculatorLayout
      title="Loan Calculator"
      description="Calculate your monthly repayment, total interest payable, and how extra payments can save you months and thousands in interest."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Enter your loan amount</li>
          <li>Select your loan type</li>
          <li>Enter the annual interest rate</li>
          <li>Set the loan term in months</li>
          <li>Optionally add an extra monthly payment to see how much time and money you can save</li>
          <li>Click Calculate</li>
        </ol>
      }
      testimonial="I used this loan calculator before taking out vehicle finance and it completely changed my negotiation. Seeing the total interest figure in black and white — R38,000 on a R150,000 car loan — motivated me to put down a larger deposit and shorten the term. The extra payment feature showed me that adding just R500 a month would save 11 months and over R8,000 in interest. My bank told me the same thing but this visual breakdown made it real. I've since shared it with three family members who were about to sign agreements without truly understanding the full cost of their loans. TrufflShuffl's Loan Calculator is exactly what South African consumers need."
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Loan Amount (R)</Label>
            <Input data-testid="input-amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Loan Type</Label>
            <Select value={loanType} onValueChange={setLoanType}>
              <SelectTrigger data-testid="select-loan-type"><SelectValue /></SelectTrigger>
              <SelectContent>
                {LOAN_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Annual Interest Rate (%)</Label>
            <Input data-testid="input-rate" type="number" value={rate} onChange={e => setRate(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Loan Term (months)</Label>
            <Input data-testid="input-term" type="number" value={term} onChange={e => setTerm(e.target.value)} />
          </div>
          <div className="space-y-1.5 col-span-2">
            <Label>Extra Monthly Payment (R)</Label>
            <Input data-testid="input-extra" type="number" value={extra} onChange={e => setExtra(e.target.value)} placeholder="0" />
          </div>
        </div>

        <Button data-testid="button-calculate" className="w-full" onClick={calculate}>Calculate</Button>

        {result && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30">
                <p className="text-xs text-muted-foreground mb-1">Monthly Payment</p>
                <p className="font-mono text-xl font-bold text-primary" data-testid="result-monthly">R {fmt(result.monthlyPayment)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Total Repayment</p>
                <p className="font-mono text-xl font-bold text-foreground" data-testid="result-total">R {fmt(result.totalPayment)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                <p className="font-mono text-lg font-bold text-red-400" data-testid="result-interest">R {fmt(result.totalInterest)}</p>
                <p className="text-xs text-muted-foreground">{result.interestPercent.toFixed(1)}% of principal</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Interest % of Principal</p>
                <p className="font-mono text-lg font-bold text-foreground">{result.interestPercent.toFixed(1)}%</p>
              </div>
            </div>

            {Number(extra) > 0 && result.monthsSaved > 0 && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-green-400 mb-1">Extra payment savings</p>
                <p className="text-xs text-muted-foreground">
                  By paying R {fmt(Number(extra))} extra per month, you save{" "}
                  <strong className="text-green-400">{result.monthsSaved} months</strong> and{" "}
                  <strong className="text-green-400">R {fmt(result.interestSaved)}</strong> in interest.
                </p>
              </div>
            )}

            <div>
              <p className="text-xs text-muted-foreground mb-2">Repayment breakdown</p>
              <div className="h-5 rounded-full overflow-hidden flex">
                <div className="bg-primary h-full transition-all" style={{ width: `${principalPct}%` }} title="Principal" />
                <div className="bg-red-500 h-full transition-all" style={{ width: `${interestPct}%` }} title="Interest" />
              </div>
              <div className="flex gap-4 mt-2">
                <span className="flex items-center gap-1.5 text-xs"><span className="w-2.5 h-2.5 rounded-sm bg-primary inline-block" />Principal ({principalPct.toFixed(0)}%)</span>
                <span className="flex items-center gap-1.5 text-xs"><span className="w-2.5 h-2.5 rounded-sm bg-red-500 inline-block" />Interest ({interestPct.toFixed(0)}%)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
