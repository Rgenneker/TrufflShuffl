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

const APPLIANCES = [
  { name: "Geyser (3 kW)", watts: 3000, defaultHours: 2 },
  { name: "Air Conditioner (2.5 kW)", watts: 2500, defaultHours: 4 },
  { name: "Pool Pump (1.5 kW)", watts: 1500, defaultHours: 8 },
  { name: "Electric Heater (2 kW)", watts: 2000, defaultHours: 4 },
  { name: "Washing Machine", watts: 500, defaultHours: 1 },
  { name: "Tumble Dryer", watts: 2500, defaultHours: 1 },
  { name: "Fridge (frost-free)", watts: 150, defaultHours: 24 },
  { name: "Oven / Stove", watts: 2000, defaultHours: 1 },
  { name: "Microwave", watts: 1200, defaultHours: 0.5 },
  { name: "TV (65\")", watts: 120, defaultHours: 5 },
  { name: "Desktop PC", watts: 200, defaultHours: 8 },
  { name: "LED Light (per bulb)", watts: 9, defaultHours: 5 },
];

export default function ElectricityCalculator() {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [tariff, setTariff] = useState("3.50");

  const [appHours, setAppHours] = useState<Record<string, string>>(
    Object.fromEntries(APPLIANCES.map(a => [a.name, String(a.defaultHours)]))
  );
  const [appResult, setAppResult] = useState<{ name: string; daily: number; monthly: number; cost: number }[] | null>(null);

  const [upsBat, setUpsBat] = useState("100");
  const [upsLoad, setUpsLoad] = useState("300");
  const [upsBatV, setUpsBatV] = useState("12");
  const [upsBatCount, setUpsBatCount] = useState("2");
  const [upsResult, setUpsResult] = useState<{ runtimeH: number; runtimeMin: number } | null>(null);

  const [geyserLitres, setGeyserLitres] = useState("200");
  const [geyserInlet, setGeyserInlet] = useState("15");
  const [geyserTarget, setGeyserTarget] = useState("60");
  const [geyserResult, setGeyserResult] = useState<{ kwh: number; cost: number; heatTime: number } | null>(null);

  function calcAppliances() {
    const results = APPLIANCES.map(a => {
      const h = Number(appHours[a.name] ?? a.defaultHours);
      const daily = (a.watts * h) / 1000;
      const monthly = daily * 30;
      const cost = monthly * Number(tariff);
      return { name: a.name, daily, monthly, cost };
    }).filter(r => r.daily > 0);
    setAppResult(results);
  }

  function calcUPS() {
    const batAh = Number(upsBat);
    const v = Number(upsBatV);
    const count = Number(upsBatCount);
    const loadW = Number(upsLoad);
    const totalWh = batAh * v * count * 0.8 * 0.9;
    const runtimeH = totalWh / loadW;
    setUpsResult({ runtimeH, runtimeMin: runtimeH * 60 });
  }

  function calcGeyser() {
    const litres = Number(geyserLitres);
    const deltaT = Number(geyserTarget) - Number(geyserInlet);
    const kwh = (litres * 4.186 * deltaT) / 3600;
    const cost = kwh * Number(tariff);
    const heatTime = kwh / 3;
    setGeyserResult({ kwh, cost, heatTime });
  }

  const totalMonthly = appResult ? appResult.reduce((s, r) => s + r.cost, 0) : 0;

  return (
    <CalculatorLayout
      guide={CALCULATOR_GUIDES['electricity']}
      title="Home Electricity Calculator"
      description="Calculate your appliance running costs, estimate UPS and battery backup runtime, and work out your geyser electricity usage."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Enter your Eskom or municipal tariff per kWh</li>
          <li>Appliance Cost: adjust hours per day for each appliance</li>
          <li>UPS Runtime: enter battery specs and connected load</li>
          <li>Geyser Cost: enter tank size and temperatures</li>
        </ol>
      }
      testimonial="My electricity bill was out of control and I had no idea where the money was going. This calculator made it brutally clear — my geyser was running R1 400 a month on its own, and the pool pump added another R900. I installed a geyser timer and solar geyser blanket, and moved the pool pump to off-peak hours. My bill dropped by over R2 000 the next month. The UPS tab helped me figure out exactly which appliances to drop during load shedding to extend my runtime — keeping only the router, a few lights and the fridge gets me nearly five hours from my 100 Ah battery. This is genuinely one of the most useful tools I've ever found."
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 space-y-1">
          <Label>Electricity Tariff ({currency.symbol}/kWh)</Label>
          <Input type="number" value={tariff} onChange={e => setTariff(e.target.value)} className="max-w-xs" />
        </div>
        <div className="pt-5">
          <CurrencySelect value={currency} onChange={setCurrency} />
        </div>
      </div>

      <Tabs defaultValue="appliances">
        <TabsList className="w-full">
          <TabsTrigger value="appliances" className="flex-1">Appliances</TabsTrigger>
          <TabsTrigger value="ups" className="flex-1">UPS / Battery</TabsTrigger>
          <TabsTrigger value="geyser" className="flex-1">Geyser</TabsTrigger>
        </TabsList>

        <TabsContent value="appliances" className="space-y-3 pt-4">
          <p className="text-xs text-muted-foreground">Adjust hours used per day for each appliance:</p>
          <div className="space-y-2">
            {APPLIANCES.map(a => (
              <div key={a.name} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground flex-1">{a.name}</span>
                <div className="flex items-center gap-1.5">
                  <Input type="number" value={appHours[a.name]} onChange={e => setAppHours(prev => ({ ...prev, [a.name]: e.target.value }))} className="w-20 text-sm" min="0" step="0.5" />
                  <span className="text-xs text-muted-foreground w-8">hrs</span>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full" onClick={calcAppliances}>Calculate Monthly Cost</Button>
          {appResult && (
            <div className="space-y-2">
              {appResult.sort((a, b) => b.cost - a.cost).map(r => (
                <div key={r.name} className="flex items-center justify-between bg-background rounded-lg px-3 py-2 border border-border">
                  <span className="text-sm text-muted-foreground">{r.name}</span>
                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-foreground">{fmtCurrency(r.cost, currency)}/mo</span>
                    <span className="text-xs text-muted-foreground ml-2">{fmt(r.monthly, 1)} kWh</span>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between bg-primary/10 rounded-lg px-3 py-3 border border-primary/30">
                <span className="font-semibold text-foreground">Total Monthly</span>
                <span className="font-mono text-lg font-bold text-primary">{fmtCurrency(totalMonthly, currency)}</span>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="ups" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Battery Capacity (Ah)</Label>
              <Input type="number" value={upsBat} onChange={e => setUpsBat(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Battery Voltage (V)</Label>
              <Input type="number" value={upsBatV} onChange={e => setUpsBatV(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Number of Batteries</Label>
              <Input type="number" value={upsBatCount} onChange={e => setUpsBatCount(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Connected Load (W)</Label>
              <Input type="number" value={upsLoad} onChange={e => setUpsLoad(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcUPS}>Calculate Runtime</Button>
          {upsResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Runtime</p>
                <p className="font-mono text-xl font-bold text-primary">{fmt(upsResult.runtimeH, 1)} hrs</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">In Minutes</p>
                <p className="font-mono text-xl font-bold text-foreground">{Math.round(upsResult.runtimeMin)} min</p>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">Assumes 80% depth of discharge and 90% inverter efficiency.</p>
        </TabsContent>

        <TabsContent value="geyser" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Geyser Size (litres)</Label>
              <Input type="number" value={geyserLitres} onChange={e => setGeyserLitres(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Inlet Water Temp (°C)</Label>
              <Input type="number" value={geyserInlet} onChange={e => setGeyserInlet(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Target Temp (°C)</Label>
              <Input type="number" value={geyserTarget} onChange={e => setGeyserTarget(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcGeyser}>Calculate</Button>
          {geyserResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Energy Used</p>
                <p className="font-mono text-lg font-bold text-primary">{fmt(geyserResult.kwh, 2)} kWh</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Cost per Heat</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmtCurrency(geyserResult.cost, currency)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Heat Time (3 kW)</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmt(geyserResult.heatTime, 1)} hrs</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
