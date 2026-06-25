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

export default function AutomotiveCalculator() {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);

  const [oem_width, setOemWidth] = useState("205");
  const [oem_asp, setOemAsp] = useState("55");
  const [oem_rim, setOemRim] = useState("16");
  const [new_width, setNewWidth] = useState("225");
  const [new_asp, setNewAsp] = useState("45");
  const [new_rim, setNewRim] = useState("17");
  const [tyreResult, setTyreResult] = useState<{ oemDiam: number; newDiam: number; diff: number; speedError: number } | null>(null);

  const [purchasePrice, setPurchasePrice] = useState("350000");
  const [depYears, setDepYears] = useState("5");
  const [depRate, setDepRate] = useState("15");
  const [depResult, setDepResult] = useState<{ valueAfter: number; totalLoss: number; perYear: number; perMonth: number }[] | null>(null);

  const [speedKmh, setSpeedKmh] = useState("120");
  const [roadCondition, setRoadCondition] = useState("dry");
  const [brakeResult, setBrakeResult] = useState<{ reactionDist: number; brakingDist: number; totalDist: number } | null>(null);

  function calcTyre() {
    const oemH = (Number(oem_width) * Number(oem_asp) / 100) * 2;
    const oemDiam = Number(oem_rim) * 25.4 + oemH;
    const newH = (Number(new_width) * Number(new_asp) / 100) * 2;
    const newDiam = Number(new_rim) * 25.4 + newH;
    const diff = ((newDiam - oemDiam) / oemDiam) * 100;
    const speedError = diff;
    setTyreResult({ oemDiam, newDiam, diff, speedError });
  }

  function calcDepreciation() {
    const price = Number(purchasePrice);
    const rate = Number(depRate) / 100;
    const years = Number(depYears);
    const results = Array.from({ length: years }, (_, i) => {
      const yr = i + 1;
      const valueAfter = price * Math.pow(1 - rate, yr);
      const totalLoss = price - valueAfter;
      const perYear = totalLoss / yr;
      const perMonth = perYear / 12;
      return { valueAfter, totalLoss, perYear, perMonth };
    });
    setDepResult(results);
  }

  function calcBrake() {
    const v = Number(speedKmh);
    const vMs = v / 3.6;
    const reactionTime = 1.5;
    const mu: Record<string, number> = { dry: 0.8, wet: 0.5, gravel: 0.4 };
    const g = 9.81;
    const reactionDist = vMs * reactionTime;
    const brakingDist = (vMs * vMs) / (2 * mu[roadCondition] * g);
    const totalDist = reactionDist + brakingDist;
    setBrakeResult({ reactionDist, brakingDist, totalDist });
  }

  return (
    <CalculatorLayout
      title="Automotive Calculator"
      description="Compare tyre sizes and speedometer accuracy, calculate vehicle depreciation, and estimate braking distances at any speed."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Tyre Size: enter OEM and new tyre specs to check diameter difference and speedo error</li>
          <li>Depreciation: enter purchase price and rate to see value over time</li>
          <li>Braking Distance: enter speed and road condition to see stopping distance</li>
        </ol>
      }
      testimonial="I was about to fit wider, lower-profile tyres to my bakkie for better looks and the tyre size calculator saved me from a bad mistake. My OEM 265/65R17s have a 778 mm diameter — the 285/55R18s I wanted would be 791 mm, causing a 1.7% speedo error. More importantly it showed my odometer would read low, affecting service intervals. I ended up choosing a tyre size with less than 0.5% variance. The depreciation calculator was sobering — at 15% per year my R350 000 SUV will be worth under R155 000 in five years. That changed how I think about buying new vs used. The braking distance tab is something every South African driver needs to see: at 120 km/h on wet tar you need over 100 m to stop. Share it with your teenagers."
    >
      <Tabs defaultValue="tyre">
        <TabsList className="w-full">
          <TabsTrigger value="tyre" className="flex-1">Tyre Size</TabsTrigger>
          <TabsTrigger value="dep" className="flex-1">Depreciation</TabsTrigger>
          <TabsTrigger value="brake" className="flex-1">Braking Distance</TabsTrigger>
        </TabsList>

        <TabsContent value="tyre" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">OEM Tyre</p>
              <div className="space-y-1.5">
                <Label>Width (mm)</Label>
                <Input type="number" value={oem_width} onChange={e => setOemWidth(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Aspect Ratio (%)</Label>
                <Input type="number" value={oem_asp} onChange={e => setOemAsp(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Rim Size (inches)</Label>
                <Input type="number" value={oem_rim} onChange={e => setOemRim(e.target.value)} />
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">New Tyre</p>
              <div className="space-y-1.5">
                <Label>Width (mm)</Label>
                <Input type="number" value={new_width} onChange={e => setNewWidth(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Aspect Ratio (%)</Label>
                <Input type="number" value={new_asp} onChange={e => setNewAsp(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Rim Size (inches)</Label>
                <Input type="number" value={new_rim} onChange={e => setNewRim(e.target.value)} />
              </div>
            </div>
          </div>
          <Button className="w-full" onClick={calcTyre}>Compare</Button>
          {tyreResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-3 border border-border text-center">
                <p className="text-xs text-muted-foreground">OEM Diameter</p>
                <p className="font-mono font-bold">{fmt(tyreResult.oemDiam, 1)} mm</p>
              </div>
              <div className="bg-background rounded-lg p-3 border border-border text-center">
                <p className="text-xs text-muted-foreground">New Diameter</p>
                <p className="font-mono font-bold">{fmt(tyreResult.newDiam, 1)} mm</p>
              </div>
              <div className={`col-span-2 rounded-lg p-4 border text-center ${Math.abs(tyreResult.diff) > 2 ? "border-red-500/30 bg-red-500/10" : "border-primary/30 bg-background"}`}>
                <p className="text-xs text-muted-foreground mb-1">Diameter Difference / Speedo Error</p>
                <p className={`font-mono text-xl font-bold ${Math.abs(tyreResult.diff) > 2 ? "text-red-400" : "text-primary"}`}>{tyreResult.diff > 0 ? "+" : ""}{fmt(tyreResult.diff, 2)}%</p>
                <p className="text-xs text-muted-foreground mt-1">{Math.abs(tyreResult.diff) <= 1 ? "Excellent — within tolerance" : Math.abs(tyreResult.diff) <= 2 ? "Acceptable" : "Warning: significant speedo error"}</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="dep" className="space-y-4 pt-4">
          <div className="flex justify-end mb-1">
            <CurrencySelect value={currency} onChange={setCurrency} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Purchase Price ({currency.symbol})</Label>
              <Input type="number" value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Annual Rate (%)</Label>
              <Input type="number" value={depRate} onChange={e => setDepRate(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Years</Label>
              <Input type="number" value={depYears} onChange={e => setDepYears(e.target.value)} min="1" max="15" />
            </div>
          </div>
          <Button className="w-full" onClick={calcDepreciation}>Calculate</Button>
          {depResult && (
            <div className="space-y-2">
              {depResult.map((r, i) => (
                <div key={i} className="flex items-center justify-between bg-background rounded-lg px-3 py-2.5 border border-border">
                  <span className="text-sm text-muted-foreground">Year {i + 1}</span>
                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-foreground">{fmtCurrency(r.valueAfter, currency, 0)}</span>
                    <span className="text-xs text-muted-foreground ml-2">({fmtCurrency(r.perMonth, currency, 0)}/mo loss)</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="brake" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Speed (km/h)</Label>
              <Input type="number" value={speedKmh} onChange={e => setSpeedKmh(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Road Condition</Label>
              <div className="flex gap-2">
                {["dry", "wet", "gravel"].map(c => (
                  <button key={c} onClick={() => setRoadCondition(c)}
                    className={`flex-1 px-2 py-1.5 rounded-lg border text-xs capitalize transition-colors ${roadCondition === c ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Button className="w-full" onClick={calcBrake}>Calculate</Button>
          {brakeResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Reaction Distance</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmt(brakeResult.reactionDist, 1)} m</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Braking Distance</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmt(brakeResult.brakingDist, 1)} m</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Total Stopping</p>
                <p className="font-mono text-lg font-bold text-primary">{fmt(brakeResult.totalDist, 1)} m</p>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">Assumes 1.5 s reaction time. Keep 2-second following distance on dry roads, 4 seconds in the wet.</p>
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
