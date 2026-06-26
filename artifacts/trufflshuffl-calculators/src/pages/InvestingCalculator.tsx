import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrencySelect } from "@/components/CurrencySelect";
import { DEFAULT_CURRENCY, fmtCurrency, type Currency } from "@/lib/currencies";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";

function fmt(n: number, dec = 2) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export default function InvestingCalculator() {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);

  const [dcaMonthly, setDcaMonthly] = useState("2000");
  const [dcaYears, setDcaYears] = useState("10");
  const [dcaReturn, setDcaReturn] = useState("12");
  const [dcaResult, setDcaResult] = useState<{ futureValue: number; totalInvested: number; gains: number; schedule: { year: number; value: number }[] } | null>(null);

  const [cagrStart, setCagrStart] = useState("50000");
  const [cagrEnd, setCagrEnd] = useState("150000");
  const [cagrYears, setCagrYears] = useState("7");
  const [cagrResult, setCagrResult] = useState<{ cagr: number; totalReturn: number } | null>(null);

  const [divPortfolio, setDivPortfolio] = useState("500000");
  const [divYield, setDivYield] = useState("4");
  const [divGrowth, setDivGrowth] = useState("5");
  const [divYears, setDivYears] = useState("10");
  const [divResult, setDivResult] = useState<{ yearOneDividend: number; yearTenDividend: number; totalDividends: number } | null>(null);

  function calcDCA() {
    const monthly = Number(dcaMonthly);
    const rate = Number(dcaReturn) / 100 / 12;
    const months = Number(dcaYears) * 12;
    const futureValue = monthly * ((Math.pow(1 + rate, months) - 1) / rate);
    const totalInvested = monthly * months;
    const gains = futureValue - totalInvested;
    const schedule = Array.from({ length: Number(dcaYears) }, (_, i) => {
      const m = (i + 1) * 12;
      const v = monthly * ((Math.pow(1 + rate, m) - 1) / rate);
      return { year: i + 1, value: v };
    });
    setDcaResult({ futureValue, totalInvested, gains, schedule });
  }

  function calcCAGR() {
    const start = Number(cagrStart);
    const end = Number(cagrEnd);
    const years = Number(cagrYears);
    const cagr = (Math.pow(end / start, 1 / years) - 1) * 100;
    const totalReturn = ((end - start) / start) * 100;
    setCagrResult({ cagr, totalReturn });
  }

  function calcDividends() {
    const portfolio = Number(divPortfolio);
    const yieldPct = Number(divYield) / 100;
    const growth = Number(divGrowth) / 100;
    const years = Number(divYears);
    const yearOneDividend = portfolio * yieldPct;
    let total = 0;
    for (let i = 0; i < years; i++) {
      total += yearOneDividend * Math.pow(1 + growth, i);
    }
    const yearTenDividend = yearOneDividend * Math.pow(1 + growth, years - 1);
    setDivResult({ yearOneDividend, yearTenDividend, totalDividends: total });
  }

  return (
    <CalculatorLayout
      guide={CALCULATOR_GUIDES['investing']}
      title="Investing Calculator"
      description="Model dollar-cost averaging growth over time, calculate CAGR for any investment, and project dividend income from a share portfolio."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>DCA: enter monthly contribution, years and expected return to see portfolio growth</li>
          <li>CAGR: enter start and end values and time period to calculate compound annual growth rate</li>
          <li>Dividends: enter portfolio value, yield and dividend growth to project income over time</li>
        </ol>
      }
      testimonial="I started investing on the JSE three years ago and this calculator helped me understand the power of consistency. The DCA tab showed me that contributing R2 000 a month at a 12% annual return over 20 years turns R480 000 of contributions into R1.97 million — the compounding is staggering. The CAGR calculator helped me evaluate my existing portfolio: entering my unit trust's five-year performance showed me a true CAGR of 9.4%, which compared favourably against the ETF benchmark I was considering switching to. The dividend tab is perfect for REIT and dividend ETF planning — I entered my planned R800 000 portfolio at a 6% yield and 4% dividend growth and can see exactly what passive income I'll be drawing in 10 years. This is essential kit for any self-directed investor."
    >
      <div className="flex justify-end mb-2">
        <CurrencySelect value={currency} onChange={setCurrency} />
      </div>
      <Tabs defaultValue="dca">
        <TabsList className="w-full">
          <TabsTrigger value="dca" className="flex-1">Dollar Cost Avg</TabsTrigger>
          <TabsTrigger value="cagr" className="flex-1">CAGR</TabsTrigger>
          <TabsTrigger value="dividends" className="flex-1">Dividends</TabsTrigger>
        </TabsList>

        <TabsContent value="dca" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Monthly Investment ({currency.symbol})</Label>
              <Input type="number" value={dcaMonthly} onChange={e => setDcaMonthly(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Investment Period (years)</Label>
              <Input type="number" value={dcaYears} onChange={e => setDcaYears(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Annual Return (%)</Label>
              <Input type="number" value={dcaReturn} onChange={e => setDcaReturn(e.target.value)} step="0.5" />
            </div>
          </div>
          <Button className="w-full" onClick={calcDCA}>Calculate</Button>
          {dcaResult && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Final Value</p>
                  <p className="font-mono text-xl font-bold text-primary">{fmtCurrency(dcaResult.futureValue, currency, 0)}</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Invested</p>
                  <p className="font-mono text-xl font-bold text-foreground">{fmtCurrency(dcaResult.totalInvested, currency, 0)}</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Investment Gains</p>
                  <p className="font-mono text-xl font-bold text-green-400">{fmtCurrency(dcaResult.gains, currency, 0)}</p>
                </div>
              </div>
              <div className="space-y-1">
                {dcaResult.schedule.filter((_, i) => i % Math.max(1, Math.floor(dcaResult.schedule.length / 8)) === 0 || i === dcaResult.schedule.length - 1).map(r => (
                  <div key={r.year} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Year {r.year}</span>
                    <span className="font-mono font-bold">{fmtCurrency(r.value, currency, 0)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="cagr" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Starting Value ({currency.symbol})</Label>
              <Input type="number" value={cagrStart} onChange={e => setCagrStart(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Ending Value ({currency.symbol})</Label>
              <Input type="number" value={cagrEnd} onChange={e => setCagrEnd(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Years</Label>
              <Input type="number" value={cagrYears} onChange={e => setCagrYears(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcCAGR}>Calculate CAGR</Button>
          {cagrResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">CAGR</p>
                <p className={`font-mono text-3xl font-bold ${cagrResult.cagr >= 0 ? "text-primary" : "text-red-400"}`}>{fmt(cagrResult.cagr, 2)}%</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Total Return</p>
                <p className={`font-mono text-3xl font-bold ${cagrResult.totalReturn >= 0 ? "text-foreground" : "text-red-400"}`}>{fmt(cagrResult.totalReturn, 1)}%</p>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">JSE All Share CAGR (20 years to 2024): approximately 12–14% in ZAR. SA inflation average: approximately 5–6%.</p>
        </TabsContent>

        <TabsContent value="dividends" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Portfolio Value ({currency.symbol})</Label>
              <Input type="number" value={divPortfolio} onChange={e => setDivPortfolio(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Dividend Yield (%)</Label>
              <Input type="number" value={divYield} onChange={e => setDivYield(e.target.value)} step="0.25" />
            </div>
            <div className="space-y-1.5">
              <Label>Annual Dividend Growth (%)</Label>
              <Input type="number" value={divGrowth} onChange={e => setDivGrowth(e.target.value)} step="0.5" />
            </div>
            <div className="space-y-1.5">
              <Label>Projection Period (years)</Label>
              <Input type="number" value={divYears} onChange={e => setDivYears(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcDividends}>Project Dividends</Button>
          {divResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Year 1 Dividend</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmtCurrency(divResult.yearOneDividend, currency, 0)}</p>
                <p className="text-xs text-muted-foreground">{fmtCurrency(divResult.yearOneDividend / 12, currency, 0)}/mo</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Year {divYears} Dividend</p>
                <p className="font-mono text-lg font-bold text-primary">{fmtCurrency(divResult.yearTenDividend, currency, 0)}</p>
                <p className="text-xs text-muted-foreground">{fmtCurrency(divResult.yearTenDividend / 12, currency, 0)}/mo</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Total Dividends</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmtCurrency(divResult.totalDividends, currency, 0)}</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
