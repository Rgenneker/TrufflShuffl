import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrencySelect } from "@/components/CurrencySelect";
import { DEFAULT_CURRENCY, fmtCurrency, type Currency } from "@/lib/currencies";

function fmt(n: number, dec = 2) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

type Item = { name: string; value: string };

export default function NetWorthCalculator() {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);

  const [assets, setAssets] = useState<Item[]>([
    { name: "Primary Home", value: "1500000" },
    { name: "Retirement Annuity / Pension", value: "350000" },
    { name: "Investment / Unit Trust", value: "120000" },
    { name: "Vehicle(s)", value: "180000" },
    { name: "Savings Account", value: "50000" },
    { name: "Other Assets", value: "30000" },
  ]);
  const [liabilities, setLiabilities] = useState<Item[]>([
    { name: "Home Loan", value: "900000" },
    { name: "Car Finance", value: "80000" },
    { name: "Credit Card", value: "15000" },
    { name: "Personal Loan", value: "30000" },
  ]);
  const [nwResult, setNwResult] = useState<{ totalAssets: number; totalLiabilities: number; netWorth: number } | null>(null);

  const [fireExpenses, setFireExpenses] = useState("30000");
  const [fireReturn, setFireReturn] = useState("7");
  const [fireCurrentNw, setFireCurrentNw] = useState("500000");
  const [fireSavings, setFireSavings] = useState("10000");
  const [fireResult, setFireResult] = useState<{ fireNumber: number; yearsToFire: number; currentGap: number } | null>(null);

  function calcNetWorth() {
    const totalAssets = assets.reduce((s, a) => s + Number(a.value), 0);
    const totalLiabilities = liabilities.reduce((s, l) => s + Number(l.value), 0);
    setNwResult({ totalAssets, totalLiabilities, netWorth: totalAssets - totalLiabilities });
  }

  function calcFIRE() {
    const expenses = Number(fireExpenses);
    const fireNumber = expenses * 12 * 25;
    const current = Number(fireCurrentNw);
    const monthly = Number(fireSavings);
    const rate = Number(fireReturn) / 100 / 12;
    let bal = current;
    let months = 0;
    while (bal < fireNumber && months < 1200) {
      bal = bal * (1 + rate) + monthly;
      months++;
    }
    setFireResult({ fireNumber, yearsToFire: months / 12, currentGap: Math.max(0, fireNumber - current) });
  }

  function addAsset() { setAssets(prev => [...prev, { name: "", value: "0" }]); }
  function addLiability() { setLiabilities(prev => [...prev, { name: "", value: "0" }]); }
  function updateAsset(i: number, f: keyof Item, v: string) { setAssets(prev => prev.map((a, idx) => idx === i ? { ...a, [f]: v } : a)); }
  function updateLiability(i: number, f: keyof Item, v: string) { setLiabilities(prev => prev.map((l, idx) => idx === i ? { ...l, [f]: v } : l)); }

  return (
    <CalculatorLayout
      title="Net Worth & FIRE Calculator"
      description="Calculate your real-time net worth from assets and liabilities, and find your FIRE number — the amount needed to retire early and live off investments."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Net Worth: list all assets and liabilities and click Calculate</li>
          <li>FIRE: enter your monthly expenses, current savings and monthly investment to see when you can retire</li>
        </ol>
      }
      testimonial="I had never actually sat down and calculated my net worth until I found this tool. Adding up my home equity, retirement annuity, and investments against my outstanding bond, car finance and credit cards gave me a net worth of R1.02 million — more than I expected, and it gave me a concrete baseline to measure progress against each year. The FIRE calculator was even more motivating. I spend about R28 000 a month so my FIRE number is R8.4 million. With a current net worth of R1.02 million and saving R12 000 a month at a 7% real return, I'll reach FIRE in 21 years at age 56. That's a real target to aim for. I now update my net worth quarterly and track my FIRE progress like a fitness goal."
    >
      <div className="flex justify-end mb-2">
        <CurrencySelect value={currency} onChange={setCurrency} />
      </div>
      <Tabs defaultValue="networth">
        <TabsList className="w-full">
          <TabsTrigger value="networth" className="flex-1">Net Worth</TabsTrigger>
          <TabsTrigger value="fire" className="flex-1">FIRE Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="networth" className="space-y-4 pt-4">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-green-400 uppercase tracking-wide">Assets</p>
            {assets.map((a, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input placeholder="Asset" value={a.name} onChange={e => updateAsset(i, "name", e.target.value)} className="flex-1 text-sm" />
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">{currency.symbol}</span>
                  <Input type="number" value={a.value} onChange={e => updateAsset(i, "value", e.target.value)} className="w-32 text-sm" />
                </div>
                <button onClick={() => setAssets(prev => prev.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-red-400 px-1 text-lg">×</button>
              </div>
            ))}
            <button onClick={addAsset} className="text-xs text-green-400 hover:underline">+ Add asset</button>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-red-400 uppercase tracking-wide">Liabilities</p>
            {liabilities.map((l, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input placeholder="Liability" value={l.name} onChange={e => updateLiability(i, "name", e.target.value)} className="flex-1 text-sm" />
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">{currency.symbol}</span>
                  <Input type="number" value={l.value} onChange={e => updateLiability(i, "value", e.target.value)} className="w-32 text-sm" />
                </div>
                <button onClick={() => setLiabilities(prev => prev.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-red-400 px-1 text-lg">×</button>
              </div>
            ))}
            <button onClick={addLiability} className="text-xs text-red-400 hover:underline">+ Add liability</button>
          </div>

          <Button className="w-full" onClick={calcNetWorth}>Calculate Net Worth</Button>
          {nwResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-green-500/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Total Assets</p>
                <p className="font-mono text-lg font-bold text-green-400">{fmtCurrency(nwResult.totalAssets, currency, 0)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-red-500/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Total Liabilities</p>
                <p className="font-mono text-lg font-bold text-red-400">{fmtCurrency(nwResult.totalLiabilities, currency, 0)}</p>
              </div>
              <div className={`rounded-lg p-4 border text-center ${nwResult.netWorth >= 0 ? "border-primary/30 bg-background" : "border-red-500/30 bg-red-500/10"}`}>
                <p className="text-xs text-muted-foreground mb-1">Net Worth</p>
                <p className={`font-mono text-lg font-bold ${nwResult.netWorth >= 0 ? "text-primary" : "text-red-400"}`}>{fmtCurrency(nwResult.netWorth, currency, 0)}</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="fire" className="space-y-4 pt-4">
          <p className="text-xs text-muted-foreground">FIRE (Financial Independence, Retire Early) is based on the 4% safe withdrawal rule — your portfolio should be 25× your annual expenses.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Monthly Expenses ({currency.symbol})</Label>
              <Input type="number" value={fireExpenses} onChange={e => setFireExpenses(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Real Return (%)</Label>
              <Input type="number" value={fireReturn} onChange={e => setFireReturn(e.target.value)} step="0.5" />
            </div>
            <div className="space-y-1.5">
              <Label>Current Portfolio / Savings ({currency.symbol})</Label>
              <Input type="number" value={fireCurrentNw} onChange={e => setFireCurrentNw(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Monthly Savings / Investment ({currency.symbol})</Label>
              <Input type="number" value={fireSavings} onChange={e => setFireSavings(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcFIRE}>Calculate FIRE</Button>
          {fireResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">FIRE Number</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmtCurrency(fireResult.fireNumber, currency, 0)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Years to FIRE</p>
                <p className="font-mono text-xl font-bold text-primary">{fmt(fireResult.yearsToFire, 1)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Current Gap</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmtCurrency(fireResult.currentGap, currency, 0)}</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
