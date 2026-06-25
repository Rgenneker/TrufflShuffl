import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function fmt(n: number, dec = 2) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export default function TravelCalculator() {
  const [flightHours, setFlightHours] = useState("11");
  const [timezonesDiff, setTimezonesDiff] = useState("2");
  const [jetResult, setJetResult] = useState<{ recoveryDays: number; advice: string } | null>(null);

  const [nights, setNights] = useState("7");
  const [hotelNight, setHotelNight] = useState("1500");
  const [flights, setFlights] = useState("4000");
  const [dailyFood, setDailyFood] = useState("500");
  const [dailyActivities, setDailyActivities] = useState("300");
  const [misc, setMisc] = useState("2000");
  const [budgetResult, setBudgetResult] = useState<{ total: number; perDay: number; breakdown: { label: string; amount: number }[] } | null>(null);

  const [baggageKg, setBaggageKg] = useState("25");
  const [allowKg, setAllowKg] = useState("23");
  const [excessRate, setExcessRate] = useState("200");
  const [bagResult, setBagResult] = useState<{ excess: number; fee: number } | null>(null);

  const [fromCurr, setFromCurr] = useState("1");
  const [rate, setRate] = useState("18.50");
  const [fxResult, setFxResult] = useState<{ zar: number } | null>(null);

  function calcJetLag() {
    const hours = Number(flightHours);
    const zones = Number(timezonesDiff);
    const recoveryDays = Math.ceil(zones * 0.5 + hours / 6);
    const advice = zones > 5 ? "Arrive a few days early if possible. Stay hydrated, avoid alcohol, and reset your sleep schedule immediately on arrival." : "Moderate adjustment. Try to sleep on local time from day one.";
    setJetResult({ recoveryDays, advice });
  }

  function calcBudget() {
    const n = Number(nights);
    const hotel = n * Number(hotelNight);
    const food = n * Number(dailyFood);
    const activities = n * Number(dailyActivities);
    const fl = Number(flights);
    const m = Number(misc);
    const total = hotel + food + activities + fl + m;
    const perDay = total / n;
    const breakdown = [
      { label: "Hotel / Accommodation", amount: hotel },
      { label: "Flights", amount: fl },
      { label: "Food & Dining", amount: food },
      { label: "Activities & Excursions", amount: activities },
      { label: "Miscellaneous", amount: m },
    ];
    setBudgetResult({ total, perDay, breakdown });
  }

  function calcBaggage() {
    const excess = Math.max(0, Number(baggageKg) - Number(allowKg));
    const fee = excess * Number(excessRate);
    setBagResult({ excess, fee });
  }

  function calcFX() {
    setFxResult({ zar: Number(fromCurr) * Number(rate) });
  }

  return (
    <CalculatorLayout
      title="Travel Calculator"
      description="Plan your trip budget, estimate jet lag recovery, check baggage allowance fees, and convert foreign currency to Rand."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Trip Budget: enter accommodation, flights and daily costs for a full breakdown</li>
          <li>Jet Lag: enter flight duration and time zone difference for recovery guidance</li>
          <li>Baggage: enter your luggage weight and allowance to estimate excess fees</li>
          <li>Currency: convert any foreign amount to ZAR using your bank rate</li>
        </ol>
      }
      testimonial="I used the trip budget tab to plan our family holiday to Thailand and it was a game-changer. I entered 14 nights at R1 800 per night, R8 000 for flights, R400 per day food and R250 per day activities — the total came to R56 000 which let me set a realistic savings goal six months out. The jet lag tab warned me that an 11-hour flight crossing nine time zones would take about five days to recover from, so I built in two buffer days before any client meetings. The baggage calculator saved me R2 400 at check-in — it showed my bag was 3 kg over the 23 kg limit so I repacked the night before. The currency tab keeps me honest when comparing prices overseas in local currency versus what they really cost in Rand."
    >
      <Tabs defaultValue="budget">
        <TabsList className="w-full">
          <TabsTrigger value="budget" className="flex-1">Trip Budget</TabsTrigger>
          <TabsTrigger value="jetlag" className="flex-1">Jet Lag</TabsTrigger>
          <TabsTrigger value="baggage" className="flex-1">Baggage</TabsTrigger>
          <TabsTrigger value="currency" className="flex-1">Currency</TabsTrigger>
        </TabsList>

        <TabsContent value="budget" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Number of Nights</Label>
              <Input type="number" value={nights} onChange={e => setNights(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Hotel per Night (R)</Label>
              <Input type="number" value={hotelNight} onChange={e => setHotelNight(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Flights Total (R)</Label>
              <Input type="number" value={flights} onChange={e => setFlights(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Food per Day (R)</Label>
              <Input type="number" value={dailyFood} onChange={e => setDailyFood(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Activities per Day (R)</Label>
              <Input type="number" value={dailyActivities} onChange={e => setDailyActivities(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Miscellaneous (R)</Label>
              <Input type="number" value={misc} onChange={e => setMisc(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcBudget}>Calculate Budget</Button>
          {budgetResult && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total Trip Cost</p>
                  <p className="font-mono text-xl font-bold text-primary">R {fmt(budgetResult.total, 0)}</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Per Day Average</p>
                  <p className="font-mono text-xl font-bold text-foreground">R {fmt(budgetResult.perDay, 0)}</p>
                </div>
              </div>
              {budgetResult.breakdown.map(b => (
                <div key={b.label} className="flex justify-between items-center bg-background rounded-lg px-3 py-2 border border-border">
                  <span className="text-sm text-muted-foreground">{b.label}</span>
                  <span className="font-mono text-sm font-bold">R {fmt(b.amount, 0)}</span>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="jetlag" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Flight Duration (hours)</Label>
              <Input type="number" value={flightHours} onChange={e => setFlightHours(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Time Zones Crossed</Label>
              <Input type="number" value={timezonesDiff} onChange={e => setTimezonesDiff(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcJetLag}>Calculate</Button>
          {jetResult && (
            <div className="space-y-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Estimated Recovery</p>
                <p className="font-mono text-xl font-bold text-primary">{jetResult.recoveryDays} days</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-sm text-muted-foreground">{jetResult.advice}</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="baggage" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Your Luggage (kg)</Label>
              <Input type="number" value={baggageKg} onChange={e => setBaggageKg(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Allowance (kg)</Label>
              <Input type="number" value={allowKg} onChange={e => setAllowKg(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Fee per kg (R)</Label>
              <Input type="number" value={excessRate} onChange={e => setExcessRate(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcBaggage}>Calculate</Button>
          {bagResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className={`rounded-lg p-4 border text-center ${bagResult.excess > 0 ? "border-red-500/30 bg-red-500/10" : "border-green-500/30 bg-green-500/10"}`}>
                <p className="text-xs text-muted-foreground mb-1">Excess Weight</p>
                <p className={`font-mono text-xl font-bold ${bagResult.excess > 0 ? "text-red-400" : "text-green-400"}`}>{bagResult.excess} kg</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Excess Fee</p>
                <p className="font-mono text-xl font-bold text-foreground">R {fmt(bagResult.fee, 0)}</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="currency" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Foreign Amount</Label>
              <Input type="number" value={fromCurr} onChange={e => setFromCurr(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Exchange Rate (1 unit = R)</Label>
              <Input type="number" value={rate} onChange={e => setRate(e.target.value)} step="0.01" />
            </div>
          </div>
          <Button className="w-full" onClick={calcFX}>Convert to Rand</Button>
          {fxResult && (
            <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
              <p className="text-xs text-muted-foreground mb-1">South African Rand</p>
              <p className="font-mono text-3xl font-bold text-primary">R {fmt(fxResult.zar)}</p>
            </div>
          )}
          <p className="text-xs text-muted-foreground">Check the current ZAR rate at your bank or www.xe.com. Typical rates: USD R18.50, EUR R20.00, GBP R23.50, AUD R12.00.</p>
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
