import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";

function fmt(n: number, dec = 2) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export default function EnvironmentCalculator() {
  const [carKmYear, setCarKmYear] = useState("20000");
  const [carLper100, setCarLper100] = useState("9");
  const [shortFlights, setShortFlights] = useState("2");
  const [longFlights, setLongFlights] = useState("1");
  const [monthlyElec, setMonthlyElec] = useState("800");
  const [meatMealsWeek, setMeatMealsWeek] = useState("7");
  const [carbonResult, setCarbonResult] = useState<{ total: number; car: number; flights: number; electricity: number; diet: number; trees: number } | null>(null);

  const [treesCo2, setTreesCo2] = useState("5");
  const [treeResult, setTreeResult] = useState<{ treesNeeded: number } | null>(null);

  const [showerMinDay, setShowerMinDay] = useState("8");
  const [mealsDay, setMealsDay] = useState("3");
  const [clothingItemsYear, setClothingItemsYear] = useState("20");
  const [waterResult, setWaterResult] = useState<{ litresPerDay: number; annualM3: number } | null>(null);

  function calcCarbon() {
    const car = (Number(carKmYear) / 100) * Number(carLper100) * 2.31;
    const flights = (Number(shortFlights) * 0.255 + Number(longFlights) * 1.5) * 1000;
    const electricity = (Number(monthlyElec) * 12) * 0.9;
    const diet = Number(meatMealsWeek) * 52 * 6.61;
    const total = (car + flights + electricity + diet) / 1000;
    const trees = Math.ceil(total * 1000 / 21);
    setCarbonResult({ total, car: car / 1000, flights: flights / 1000, electricity: electricity / 1000, diet: diet / 1000, trees });
  }

  function calcTrees() {
    const trees = Math.ceil(Number(treesCo2) * 1000 / 21);
    setTreeResult({ treesNeeded: trees });
  }

  function calcWaterFootprint() {
    const showerL = Number(showerMinDay) * 9 * 365;
    const foodL = Number(mealsDay) * 2000;
    const clothingL = Number(clothingItemsYear) * 8000;
    const totalL = showerL + foodL * 365 + clothingL;
    const annualM3 = totalL / 1000;
    setWaterResult({ litresPerDay: totalL / 365, annualM3 });
  }

  return (
    <CalculatorLayout
      guide={CALCULATOR_GUIDES['environment']}
      title="Environmental Calculator"
      description="Estimate your personal carbon footprint, calculate how many trees it takes to offset it, and understand your water footprint."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Carbon Footprint: enter your driving, flying, electricity and diet habits</li>
          <li>Tree Offset: enter tonnes of CO₂ to offset to see how many trees to plant</li>
          <li>Water Footprint: enter daily habits to see your total water consumption</li>
        </ol>
      }
      testimonial="I became curious about my environmental impact after reading about the South African government's carbon tax and this calculator made the abstract concrete. My annual carbon footprint came to about 12 tonnes of CO₂ equivalent — mostly from my car (5.2 t), two short-haul flights (2.5 t) and my Eskom electricity (3.6 t). The tree offset tab told me I'd need to plant 571 trees to neutralise my lifestyle, which is sobering. I've since switched to a hybrid vehicle, installed solar panels and cut red meat to three times a week — my recalculated footprint is down to 7.8 tonnes. The water footprint calculator was an unexpected eye-opener: clothing manufacturing accounts for a massive part of our virtual water consumption. I now buy second-hand where I can."
    >
      <Tabs defaultValue="carbon">
        <TabsList className="w-full">
          <TabsTrigger value="carbon" className="flex-1">Carbon Footprint</TabsTrigger>
          <TabsTrigger value="trees" className="flex-1">Tree Offset</TabsTrigger>
          <TabsTrigger value="water" className="flex-1">Water Footprint</TabsTrigger>
        </TabsList>

        <TabsContent value="carbon" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Driving (km/year)</Label>
              <Input type="number" value={carKmYear} onChange={e => setCarKmYear(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Fuel Consumption (L/100km)</Label>
              <Input type="number" value={carLper100} onChange={e => setCarLper100(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Short-haul flights/year</Label>
              <Input type="number" value={shortFlights} onChange={e => setShortFlights(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Long-haul flights/year</Label>
              <Input type="number" value={longFlights} onChange={e => setLongFlights(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Monthly Electricity (kWh)</Label>
              <Input type="number" value={monthlyElec} onChange={e => setMonthlyElec(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Meat/fish meals per week</Label>
              <Input type="number" value={meatMealsWeek} onChange={e => setMeatMealsWeek(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcCarbon}>Calculate</Button>
          {carbonResult && (
            <div className="space-y-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Total Annual Footprint</p>
                <p className="font-mono text-2xl font-bold text-primary">{fmt(carbonResult.total, 1)} tonnes CO₂e</p>
                <p className="text-xs text-muted-foreground mt-1">SA average: ~8.5 t | Global average: ~4 t | Paris target: ~2 t</p>
              </div>
              {[
                { label: "Driving", v: carbonResult.car },
                { label: "Flights", v: carbonResult.flights },
                { label: "Electricity (Eskom coal)", v: carbonResult.electricity },
                { label: "Diet", v: carbonResult.diet },
              ].map(r => (
                <div key={r.label} className="flex justify-between items-center bg-background rounded-lg px-3 py-2 border border-border">
                  <span className="text-sm text-muted-foreground">{r.label}</span>
                  <span className="font-mono text-sm font-bold">{fmt(r.v, 2)} t CO₂e</span>
                </div>
              ))}
              <div className="bg-background rounded-lg p-3 border border-border text-center">
                <p className="text-xs text-muted-foreground">Trees needed to offset (takes ~47 years each)</p>
                <p className="font-mono font-bold text-lg">{carbonResult.trees} trees</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="trees" className="space-y-4 pt-4">
          <div className="space-y-1.5">
            <Label>CO₂ to offset (tonnes per year)</Label>
            <Input type="number" value={treesCo2} onChange={e => setTreesCo2(e.target.value)} step="0.5" />
          </div>
          <Button className="w-full" onClick={calcTrees}>Calculate</Button>
          {treeResult && (
            <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
              <p className="text-xs text-muted-foreground mb-1">Trees to Plant</p>
              <p className="font-mono text-3xl font-bold text-primary">{treeResult.treesNeeded}</p>
              <p className="text-xs text-muted-foreground mt-2">Based on 21 kg CO₂ absorbed per tree per year (mature indigenous tree average).</p>
            </div>
          )}
          <p className="text-xs text-muted-foreground">Support local reforestation: GreenPop, Food & Trees for Africa, and SANParks Honorary Rangers all run tree-planting programmes in South Africa.</p>
        </TabsContent>

        <TabsContent value="water" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Shower (min/day)</Label>
              <Input type="number" value={showerMinDay} onChange={e => setShowerMinDay(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Meals per day</Label>
              <Input type="number" value={mealsDay} onChange={e => setMealsDay(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Clothing items/year</Label>
              <Input type="number" value={clothingItemsYear} onChange={e => setClothingItemsYear(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcWaterFootprint}>Calculate</Button>
          {waterResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Litres per Day</p>
                <p className="font-mono text-2xl font-bold text-primary">{fmt(waterResult.litresPerDay, 0)} L</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Annual Volume</p>
                <p className="font-mono text-2xl font-bold text-foreground">{fmt(waterResult.annualM3, 1)} m³</p>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">Includes direct use, food production and goods manufacturing (virtual water). Global average: ~3 400 L/person/day.</p>
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
