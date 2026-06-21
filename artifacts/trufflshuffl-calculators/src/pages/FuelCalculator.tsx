import { useLang } from "@/context/LanguageContext";
import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateFuelCost, calculateTripTime, lPer100kmToMPG, mpgToL100km, litresPerGallon, kmToMiles, milesToKm } from "@/lib/calculators/fuel";

function fmt(n: number, dec = 2) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export default function FuelCalculator() {
  const { t } = useLang();
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  // Fuel cost
  const [distance, setDistance] = useState("100");
  const [consumption, setConsumption] = useState("8");
  const [fuelPrice, setFuelPrice] = useState("23.00");
  const [passengers, setPassengers] = useState("1");
  const [fuelType, setFuelType] = useState("Petrol 95");
  const [fuelResult, setFuelResult] = useState<ReturnType<typeof calculateFuelCost> | null>(null);

  // Trip time
  const [tripDist, setTripDist] = useState("500");
  const [speed, setSpeed] = useState("120");
  const [stops, setStops] = useState("30");
  const [depart, setDepart] = useState("08:00");
  const [tripResult, setTripResult] = useState<ReturnType<typeof calculateTripTime> | null>(null);
  const [arrivalTime, setArrivalTime] = useState<string | null>(null);

  // Conversions
  const [convL100, setConvL100] = useState("8");
  const [convLitres, setConvLitres] = useState("50");
  const [convPriceL, setConvPriceL] = useState("23.00");

  function calculateFuel() {
    let distKm = Number(distance);
    let consL = Number(consumption);
    let priceL = Number(fuelPrice);
    if (unit === "imperial") {
      distKm = milesToKm(distKm);
      consL = mpgToL100km(consL, "uk");
      priceL = Number(fuelPrice) / litresPerGallon("uk");
    }
    setFuelResult(calculateFuelCost(distKm, consL, priceL, Number(passengers)));
  }

  function calculateTrip() {
    let distKm = Number(tripDist);
    let spd = Number(speed);
    if (unit === "imperial") {
      distKm = milesToKm(distKm);
      spd = spd * 1.60934;
    }
    const r = calculateTripTime(distKm, spd, Number(stops));
    setTripResult(r);
    if (depart) {
      const [h, m] = depart.split(":").map(Number);
      const totalMin = h * 60 + m + r.totalHours * 60;
      const ah = Math.floor(totalMin / 60) % 24;
      const am = Math.round(totalMin % 60);
      setArrivalTime(`${String(ah).padStart(2, "0")}:${String(am).padStart(2, "0")}`);
    }
  }

  const mpgUs = fmt(lPer100kmToMPG(Number(convL100), "us"));
  const mpgUk = fmt(lPer100kmToMPG(Number(convL100), "uk"));
  const usGal = fmt(Number(convLitres) / litresPerGallon("us"));
  const ukGal = fmt(Number(convLitres) / litresPerGallon("uk"));
  const pricePerUsGal = fmt(Number(convPriceL) * litresPerGallon("us"));
  const pricePerUkGal = fmt(Number(convPriceL) * litresPerGallon("uk"));

  return (
    <CalculatorLayout
      title="Fuel & Trip Calculator"
      description="Calculate fuel costs for any trip, estimate travel time, and convert between metric and imperial fuel consumption units."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Toggle Metric / Imperial at the top</li>
          <li>Use the Fuel Cost tab for trip expenses</li>
          <li>Use the Trip Time tab to estimate journey duration and arrival time</li>
          <li>The Conversions tab converts L/100km to MPG and litres to gallons</li>
        </ol>
      }
      testimonial="Long-distance road trips in South Africa are an institution, and this calculator has become essential planning for every one of mine. Before my Joburg-to-Cape Town drive I entered my car's real-world consumption, current fuel prices and number of passengers — the cost-split feature meant my friends knew exactly what to contribute. The trip time calculator even accounted for our coffee stops at Huguenot Tunnel. I use the conversion tab constantly to compare cars with different efficiency ratings. My European rental car listed fuel economy in L/100km but I think in MPG — this converter bridged the gap in seconds. Brilliant for budget travel, family road trips, and anyone trying to figure out whether EV charging actually saves money versus petrol."
    guide={CALCULATOR_GUIDES['fuel']}
    >
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Units:</span>
          <div className="flex rounded-lg border border-border overflow-hidden">
            {(["metric", "imperial"] as const).map(u => (
              <button key={u} data-testid={`btn-unit-${u}`} onClick={() => setUnit(u)}
                className={`px-4 py-1.5 text-sm capitalize transition-colors ${unit === u ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
                {u}
              </button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="fuel">
          <TabsList className="w-full">
            <TabsTrigger value="fuel" className="flex-1">Fuel Cost</TabsTrigger>
            <TabsTrigger value="time" className="flex-1">Trip Time</TabsTrigger>
            <TabsTrigger value="conv" className="flex-1">Conversions</TabsTrigger>
          </TabsList>

          <TabsContent value="fuel" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>{t.fuelType}</Label>
                <Select value={fuelType} onValueChange={setFuelType}>
                  <SelectTrigger data-testid="select-fuel-type"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Petrol 93", "Petrol 95", "Diesel", "LPG"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Distance ({unit === "metric" ? "km" : "miles"})</Label>
                <Input data-testid="input-distance" type="number" value={distance} onChange={e => setDistance(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>{unit === "metric" ? "Consumption (L/100km)" : "Consumption (MPG)"}</Label>
                <Input data-testid="input-consumption" type="number" value={consumption} onChange={e => setConsumption(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Price per {unit === "metric" ? "Litre (R)" : "UK Gallon (R)"}</Label>
                <Input data-testid="input-fuel-price" type="number" value={fuelPrice} onChange={e => setFuelPrice(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>{t.passengers}</Label>
                <Input data-testid="input-passengers" type="number" value={passengers} onChange={e => setPassengers(e.target.value)} min="1" />
              </div>
            </div>
            <Button data-testid="button-calc-fuel" className="w-full" onClick={calculateFuel}>Calculate</Button>
            {fuelResult && (
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Fuel</p>
                  <p className="font-mono text-lg font-bold text-primary" data-testid="result-litres">{fmt(fuelResult.totalLitres)} L</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Cost</p>
                  <p className="font-mono text-lg font-bold text-foreground" data-testid="result-cost">R {fmt(fuelResult.totalCost)}</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Per Person</p>
                  <p className="font-mono text-lg font-bold text-foreground">R {fmt(fuelResult.costPerPassenger)}</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="time" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Distance ({unit === "metric" ? "km" : "miles"})</Label>
                <Input data-testid="input-trip-dist" type="number" value={tripDist} onChange={e => setTripDist(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Avg Speed ({unit === "metric" ? "km/h" : "mph"})</Label>
                <Input data-testid="input-speed" type="number" value={speed} onChange={e => setSpeed(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Stop Time (minutes)</Label>
                <Input data-testid="input-stops" type="number" value={stops} onChange={e => setStops(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Departure Time (optional)</Label>
                <Input data-testid="input-depart" type="time" value={depart} onChange={e => setDepart(e.target.value)} />
              </div>
            </div>
            <Button data-testid="button-calc-time" className="w-full" onClick={calculateTrip}>Calculate</Button>
            {tripResult && (
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Travel Time</p>
                  <p className="font-mono text-lg font-bold text-primary" data-testid="result-time">{tripResult.hours}h {tripResult.minutes}m</p>
                </div>
                {arrivalTime && (
                  <div className="bg-background rounded-lg p-4 border border-border text-center">
                    <p className="text-xs text-muted-foreground mb-1">Arrival Time</p>
                    <p className="font-mono text-lg font-bold text-foreground">{arrivalTime}</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="conv" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Fuel Consumption (L/100km)</Label>
                <Input data-testid="input-conv-l100" type="number" value={convL100} onChange={e => setConvL100(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xs text-muted-foreground">MPG (US)</p>
                  <p className="font-mono font-bold text-foreground">{mpgUs}</p>
                </div>
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xs text-muted-foreground">MPG (UK)</p>
                  <p className="font-mono font-bold text-foreground">{mpgUk}</p>
                </div>
              </div>

              <hr className="border-border" />
              <div className="space-y-1.5">
                <Label>Volume (Litres)</Label>
                <Input data-testid="input-conv-litres" type="number" value={convLitres} onChange={e => setConvLitres(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xs text-muted-foreground">US Gallons</p>
                  <p className="font-mono font-bold text-foreground">{usGal}</p>
                </div>
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xs text-muted-foreground">UK Gallons</p>
                  <p className="font-mono font-bold text-foreground">{ukGal}</p>
                </div>
              </div>

              <hr className="border-border" />
              <div className="space-y-1.5">
                <Label>Price per Litre (R)</Label>
                <Input data-testid="input-conv-price" type="number" value={convPriceL} onChange={e => setConvPriceL(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xs text-muted-foreground">Price/US Gallon</p>
                  <p className="font-mono font-bold text-foreground">R {pricePerUsGal}</p>
                </div>
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xs text-muted-foreground">Price/UK Gallon</p>
                  <p className="font-mono font-bold text-foreground">R {pricePerUkGal}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CalculatorLayout>
  );
}
