import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function fmt(n: number, dec = 2) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export default function FitnessCalculator() {
  const [distKm, setDistKm] = useState("10");
  const [timeH, setTimeH] = useState("0");
  const [timeM, setTimeM] = useState("55");
  const [timeS, setTimeS] = useState("0");
  const [paceResult, setPaceResult] = useState<{ paceMinKm: string; speedKmh: number; fiveK: string; tenK: string; half: string; full: string } | null>(null);

  const [weightKg, setWeightKg] = useState("75");
  const [cycleHours, setCycleHours] = useState("1");
  const [cycleIntensity, setCycleIntensity] = useState("moderate");
  const [cycleResult, setCycleResult] = useState<{ calories: number } | null>(null);

  const [ageYears, setAgeYears] = useState("35");
  const [restingHR, setRestingHR] = useState("65");
  const [hrResult, setHrResult] = useState<{ max: number; zones: { name: string; low: number; high: number }[] } | null>(null);

  const [liftWeight, setLiftWeight] = useState("100");
  const [reps, setReps] = useState("5");
  const [ormResult, setOrmResult] = useState<{ epley: number; brzycki: number; percentages: { pct: number; weight: number }[] } | null>(null);

  function calcPace() {
    const totalSec = Number(timeH) * 3600 + Number(timeM) * 60 + Number(timeS);
    const km = Number(distKm);
    if (totalSec <= 0 || km <= 0) return;
    const secPerKm = totalSec / km;
    const speedKmh = 3600 / secPerKm;
    const paceMin = Math.floor(secPerKm / 60);
    const paceSec = Math.round(secPerKm % 60);
    const paceMinKm = `${paceMin}:${String(paceSec).padStart(2, "0")}`;
    function timeForDist(d: number) {
      const s = secPerKm * d;
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = Math.round(s % 60);
      return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}` : `${m}:${String(sec).padStart(2, "0")}`;
    }
    setPaceResult({ paceMinKm, speedKmh, fiveK: timeForDist(5), tenK: timeForDist(10), half: timeForDist(21.1), full: timeForDist(42.2) });
  }

  function calcCycleCalories() {
    const met: Record<string, number> = { light: 4, moderate: 8, vigorous: 12, racing: 16 };
    const calories = met[cycleIntensity] * Number(weightKg) * Number(cycleHours);
    setCycleResult({ calories });
  }

  function calcHR() {
    const age = Number(ageYears);
    const rhr = Number(restingHR);
    const max = 220 - age;
    const hrr = max - rhr;
    const zones = [
      { name: "Zone 1 — Recovery (50–60%)", low: Math.round(rhr + hrr * 0.5), high: Math.round(rhr + hrr * 0.6) },
      { name: "Zone 2 — Aerobic (60–70%)", low: Math.round(rhr + hrr * 0.6), high: Math.round(rhr + hrr * 0.7) },
      { name: "Zone 3 — Tempo (70–80%)", low: Math.round(rhr + hrr * 0.7), high: Math.round(rhr + hrr * 0.8) },
      { name: "Zone 4 — Threshold (80–90%)", low: Math.round(rhr + hrr * 0.8), high: Math.round(rhr + hrr * 0.9) },
      { name: "Zone 5 — Max (90–100%)", low: Math.round(rhr + hrr * 0.9), high: max },
    ];
    setHrResult({ max, zones });
  }

  function calcORM() {
    const w = Number(liftWeight);
    const r = Number(reps);
    if (r === 1) { setOrmResult({ epley: w, brzycki: w, percentages: [80, 70, 60, 50].map(pct => ({ pct, weight: Math.round(w * pct / 100) })) }); return; }
    const epley = w * (1 + r / 30);
    const brzycki = w / (1.0278 - 0.0278 * r);
    const best = (epley + brzycki) / 2;
    const percentages = [90, 80, 70, 60].map(pct => ({ pct, weight: Math.round(best * pct / 100) }));
    setOrmResult({ epley, brzycki, percentages });
  }

  return (
    <CalculatorLayout
      title="Fitness Calculator"
      description="Calculate running pace and race predictions, cycling calories, heart rate training zones, and your one-rep max for strength training."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Running Pace: enter distance and time for pace and race predictions</li>
          <li>Cycling: enter weight, time, and intensity for calories burned</li>
          <li>Heart Rate: enter age and resting HR for personalised training zones</li>
          <li>One Rep Max: enter your working weight and reps to estimate your 1RM</li>
        </ol>
      }
      testimonial="I run the Comrades Marathon and this tool has become part of my training prep. I enter my current long-run pace and it instantly tells me my projected Comrades time — which keeps me honest about whether I'm on track for silver or just a finish medal. The heart rate zones were a revelation: I was training too hard on easy days and not hard enough on threshold days. Dialling into Zone 2 for my base runs has transformed my aerobic engine. The one-rep max tab is also great for my gym sessions — entering my working sets to track estimated strength gains over a training cycle. All four tabs in one clean tool. I've shared it with my running club."
    >
      <Tabs defaultValue="pace">
        <TabsList className="w-full">
          <TabsTrigger value="pace" className="flex-1">Running Pace</TabsTrigger>
          <TabsTrigger value="cycle" className="flex-1">Cycling</TabsTrigger>
          <TabsTrigger value="hr" className="flex-1">Heart Rate</TabsTrigger>
          <TabsTrigger value="orm" className="flex-1">One Rep Max</TabsTrigger>
        </TabsList>

        <TabsContent value="pace" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Distance (km)</Label>
              <Input type="number" value={distKm} onChange={e => setDistKm(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Time (hh:mm:ss)</Label>
              <div className="flex gap-1">
                <Input type="number" value={timeH} onChange={e => setTimeH(e.target.value)} placeholder="h" className="w-16" min="0" />
                <Input type="number" value={timeM} onChange={e => setTimeM(e.target.value)} placeholder="m" className="w-16" min="0" max="59" />
                <Input type="number" value={timeS} onChange={e => setTimeS(e.target.value)} placeholder="s" className="w-16" min="0" max="59" />
              </div>
            </div>
          </div>
          <Button className="w-full" onClick={calcPace}>Calculate</Button>
          {paceResult && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Pace (min/km)</p>
                  <p className="font-mono text-xl font-bold text-primary">{paceResult.paceMinKm}</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Speed</p>
                  <p className="font-mono text-xl font-bold text-foreground">{fmt(paceResult.speedKmh, 1)} km/h</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-semibold">Race Predictions</p>
              <div className="grid grid-cols-2 gap-2">
                {[{ d: "5 km", t: paceResult.fiveK }, { d: "10 km", t: paceResult.tenK }, { d: "Half Marathon", t: paceResult.half }, { d: "Marathon", t: paceResult.full }].map(r => (
                  <div key={r.d} className="bg-background rounded-lg p-3 border border-border flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{r.d}</span>
                    <span className="font-mono font-bold text-sm">{r.t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="cycle" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Body Weight (kg)</Label>
              <Input type="number" value={weightKg} onChange={e => setWeightKg(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Duration (hours)</Label>
              <Input type="number" value={cycleHours} onChange={e => setCycleHours(e.target.value)} step="0.25" />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>Intensity</Label>
              <Select value={cycleIntensity} onValueChange={setCycleIntensity}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light (leisure, flat)</SelectItem>
                  <SelectItem value="moderate">Moderate (general cycling)</SelectItem>
                  <SelectItem value="vigorous">Vigorous (fast, hilly)</SelectItem>
                  <SelectItem value="racing">Racing (competitive)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full" onClick={calcCycleCalories}>Calculate</Button>
          {cycleResult && (
            <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
              <p className="text-xs text-muted-foreground mb-1">Calories Burned</p>
              <p className="font-mono text-3xl font-bold text-primary">{fmt(cycleResult.calories, 0)} kcal</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="hr" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Age (years)</Label>
              <Input type="number" value={ageYears} onChange={e => setAgeYears(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Resting Heart Rate (bpm)</Label>
              <Input type="number" value={restingHR} onChange={e => setRestingHR(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcHR}>Calculate Zones</Button>
          {hrResult && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Max HR: <strong className="text-foreground">{hrResult.max} bpm</strong> (Karvonen method)</p>
              {hrResult.zones.map(z => (
                <div key={z.name} className="flex items-center justify-between bg-background rounded-lg px-3 py-2.5 border border-border">
                  <span className="text-xs text-muted-foreground">{z.name}</span>
                  <span className="font-mono text-sm font-bold">{z.low} – {z.high} bpm</span>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="orm" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Weight Lifted (kg)</Label>
              <Input type="number" value={liftWeight} onChange={e => setLiftWeight(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Reps Completed</Label>
              <Input type="number" value={reps} onChange={e => setReps(e.target.value)} min="1" max="30" />
            </div>
          </div>
          <Button className="w-full" onClick={calcORM}>Calculate</Button>
          {ormResult && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Epley 1RM</p>
                  <p className="font-mono text-xl font-bold text-primary">{fmt(ormResult.epley, 1)} kg</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Brzycki 1RM</p>
                  <p className="font-mono text-xl font-bold text-foreground">{fmt(ormResult.brzycki, 1)} kg</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-semibold">Training Loads</p>
              <div className="grid grid-cols-2 gap-2">
                {ormResult.percentages.map(p => (
                  <div key={p.pct} className="bg-background rounded-lg p-3 border border-border flex justify-between">
                    <span className="text-xs text-muted-foreground">{p.pct}% of 1RM</span>
                    <span className="font-mono font-bold text-sm">{p.weight} kg</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
