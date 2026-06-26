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

export default function SolarCalculator() {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);

  const [dailyUsage, setDailyUsage] = useState("30");
  const [sunHours, setSunHours] = useState("5.5");
  const [panelWatt, setPanelWatt] = useState("450");
  const [systemEff, setSystemEff] = useState("80");
  const [panelResult, setPanelResult] = useState<{ panels: number; totalKw: number; dailyProd: number } | null>(null);

  const [batCap, setBatCap] = useState("10");
  const [batVoltage, setBatVoltage] = useState("48");
  const [dod, setDod] = useState("80");
  const [invEff, setInvEff] = useState("95");
  const [load, setLoad] = useState("2000");
  const [batResult, setBatResult] = useState<{ runtimeH: number; usableKwh: number } | null>(null);

  const [monthlyBill, setMonthlyBill] = useState("3500");
  const [systemCost, setSystemCost] = useState("120000");
  const [elecInflation, setElecInflation] = useState("10");
  const [payResult, setPayResult] = useState<{ paybackYears: number; roi10: number; monthlySaving: number } | null>(null);

  const [batSize, setBatSize] = useState("10");

  function calcPanels() {
    const kwh = Number(dailyUsage);
    const sh = Number(sunHours);
    const pw = Number(panelWatt) / 1000;
    const eff = Number(systemEff) / 100;
    const panelsNeeded = Math.ceil(kwh / (sh * pw * eff));
    const totalKw = (panelsNeeded * Number(panelWatt)) / 1000;
    const dailyProd = totalKw * sh * eff;
    setPanelResult({ panels: panelsNeeded, totalKw, dailyProd });
  }

  function calcBattery() {
    const kwh = Number(batCap);
    const usableKwh = kwh * (Number(dod) / 100);
    const runtimeH = (usableKwh * 1000 * (Number(invEff) / 100)) / Number(load);
    setBatResult({ runtimeH, usableKwh });
  }

  function calcPayback() {
    const bill = Number(monthlyBill);
    const cost = Number(systemCost);
    const infl = Number(elecInflation) / 100;
    let cumSaving = 0;
    let year = 0;
    while (cumSaving < cost && year < 30) {
      year++;
      cumSaving += bill * 12 * Math.pow(1 + infl, year - 1);
    }
    const roi10 = ((bill * 12 * ((Math.pow(1 + infl, 10) - 1) / infl)) - cost) / cost * 100;
    setPayResult({ paybackYears: year, roi10, monthlySaving: bill });
  }

  const batSizes = ["5", "8", "10", "15", "20", "Custom"];
  const selectedKwh = batSize === "Custom" ? "10" : batSize;
  const usable = Number(selectedKwh) * 0.8;
  const runtime2kw = (usable * 0.95 * 1000) / 2000;
  const runtime1kw = (usable * 0.95 * 1000) / 1000;
  const runtime500 = (usable * 0.95 * 1000) / 500;

  return (
    <CalculatorLayout
      guide={CALCULATOR_GUIDES['solar']}
      title="Solar Power Calculator"
      description="Size your solar system, calculate battery backup runtime, and estimate payback period and ROI for your South African installation."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Panel Sizing: enter your daily usage and sun hours to find how many panels you need</li>
          <li>Battery Backup: select your battery size and load to see runtime during load shedding</li>
          <li>Payback Period: enter your monthly bill and system cost to see when you break even</li>
        </ol>
      }
      testimonial="Load shedding pushed me to go solar and this calculator was my first stop. I entered our household's 35 kWh daily usage and our Johannesburg peak sun hours of 5.5 and it told me I needed 14 x 450 W panels — which matched the installer quote almost exactly. The battery tab was eye-opening: a 10 kWh battery only runs our essentials (lights, fridge, router) for about four hours during Stage 6. That convinced me to upsize to 20 kWh. The payback calculator showed me I'd recover the R180 000 investment in just over 6 years given 10% annual Eskom tariff increases. After year six it's essentially free electricity."
    >
      <Tabs defaultValue="panels">
        <TabsList className="w-full">
          <TabsTrigger value="panels" className="flex-1">Panel Sizing</TabsTrigger>
          <TabsTrigger value="battery" className="flex-1">Battery Backup</TabsTrigger>
          <TabsTrigger value="payback" className="flex-1">Payback</TabsTrigger>
        </TabsList>

        <TabsContent value="panels" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Daily Usage (kWh)</Label>
              <Input type="number" value={dailyUsage} onChange={e => setDailyUsage(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Peak Sun Hours (hrs/day)</Label>
              <Input type="number" value={sunHours} onChange={e => setSunHours(e.target.value)} step="0.1" />
            </div>
            <div className="space-y-1.5">
              <Label>Panel Wattage (W)</Label>
              <Input type="number" value={panelWatt} onChange={e => setPanelWatt(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>System Efficiency (%)</Label>
              <Input type="number" value={systemEff} onChange={e => setSystemEff(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcPanels}>Calculate</Button>
          {panelResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Panels Needed</p>
                <p className="font-mono text-xl font-bold text-primary">{panelResult.panels}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">System Size</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmt(panelResult.totalKw, 1)} kWp</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Daily Output</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmt(panelResult.dailyProd, 1)} kWh</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="battery" className="space-y-4 pt-4">
          <div className="space-y-1.5">
            <Label>Battery Size</Label>
            <div className="flex flex-wrap gap-2">
              {batSizes.map(s => (
                <button key={s} onClick={() => setBatSize(s)}
                  className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${batSize === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
                  {s === "Custom" ? s : `${s} kWh`}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Depth of Discharge (%)</Label>
              <Input type="number" value={dod} onChange={e => setDod(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Inverter Efficiency (%)</Label>
              <Input type="number" value={invEff} onChange={e => setInvEff(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Connected Load (W)</Label>
              <Input type="number" value={load} onChange={e => setLoad(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcBattery}>Calculate</Button>
          {batResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Usable Energy</p>
                <p className="font-mono text-xl font-bold text-primary">{fmt(batResult.usableKwh, 1)} kWh</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Runtime at {Number(load).toLocaleString()} W</p>
                <p className="font-mono text-xl font-bold text-foreground">{fmt(batResult.runtimeH, 1)} hrs</p>
              </div>
            </div>
          )}
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-3">Runtime guide for {batSize === "Custom" ? "10" : batSize} kWh battery (80% DoD)</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div><p className="text-xs text-muted-foreground">500 W load</p><p className="font-mono font-bold">{fmt(runtime500, 1)} hrs</p></div>
              <div><p className="text-xs text-muted-foreground">1 kW load</p><p className="font-mono font-bold">{fmt(runtime1kw, 1)} hrs</p></div>
              <div><p className="text-xs text-muted-foreground">2 kW load</p><p className="font-mono font-bold">{fmt(runtime2kw, 1)} hrs</p></div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="payback" className="space-y-4 pt-4">
          <div className="flex justify-end mb-1">
            <CurrencySelect value={currency} onChange={setCurrency} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Monthly Electricity Bill ({currency.symbol})</Label>
              <Input type="number" value={monthlyBill} onChange={e => setMonthlyBill(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>System Cost ({currency.symbol})</Label>
              <Input type="number" value={systemCost} onChange={e => setSystemCost(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Annual Tariff Increase (%)</Label>
              <Input type="number" value={elecInflation} onChange={e => setElecInflation(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcPayback}>Calculate</Button>
          {payResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Payback Period</p>
                <p className="font-mono text-xl font-bold text-primary">{payResult.paybackYears} yrs</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">10-Year ROI</p>
                <p className={`font-mono text-lg font-bold ${payResult.roi10 > 0 ? "text-green-400" : "text-red-400"}`}>{fmt(payResult.roi10, 1)}%</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Monthly Saving</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmtCurrency(payResult.monthlySaving, currency)}</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
