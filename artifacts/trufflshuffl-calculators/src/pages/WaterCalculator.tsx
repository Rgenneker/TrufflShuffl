import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function fmt(n: number, dec = 2) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export default function WaterCalculator() {
  const [people, setPeople] = useState("4");
  const [showerMin, setShowerMin] = useState("8");
  const [showersDay, setShowersDay] = useState("4");
  const [toiletFlush, setToiletFlush] = useState("5");
  const [toiletTimes, setToiletTimes] = useState("20");
  const [washingLoads, setWashingLoads] = useState("5");
  const [gardenMin, setGardenMin] = useState("30");
  const [usageResult, setUsageResult] = useState<{ daily: number; monthly: number; bill: number } | null>(null);
  const [tariffKl, setTariffKl] = useState("35");

  const [roofArea, setRoofArea] = useState("150");
  const [rainfall, setRainfall] = useState("600");
  const [runoff, setRunoff] = useState("80");
  const [rainResult, setRainResult] = useState<{ annualLitres: number; monthlyAvg: number; tankFills: number } | null>(null);
  const [tankSize, setTankSize] = useState("5000");

  const [tankCap, setTankCap] = useState("10000");
  const [dailyDemand, setDailyDemand] = useState("200");
  const [tankResult, setTankResult] = useState<{ daysSupply: number; weeksSupply: number } | null>(null);

  function calcUsage() {
    const showerL = showerMin ? Number(showerMin) * 9 : 0;
    const showerTotal = showerL * Number(showersDay);
    const toiletTotal = Number(toiletFlush) * Number(toiletTimes);
    const washingTotal = (Number(washingLoads) * 60) / 7;
    const gardenTotal = Number(gardenMin) * 15;
    const cooking = Number(people) * 5;
    const daily = showerTotal + toiletTotal + washingTotal + gardenTotal + cooking;
    const monthly = daily * 30;
    const bill = (monthly / 1000) * Number(tariffKl);
    setUsageResult({ daily, monthly, bill });
  }

  function calcRainwater() {
    const area = Number(roofArea);
    const rain = Number(rainfall);
    const co = Number(runoff) / 100;
    const annualLitres = area * rain * co;
    const monthlyAvg = annualLitres / 12;
    const tank = Number(tankSize);
    const tankFills = annualLitres / tank;
    setRainResult({ annualLitres, monthlyAvg, tankFills });
  }

  function calcTank() {
    const cap = Number(tankCap);
    const demand = Number(dailyDemand);
    const daysSupply = cap / demand;
    setTankResult({ daysSupply, weeksSupply: daysSupply / 7 });
  }

  return (
    <CalculatorLayout
      title="Water Calculator"
      description="Calculate your household water usage and bills, estimate rainwater harvesting yield, and size your storage tank — essential for drought-prone South Africa."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Daily Usage: enter your household habits to see litres used and monthly bill</li>
          <li>Rainwater: enter roof area and annual rainfall to estimate harvesting potential</li>
          <li>Tank Sizing: enter capacity and daily demand to see how many days a tank will last</li>
        </ol>
      }
      testimonial="During the Cape Town Day Zero crisis I wished I had a tool like this. Our family of five had no idea we were using over 800 litres a day until I started tracking it. This calculator helped us identify the biggest culprits: long showers and daily garden irrigation. We cut to 350 litres per day within two weeks. The rainwater tab showed us that our 180 m² roof in an area with 550 mm of rain per year could harvest over 79 000 litres annually — more than enough to supplement our municipal supply during dry months. We installed two 5 000-litre tanks and they regularly fill from a single good storm. The tank sizing tab told us our 10 000-litre reserve would last 50 days at 200 litres per day — peace of mind during any restriction."
    >
      <div className="space-y-2 mb-4">
        <Label>Municipal Water Tariff (R per kilolitre)</Label>
        <Input type="number" value={tariffKl} onChange={e => setTariffKl(e.target.value)} className="max-w-xs" />
      </div>
      <Tabs defaultValue="usage">
        <TabsList className="w-full">
          <TabsTrigger value="usage" className="flex-1">Daily Usage</TabsTrigger>
          <TabsTrigger value="rain" className="flex-1">Rainwater</TabsTrigger>
          <TabsTrigger value="tank" className="flex-1">Tank Sizing</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>People in household</Label>
              <Input type="number" value={people} onChange={e => setPeople(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Shower length (min each)</Label>
              <Input type="number" value={showerMin} onChange={e => setShowerMin(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Showers per day (total)</Label>
              <Input type="number" value={showersDay} onChange={e => setShowersDay(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Toilet litres per flush</Label>
              <Input type="number" value={toiletFlush} onChange={e => setToiletFlush(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Toilet flushes per day (total)</Label>
              <Input type="number" value={toiletTimes} onChange={e => setToiletTimes(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Washing machine loads/week</Label>
              <Input type="number" value={washingLoads} onChange={e => setWashingLoads(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Garden irrigation (min/day)</Label>
              <Input type="number" value={gardenMin} onChange={e => setGardenMin(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcUsage}>Calculate</Button>
          {usageResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Daily Usage</p>
                <p className="font-mono text-lg font-bold text-primary">{fmt(usageResult.daily, 0)} L</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Monthly Usage</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmt(usageResult.monthly / 1000, 1)} kL</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Monthly Bill</p>
                <p className="font-mono text-lg font-bold text-foreground">R {fmt(usageResult.bill)}</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="rain" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Roof Collection Area (m²)</Label>
              <Input type="number" value={roofArea} onChange={e => setRoofArea(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Annual Rainfall (mm)</Label>
              <Input type="number" value={rainfall} onChange={e => setRainfall(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Runoff Coefficient (%)</Label>
              <Input type="number" value={runoff} onChange={e => setRunoff(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Tank Size (litres)</Label>
              <Input type="number" value={tankSize} onChange={e => setTankSize(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcRainwater}>Calculate</Button>
          {rainResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Annual Harvest</p>
                <p className="font-mono text-lg font-bold text-primary">{fmt(rainResult.annualLitres / 1000, 1)} kL</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Monthly Avg</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmt(rainResult.monthlyAvg, 0)} L</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Tank Fills/Year</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmt(rainResult.tankFills, 1)}</p>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">SA average rainfall: Cape Town 515 mm, Johannesburg 713 mm, Durban 1 009 mm, Pretoria 674 mm.</p>
        </TabsContent>

        <TabsContent value="tank" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Tank Capacity (litres)</Label>
              <Input type="number" value={tankCap} onChange={e => setTankCap(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Daily Demand (litres)</Label>
              <Input type="number" value={dailyDemand} onChange={e => setDailyDemand(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcTank}>Calculate</Button>
          {tankResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Days Supply</p>
                <p className="font-mono text-xl font-bold text-primary">{fmt(tankResult.daysSupply, 1)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Weeks Supply</p>
                <p className="font-mono text-xl font-bold text-foreground">{fmt(tankResult.weeksSupply, 1)}</p>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">WHO minimum: 50 L/person/day. Standard household: 150–200 L/person/day.</p>
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
