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

export default function EVCalculator() {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);

  const [batteryKwh, setBatteryKwh] = useState("60");
  const [pricePerKwh, setPricePerKwh] = useState("3.50");
  const [chargeFrom, setChargeFrom] = useState("20");
  const [chargeTo, setChargeTo] = useState("80");
  const [chargeResult, setChargeResult] = useState<{ cost: number; kwh: number; time95kw: number; time22kw: number; time7kw: number } | null>(null);

  const [kmRange, setKmRange] = useState("400");
  const [consumptionKwh, setConsumptionKwh] = useState("18");
  const [elecPrice, setElecPrice] = useState("3.50");
  const [perKmResult, setPerKmResult] = useState<{ costPerKm: number; costPer100: number } | null>(null);

  const [iceKmYear, setIceKmYear] = useState("20000");
  const [iceLper100, setIceLper100] = useState("9");
  const [iceFuelPrice, setIceFuelPrice] = useState("23.00");
  const [evKwhPer100, setEvKwhPer100] = useState("18");
  const [evElecPrice, setEvElecPrice] = useState("3.50");
  const [compareResult, setCompareResult] = useState<{ iceCost: number; evCost: number; saving: number; breakEvenYears: number } | null>(null);
  const [evPremium, setEvPremium] = useState("200000");

  function calcCharge() {
    const cap = Number(batteryKwh);
    const price = Number(pricePerKwh);
    const pct = (Number(chargeTo) - Number(chargeFrom)) / 100;
    const kwh = cap * pct;
    const cost = kwh * price;
    const time95kw = kwh / 95;
    const time22kw = kwh / 22;
    const time7kw = kwh / 7;
    setChargeResult({ cost, kwh, time95kw, time22kw, time7kw });
  }

  function calcPerKm() {
    const kwh100 = Number(consumptionKwh);
    const price = Number(elecPrice);
    const costPer100 = kwh100 * price;
    const costPerKm = costPer100 / 100;
    setPerKmResult({ costPerKm, costPer100 });
  }

  function calcCompare() {
    const km = Number(iceKmYear);
    const iceCost = (km / 100) * Number(iceLper100) * Number(iceFuelPrice);
    const evCost = (km / 100) * Number(evKwhPer100) * Number(evElecPrice);
    const saving = iceCost - evCost;
    const premium = Number(evPremium);
    const breakEvenYears = saving > 0 ? premium / saving : Infinity;
    setCompareResult({ iceCost, evCost, saving, breakEvenYears });
  }

  return (
    <CalculatorLayout
      guide={CALCULATOR_GUIDES['ev']}
      title="Electric Vehicle Calculator"
      description="Calculate EV charging costs, cost per kilometre, and compare running costs against a petrol or diesel vehicle."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Use Charging Cost to estimate what a full charge costs at home or public rates</li>
          <li>Cost per km shows your real electricity cost per kilometre driven</li>
          <li>ICE vs EV compares annual running costs and calculates your break-even point</li>
        </ol>
      }
      testimonial="I was on the fence about switching to an EV until I used this calculator. I drive 25 000 km a year in Gauteng — my Golf uses about 8.5 L/100km at current petrol prices and that was costing me over R50 000 a year just in fuel. After plugging in my prospective EV's 17 kWh/100km at my home Eskom rate, I realised I'd be paying under R15 000 a year in electricity. The break-even on the premium I'd pay for the EV was under four years, and after that it's pure savings. The charging time tab helped me plan around load shedding and public DC fast chargers on the N1 to Cape Town. I've now put down a deposit."
    >
      <div className="flex justify-end mb-2">
        <CurrencySelect value={currency} onChange={setCurrency} />
      </div>
      <Tabs defaultValue="charge">
        <TabsList className="w-full">
          <TabsTrigger value="charge" className="flex-1">Charging Cost</TabsTrigger>
          <TabsTrigger value="perkm" className="flex-1">Cost per km</TabsTrigger>
          <TabsTrigger value="compare" className="flex-1">ICE vs EV</TabsTrigger>
        </TabsList>

        <TabsContent value="charge" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Battery Capacity (kWh)</Label>
              <Input type="number" value={batteryKwh} onChange={e => setBatteryKwh(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Price per kWh ({currency.symbol})</Label>
              <Input type="number" value={pricePerKwh} onChange={e => setPricePerKwh(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Charge from (%)</Label>
              <Input type="number" value={chargeFrom} onChange={e => setChargeFrom(e.target.value)} min="0" max="100" />
            </div>
            <div className="space-y-1.5">
              <Label>Charge to (%)</Label>
              <Input type="number" value={chargeTo} onChange={e => setChargeTo(e.target.value)} min="0" max="100" />
            </div>
          </div>
          <Button className="w-full" onClick={calcCharge}>Calculate</Button>
          {chargeResult && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Energy Added</p>
                  <p className="font-mono text-lg font-bold text-primary">{fmt(chargeResult.kwh, 1)} kWh</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Charge Cost</p>
                  <p className="font-mono text-lg font-bold text-foreground">{fmtCurrency(chargeResult.cost, currency)}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-semibold">Estimated Charge Time:</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "7 kW (Home)", h: chargeResult.time7kw },
                  { label: "22 kW (AC)", h: chargeResult.time22kw },
                  { label: "95 kW (DC Fast)", h: chargeResult.time95kw },
                ].map(r => (
                  <div key={r.label} className="bg-background rounded-lg p-3 border border-border text-center">
                    <p className="text-xs text-muted-foreground">{r.label}</p>
                    <p className="font-mono font-bold text-foreground text-sm">{fmt(r.h, 1)} h</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="perkm" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 col-span-2">
              <Label>Consumption (kWh per 100 km)</Label>
              <Input type="number" value={consumptionKwh} onChange={e => setConsumptionKwh(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Electricity Price ({currency.symbol}/kWh)</Label>
              <Input type="number" value={elecPrice} onChange={e => setElecPrice(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Annual km</Label>
              <Input type="number" value={kmRange} onChange={e => setKmRange(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcPerKm}>Calculate</Button>
          {perKmResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Per km</p>
                <p className="font-mono text-lg font-bold text-primary">{fmtCurrency(perKmResult.costPerKm, currency, 3)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Per 100 km</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmtCurrency(perKmResult.costPer100, currency)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Annual Cost</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmtCurrency(perKmResult.costPerKm * Number(kmRange), currency)}</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="compare" className="space-y-4 pt-4">
          <p className="text-xs text-muted-foreground">Petrol / Diesel Vehicle</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Annual km</Label>
              <Input type="number" value={iceKmYear} onChange={e => setIceKmYear(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>L/100 km</Label>
              <Input type="number" value={iceLper100} onChange={e => setIceLper100(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Fuel Price ({currency.symbol}/L)</Label>
              <Input type="number" value={iceFuelPrice} onChange={e => setIceFuelPrice(e.target.value)} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Electric Vehicle</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>kWh/100 km</Label>
              <Input type="number" value={evKwhPer100} onChange={e => setEvKwhPer100(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Elec Price ({currency.symbol}/kWh)</Label>
              <Input type="number" value={evElecPrice} onChange={e => setEvElecPrice(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>EV Premium ({currency.symbol})</Label>
              <Input type="number" value={evPremium} onChange={e => setEvPremium(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcCompare}>Compare</Button>
          {compareResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">ICE Annual Cost</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmtCurrency(compareResult.iceCost, currency)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">EV Annual Cost</p>
                <p className="font-mono text-lg font-bold text-primary">{fmtCurrency(compareResult.evCost, currency)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Annual Saving</p>
                <p className={`font-mono text-lg font-bold ${compareResult.saving > 0 ? "text-green-400" : "text-red-400"}`}>{fmtCurrency(Math.abs(compareResult.saving), currency)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Break-even</p>
                <p className="font-mono text-lg font-bold text-foreground">{isFinite(compareResult.breakEvenYears) ? `${fmt(compareResult.breakEvenYears, 1)} yrs` : "N/A"}</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
