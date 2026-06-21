import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CurrencySelect } from "@/components/CurrencySelect";
import { DEFAULT_CURRENCY, fmtCurrency, type Currency } from "@/lib/currencies";

export default function ROICalculator() {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [initialInvestment, setInitialInvestment] = useState("10000");
  const [finalValue, setFinalValue] = useState("14500");
  const [years, setYears] = useState("3");
  const [result, setResult] = useState<{
    netProfit: number; roi: number; annualisedROI: number;
    breakEven: number; multiplier: number;
  } | null>(null);

  function fmt(n: number) { return fmtCurrency(n, currency); }
  function pct(n: number) { return n.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%"; }

  function calculate() {
    const cost = parseFloat(initialInvestment);
    const fv = parseFloat(finalValue);
    const yrs = parseFloat(years) || 1;
    if (isNaN(cost) || isNaN(fv) || cost <= 0) return;

    const netProfit = fv - cost;
    const roi = (netProfit / cost) * 100;
    const annualisedROI = (Math.pow(fv / cost, 1 / yrs) - 1) * 100;
    const breakEven = cost;
    const multiplier = fv / cost;

    setResult({ netProfit, roi, annualisedROI, breakEven, multiplier });
  }

  return (
    <CalculatorLayout
      title="ROI Calculator"
      description="Calculate return on investment (ROI), annualised ROI, net profit, investment multiplier and break-even point for any investment, project or business decision."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Select your currency</li>
          <li>Enter the initial investment cost</li>
          <li>Enter the final value (or expected return)</li>
          <li>Enter the holding period in years for annualised ROI</li>
          <li>Click Calculate</li>
        </ol>
      }
      testimonial="I use this ROI calculator to evaluate every business decision — from marketing campaigns to equipment purchases. Being able to see both the simple ROI and the annualised ROI side by side helps me compare investments with different time horizons fairly. The multiplier figure is especially useful for pitching to investors. Clear, fast and trustworthy."
    >
      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label>Currency</Label>
          <CurrencySelect value={currency} onChange={setCurrency} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Initial Investment ({currency.symbol})</Label>
            <Input type="number" value={initialInvestment} onChange={e => setInitialInvestment(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Final Value ({currency.symbol})</Label>
            <Input type="number" value={finalValue} onChange={e => setFinalValue(e.target.value)} />
          </div>
          <div className="space-y-1.5 col-span-2">
            <Label>Holding Period (years) — for annualised ROI</Label>
            <Input type="number" value={years} onChange={e => setYears(e.target.value)} min="0.1" step="0.5" />
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Calculate</Button>
          <Button variant="outline" onClick={() => setResult(null)}>Reset</Button>
        </div>

        {result && (
          <div className="rounded-xl border border-border bg-muted/30 overflow-hidden mt-2">
            <div className="px-5 py-3 border-b border-border">
              <h3 className="font-semibold text-foreground">ROI Results</h3>
            </div>
            <div className="divide-y divide-border">
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Net Profit / Loss</span>
                <span className={`font-semibold ${result.netProfit >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {result.netProfit >= 0 ? "+" : ""}{fmt(result.netProfit)}
                </span>
              </div>
              <div className="flex justify-between px-5 py-3 bg-primary/5">
                <span className="text-foreground font-medium text-sm">ROI</span>
                <span className={`font-bold text-lg ${result.roi >= 0 ? "text-primary" : "text-red-400"}`}>
                  {result.roi >= 0 ? "+" : ""}{pct(result.roi)}
                </span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Annualised ROI (CAGR)</span>
                <span className={`font-semibold ${result.annualisedROI >= 0 ? "text-amber-400" : "text-red-400"}`}>
                  {result.annualisedROI >= 0 ? "+" : ""}{pct(result.annualisedROI)}/yr
                </span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Investment Multiplier</span>
                <span className="font-semibold text-foreground">{result.multiplier.toFixed(2)}×</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Break-Even Point</span>
                <span className="font-semibold text-foreground">{fmt(result.breakEven)}</span>
              </div>
            </div>
            <div className="px-5 py-3 bg-muted/50 text-xs text-muted-foreground">
              Formula: ROI = (Net Profit ÷ Initial Investment) × 100 | CAGR = (Final ÷ Initial)^(1/years) − 1
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
