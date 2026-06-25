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

export default function BusinessToolsCalculator() {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);

  const [revenue, setRevenue] = useState("500000");
  const [cogs, setCogs] = useState("300000");
  const [expenses, setExpenses] = useState("100000");
  const [profitResult, setProfitResult] = useState<{ grossProfit: number; grossMargin: number; netProfit: number; netMargin: number; markup: number } | null>(null);

  const [fixedCosts, setFixedCosts] = useState("80000");
  const [salePrice, setSalePrice] = useState("500");
  const [varCost, setVarCost] = useState("200");
  const [beResult, setBeResult] = useState<{ units: number; revenue: number; contributionMargin: number } | null>(null);

  const [saleAmount, setSaleAmount] = useState("50000");
  const [commRate, setCommRate] = useState("10");
  const [commResult, setCommResult] = useState<{ flat: number } | null>(null);

  function calcProfit() {
    const rev = Number(revenue);
    const c = Number(cogs);
    const exp = Number(expenses);
    const grossProfit = rev - c;
    const grossMargin = (grossProfit / rev) * 100;
    const netProfit = grossProfit - exp;
    const netMargin = (netProfit / rev) * 100;
    const markup = (grossProfit / c) * 100;
    setProfitResult({ grossProfit, grossMargin, netProfit, netMargin, markup });
  }

  function calcBreakEven() {
    const fc = Number(fixedCosts);
    const sp = Number(salePrice);
    const vc = Number(varCost);
    const contributionMargin = sp - vc;
    const units = Math.ceil(fc / contributionMargin);
    const rev = units * sp;
    setBeResult({ units, revenue: rev, contributionMargin });
  }

  function calcComm() {
    const flat = Number(saleAmount) * (Number(commRate) / 100);
    setCommResult({ flat });
  }

  return (
    <CalculatorLayout
      title="Business Tools Calculator"
      description="Calculate gross and net profit margins, find your break-even point, and work out sales commission — essential tools for any South African business owner."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Profit Margin: enter revenue, cost of goods and operating expenses</li>
          <li>Break-even: enter fixed costs, selling price and variable cost per unit</li>
          <li>Commission: enter sale amount and commission rate for quick commission calculations</li>
        </ol>
      }
      testimonial="I run a small manufacturing business in Durban and these tools save me hours every month. The profit margin tab gives me an instant read on whether a job is worth taking — if the gross margin is below 35% on a custom order I know my pricing is too low. The break-even calculator helped me understand that with R80 000 in monthly fixed costs and a contribution margin of R300 per unit, I need to sell 267 units just to cover my overheads before making a cent of profit. That insight changed how I set sales targets for my team. The commission tab is something my sales reps use themselves to calculate their earnings on big quotes — it builds trust and transparency. Simple, fast, and exactly what a small business owner needs."
    >
      <div className="flex justify-end mb-2">
        <CurrencySelect value={currency} onChange={setCurrency} />
      </div>
      <Tabs defaultValue="profit">
        <TabsList className="w-full">
          <TabsTrigger value="profit" className="flex-1">Profit Margin</TabsTrigger>
          <TabsTrigger value="breakeven" className="flex-1">Break-even</TabsTrigger>
          <TabsTrigger value="commission" className="flex-1">Commission</TabsTrigger>
        </TabsList>

        <TabsContent value="profit" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Revenue ({currency.symbol})</Label>
              <Input type="number" value={revenue} onChange={e => setRevenue(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Cost of Goods Sold ({currency.symbol})</Label>
              <Input type="number" value={cogs} onChange={e => setCogs(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Operating Expenses ({currency.symbol})</Label>
              <Input type="number" value={expenses} onChange={e => setExpenses(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcProfit}>Calculate</Button>
          {profitResult && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background rounded-lg p-4 border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Gross Profit</p>
                  <p className="font-mono text-xl font-bold text-foreground">{fmtCurrency(profitResult.grossProfit, currency, 0)}</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Gross Margin</p>
                  <p className={`font-mono text-xl font-bold ${profitResult.grossMargin > 30 ? "text-green-400" : "text-yellow-400"}`}>{fmt(profitResult.grossMargin, 1)}%</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Net Profit</p>
                  <p className={`font-mono text-xl font-bold ${profitResult.netProfit > 0 ? "text-primary" : "text-red-400"}`}>{fmtCurrency(profitResult.netProfit, currency, 0)}</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Net Margin</p>
                  <p className={`font-mono text-xl font-bold ${profitResult.netMargin > 0 ? "text-primary" : "text-red-400"}`}>{fmt(profitResult.netMargin, 1)}%</p>
                </div>
              </div>
              <div className="bg-background rounded-lg p-3 border border-border text-center">
                <p className="text-xs text-muted-foreground">Markup on Cost</p>
                <p className="font-mono font-bold text-lg">{fmt(profitResult.markup, 1)}%</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="breakeven" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Fixed Costs / Month ({currency.symbol})</Label>
              <Input type="number" value={fixedCosts} onChange={e => setFixedCosts(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Selling Price per Unit ({currency.symbol})</Label>
              <Input type="number" value={salePrice} onChange={e => setSalePrice(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Variable Cost per Unit ({currency.symbol})</Label>
              <Input type="number" value={varCost} onChange={e => setVarCost(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcBreakEven}>Calculate Break-even</Button>
          {beResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Break-even Units</p>
                <p className="font-mono text-xl font-bold text-primary">{fmt(beResult.units, 0)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Break-even Revenue</p>
                <p className="font-mono text-xl font-bold text-foreground">{fmtCurrency(beResult.revenue, currency, 0)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Contribution Margin</p>
                <p className="font-mono text-xl font-bold text-foreground">{fmtCurrency(beResult.contributionMargin, currency)}</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="commission" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Sale Amount ({currency.symbol})</Label>
              <Input type="number" value={saleAmount} onChange={e => setSaleAmount(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Commission Rate (%)</Label>
              <Input type="number" value={commRate} onChange={e => setCommRate(e.target.value)} step="0.5" />
            </div>
          </div>
          <Button className="w-full" onClick={calcComm}>Calculate Commission</Button>
          {commResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Commission Earned</p>
                <p className="font-mono text-3xl font-bold text-primary">{fmtCurrency(commResult.flat, currency)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Net to Business</p>
                <p className="font-mono text-3xl font-bold text-foreground">{fmtCurrency(Number(saleAmount) - commResult.flat, currency)}</p>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">Remember to account for VAT, income tax and PAYE on commission payments. Consult your accountant for SARS compliance.</p>
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
