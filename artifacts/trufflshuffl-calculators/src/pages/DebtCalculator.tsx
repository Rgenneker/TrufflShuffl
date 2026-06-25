import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function fmt(n: number, dec = 2) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

type Debt = { name: string; balance: string; rate: string; payment: string };

export default function DebtCalculator() {
  const [debts, setDebts] = useState<Debt[]>([
    { name: "Credit Card", balance: "15000", rate: "22", payment: "450" },
    { name: "Personal Loan", balance: "30000", rate: "18", payment: "1200" },
    { name: "Car Loan", balance: "80000", rate: "12", payment: "2100" },
  ]);
  const [consolidationRate, setConsolidationRate] = useState("14");
  const [consolidationTerm, setConsolidationTerm] = useState("60");
  const [consResult, setConsResult] = useState<{
    totalBalance: number; currentPayment: number; newPayment: number; saving: number; totalInterestNow: number; totalInterestNew: number;
  } | null>(null);

  const [grossIncome, setGrossIncome] = useState("35000");
  const [totalDebtPayments, setTotalDebtPayments] = useState("8000");
  const [dtiResult, setDtiResult] = useState<{ dti: number; assessment: string; color: string } | null>(null);

  function addDebt() {
    setDebts(prev => [...prev, { name: "", balance: "0", rate: "20", payment: "0" }]);
  }

  function updateDebt(i: number, field: keyof Debt, value: string) {
    setDebts(prev => prev.map((d, idx) => idx === i ? { ...d, [field]: value } : d));
  }

  function removeDebt(i: number) {
    setDebts(prev => prev.filter((_, idx) => idx !== i));
  }

  function calcConsolidation() {
    const totalBalance = debts.reduce((s, d) => s + Number(d.balance), 0);
    const currentPayment = debts.reduce((s, d) => s + Number(d.payment), 0);
    const r = Number(consolidationRate) / 100 / 12;
    const n = Number(consolidationTerm);
    const newPayment = totalBalance * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalInterestNew = newPayment * n - totalBalance;
    const totalInterestNow = debts.reduce((s, d) => {
      const b = Number(d.balance);
      const mr = Number(d.rate) / 100 / 12;
      const p = Number(d.payment);
      if (p <= b * mr) return s + b * 2;
      let bal = b, months = 0, interest = 0;
      while (bal > 0.01 && months < 360) {
        const int = bal * mr;
        bal -= Math.min(p - int, bal);
        interest += int;
        months++;
      }
      return s + interest;
    }, 0);
    setConsResult({ totalBalance, currentPayment, newPayment, saving: currentPayment - newPayment, totalInterestNow, totalInterestNew });
  }

  function calcDTI() {
    const income = Number(grossIncome);
    const payments = Number(totalDebtPayments);
    const dti = (payments / income) * 100;
    let assessment = "";
    let color = "";
    if (dti < 20) { assessment = "Excellent — well within healthy limits."; color = "text-green-400"; }
    else if (dti < 35) { assessment = "Acceptable — manageable debt load."; color = "text-yellow-400"; }
    else if (dti < 50) { assessment = "High — consider reducing debt before taking on more."; color = "text-orange-400"; }
    else { assessment = "Dangerous — debt is unmanageable. Seek debt counselling."; color = "text-red-400"; }
    setDtiResult({ dti, assessment, color });
  }

  return (
    <CalculatorLayout
      title="Debt Calculator"
      description="Compare debt consolidation options against your current repayments, and calculate your debt-to-income ratio to assess your financial health."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Consolidation: list all your debts, enter a consolidation loan rate and term to compare</li>
          <li>Debt-to-Income: enter your gross monthly income and total monthly debt payments</li>
        </ol>
      }
      testimonial="I had four separate debts — a credit card, store account, personal loan and furniture account — each with different rates and payments that were impossible to track. This calculator helped me see the whole picture: R135 000 total, R4 200 a month in payments, and I was paying R62 000 in total interest over the remaining terms. By consolidating at 14% over 60 months my payment dropped to R3 150 and total interest fell to R54 000. Not always the right move depending on your specific rates, but the side-by-side comparison made it crystal clear in my case. The DTI calculator showed me I was at 38% — technically manageable but enough to make any bank hesitant to approve a home loan. That insight alone changed my financial priorities for the year."
    >
      <Tabs defaultValue="consolidation">
        <TabsList className="w-full">
          <TabsTrigger value="consolidation" className="flex-1">Debt Consolidation</TabsTrigger>
          <TabsTrigger value="dti" className="flex-1">Debt-to-Income Ratio</TabsTrigger>
        </TabsList>

        <TabsContent value="consolidation" className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground font-medium">
              <span>Debt Name</span><span>Balance (R)</span><span>Rate (%)</span><span>Payment (R)</span>
            </div>
            {debts.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input placeholder="Name" value={d.name} onChange={e => updateDebt(i, "name", e.target.value)} className="flex-1 text-sm" />
                <Input type="number" value={d.balance} onChange={e => updateDebt(i, "balance", e.target.value)} className="w-24 text-sm" />
                <Input type="number" value={d.rate} onChange={e => updateDebt(i, "rate", e.target.value)} className="w-16 text-sm" />
                <Input type="number" value={d.payment} onChange={e => updateDebt(i, "payment", e.target.value)} className="w-24 text-sm" />
                <button onClick={() => removeDebt(i)} className="text-muted-foreground hover:text-red-400 px-1 text-lg">×</button>
              </div>
            ))}
            <button onClick={addDebt} className="text-xs text-primary hover:underline">+ Add debt</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Consolidation Rate (%)</Label>
              <Input type="number" value={consolidationRate} onChange={e => setConsolidationRate(e.target.value)} step="0.25" />
            </div>
            <div className="space-y-1.5">
              <Label>Term (months)</Label>
              <Input type="number" value={consolidationTerm} onChange={e => setConsolidationTerm(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcConsolidation}>Compare</Button>
          {consResult && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background rounded-lg p-4 border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Current Monthly</p>
                  <p className="font-mono text-xl font-bold text-foreground">R {fmt(consResult.currentPayment)}</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Consolidated Monthly</p>
                  <p className="font-mono text-xl font-bold text-primary">R {fmt(consResult.newPayment)}</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Debt</p>
                  <p className="font-mono text-xl font-bold text-foreground">R {fmt(consResult.totalBalance)}</p>
                </div>
                <div className={`rounded-lg p-4 border text-center ${consResult.saving > 0 ? "border-green-500/30 bg-green-500/10" : "border-red-500/30 bg-red-500/10"}`}>
                  <p className="text-xs text-muted-foreground mb-1">Monthly Saving</p>
                  <p className={`font-mono text-xl font-bold ${consResult.saving > 0 ? "text-green-400" : "text-red-400"}`}>R {fmt(Math.abs(consResult.saving))}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xs text-muted-foreground">Interest (Current)</p>
                  <p className="font-mono font-bold text-sm">R {fmt(consResult.totalInterestNow)}</p>
                </div>
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xs text-muted-foreground">Interest (Consolidated)</p>
                  <p className="font-mono font-bold text-sm">R {fmt(consResult.totalInterestNew)}</p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="dti" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Gross Monthly Income (R)</Label>
              <Input type="number" value={grossIncome} onChange={e => setGrossIncome(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Total Monthly Debt Payments (R)</Label>
              <Input type="number" value={totalDebtPayments} onChange={e => setTotalDebtPayments(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcDTI}>Calculate DTI</Button>
          {dtiResult && (
            <div className="space-y-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Debt-to-Income Ratio</p>
                <p className={`font-mono text-3xl font-bold ${dtiResult.color}`}>{fmt(dtiResult.dti, 1)}%</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className={`text-sm font-medium ${dtiResult.color}`}>{dtiResult.assessment}</p>
              </div>
              <div className="grid grid-cols-4 gap-1 text-center text-xs">
                {[{ label: "Excellent", range: "< 20%", col: "text-green-400" }, { label: "Good", range: "20–35%", col: "text-yellow-400" }, { label: "High", range: "35–50%", col: "text-orange-400" }, { label: "Danger", range: "> 50%", col: "text-red-400" }].map(b => (
                  <div key={b.label} className="bg-background rounded p-2 border border-border">
                    <p className={`font-semibold ${b.col}`}>{b.label}</p>
                    <p className="text-muted-foreground">{b.range}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
