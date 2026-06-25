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

export default function BodyHealthCalculator() {
  const [heightCm, setHeightCm] = useState("175");
  const [weightKg, setWeightKg] = useState("78");
  const [ageYears, setAgeYears] = useState("35");
  const [sex, setSex] = useState("male");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [tdeeResult, setTdeeResult] = useState<{ bmr: number; tdee: number; macros: { p: number; c: number; f: number } } | null>(null);

  const [bfNeck, setBfNeck] = useState("38");
  const [bfWaist, setBfWaist] = useState("88");
  const [bfHip, setBfHip] = useState("0");
  const [bfHeight, setBfHeight] = useState("175");
  const [bfSex, setBfSex] = useState("male");
  const [bfResult, setBfResult] = useState<{ bodyFat: number; fatMass: number; leanMass: number; category: string } | null>(null);

  const [waterWeight, setWaterWeight] = useState("78");
  const [waterActivity, setWaterActivity] = useState("moderate");
  const [waterResult, setWaterResult] = useState<{ litres: number; cups: number } | null>(null);

  const activityMult: Record<string, number> = {
    sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, veryActive: 1.9,
  };

  function calcTDEE() {
    const h = Number(heightCm);
    const w = Number(weightKg);
    const a = Number(ageYears);
    const bmr = sex === "male"
      ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * a
      : 447.593 + 9.247 * w + 3.098 * h - 4.330 * a;
    const tdee = bmr * activityMult[activityLevel];
    const macros = { p: Math.round(w * 2.2), f: Math.round(tdee * 0.25 / 9), c: Math.round((tdee - w * 2.2 * 4 - tdee * 0.25) / 4) };
    setTdeeResult({ bmr, tdee, macros });
  }

  function calcBodyFat() {
    const h = Number(bfHeight);
    const neck = Number(bfNeck);
    const waist = Number(bfWaist);
    const hip = Number(bfHip);
    let bf = 0;
    if (bfSex === "male") {
      bf = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(h) + 36.76;
    } else {
      bf = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(h) - 78.387;
    }
    const fatMass = (bf / 100) * Number(weightKg);
    const leanMass = Number(weightKg) - fatMass;
    let category = "";
    if (bfSex === "male") {
      category = bf < 6 ? "Essential Fat" : bf < 14 ? "Athletic" : bf < 18 ? "Fitness" : bf < 25 ? "Average" : "Obese";
    } else {
      category = bf < 14 ? "Essential Fat" : bf < 21 ? "Athletic" : bf < 25 ? "Fitness" : bf < 32 ? "Average" : "Obese";
    }
    setBfResult({ bodyFat: bf, fatMass, leanMass, category });
  }

  function calcWater() {
    const w = Number(waterWeight);
    const base = w * 0.033;
    const actAdj: Record<string, number> = { sedentary: 0, light: 0.3, moderate: 0.5, active: 0.7, veryActive: 1.0 };
    const litres = base + actAdj[waterActivity];
    setWaterResult({ litres, cups: litres / 0.25 });
  }

  return (
    <CalculatorLayout
      title="Body Health Calculator"
      description="Calculate your TDEE and BMR with macro targets, estimate body fat percentage using the US Navy method, and find your daily water intake goal."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>TDEE: enter height, weight, age and activity level for calorie needs and macros</li>
          <li>Body Fat: take neck, waist (and hip for women) measurements in cm</li>
          <li>Water: enter body weight and activity level for your daily hydration goal</li>
        </ol>
      }
      testimonial="I'm a personal trainer in Sandton and I use this calculator with almost every new client. The TDEE tab is the most important starting point — knowing their true maintenance calories stops the guesswork of 'eat less, move more' and replaces it with a real number. The body fat tab using the Navy method is surprisingly accurate and requires only a tape measure, no expensive equipment. The water intake guide is something clients always underestimate — a 90 kg man training five days a week needs close to 4 litres a day. Having a tool to show clients these personalised numbers, rather than generic advice, transforms their commitment. I've used other tools but this one is clean, fast and private — no account needed, which clients appreciate."
    >
      <Tabs defaultValue="tdee">
        <TabsList className="w-full">
          <TabsTrigger value="tdee" className="flex-1">TDEE / BMR</TabsTrigger>
          <TabsTrigger value="bodyfat" className="flex-1">Body Fat</TabsTrigger>
          <TabsTrigger value="water" className="flex-1">Water Intake</TabsTrigger>
        </TabsList>

        <TabsContent value="tdee" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Height (cm)</Label>
              <Input type="number" value={heightCm} onChange={e => setHeightCm(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Weight (kg)</Label>
              <Input type="number" value={weightKg} onChange={e => setWeightKg(e.target.value)} step="0.5" />
            </div>
            <div className="space-y-1.5">
              <Label>Age</Label>
              <Input type="number" value={ageYears} onChange={e => setAgeYears(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Biological Sex</Label>
              <div className="flex gap-2">
                {["male", "female"].map(s => (
                  <button key={s} onClick={() => setSex(s)}
                    className={`flex-1 py-1.5 rounded-lg border text-sm capitalize transition-colors ${sex === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (desk job, little exercise)</SelectItem>
                  <SelectItem value="light">Light (1–3 days/week exercise)</SelectItem>
                  <SelectItem value="moderate">Moderate (3–5 days/week)</SelectItem>
                  <SelectItem value="active">Active (6–7 days/week)</SelectItem>
                  <SelectItem value="veryActive">Very Active (physical job + training)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full" onClick={calcTDEE}>Calculate</Button>
          {tdeeResult && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background rounded-lg p-4 border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">BMR (at rest)</p>
                  <p className="font-mono text-xl font-bold text-foreground">{fmt(tdeeResult.bmr, 0)} kcal</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                  <p className="text-xs text-muted-foreground mb-1">TDEE (maintenance)</p>
                  <p className="font-mono text-xl font-bold text-primary">{fmt(tdeeResult.tdee, 0)} kcal</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-semibold">Macro Targets (maintenance)</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xs text-muted-foreground">Protein</p>
                  <p className="font-mono font-bold">{tdeeResult.macros.p} g</p>
                </div>
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xs text-muted-foreground">Carbs</p>
                  <p className="font-mono font-bold">{tdeeResult.macros.c} g</p>
                </div>
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xs text-muted-foreground">Fats</p>
                  <p className="font-mono font-bold">{tdeeResult.macros.f} g</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-center text-muted-foreground">
                <div className="bg-background rounded-lg p-2 border border-border">
                  <p>Cut (−500)</p>
                  <p className="font-mono font-bold text-foreground">{fmt(tdeeResult.tdee - 500, 0)} kcal</p>
                </div>
                <div className="bg-background rounded-lg p-2 border border-border">
                  <p>Maintain</p>
                  <p className="font-mono font-bold text-foreground">{fmt(tdeeResult.tdee, 0)} kcal</p>
                </div>
                <div className="bg-background rounded-lg p-2 border border-border">
                  <p>Bulk (+300)</p>
                  <p className="font-mono font-bold text-foreground">{fmt(tdeeResult.tdee + 300, 0)} kcal</p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="bodyfat" className="space-y-4 pt-4">
          <div className="space-y-1.5">
            <Label>Biological Sex</Label>
            <div className="flex gap-2 max-w-xs">
              {["male", "female"].map(s => (
                <button key={s} onClick={() => setBfSex(s)}
                  className={`flex-1 py-1.5 rounded-lg border text-sm capitalize transition-colors ${bfSex === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Measure at the narrowest point. All measurements in cm.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Height (cm)</Label>
              <Input type="number" value={bfHeight} onChange={e => setBfHeight(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Neck circumference (cm)</Label>
              <Input type="number" value={bfNeck} onChange={e => setBfNeck(e.target.value)} step="0.5" />
            </div>
            <div className="space-y-1.5">
              <Label>Waist circumference (cm)</Label>
              <Input type="number" value={bfWaist} onChange={e => setBfWaist(e.target.value)} step="0.5" />
            </div>
            {bfSex === "female" && (
              <div className="space-y-1.5">
                <Label>Hip circumference (cm)</Label>
                <Input type="number" value={bfHip} onChange={e => setBfHip(e.target.value)} step="0.5" />
              </div>
            )}
            <div className="space-y-1.5">
              <Label>Body weight (kg)</Label>
              <Input type="number" value={weightKg} onChange={e => setWeightKg(e.target.value)} step="0.5" />
            </div>
          </div>
          <Button className="w-full" onClick={calcBodyFat}>Calculate Body Fat</Button>
          {bfResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Body Fat</p>
                <p className="font-mono text-2xl font-bold text-primary">{fmt(bfResult.bodyFat, 1)}%</p>
                <p className="text-xs text-muted-foreground mt-1">{bfResult.category}</p>
              </div>
              <div className="grid grid-rows-2 gap-2">
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xs text-muted-foreground">Fat Mass</p>
                  <p className="font-mono font-bold">{fmt(bfResult.fatMass, 1)} kg</p>
                </div>
                <div className="bg-background rounded-lg p-3 border border-border text-center">
                  <p className="text-xs text-muted-foreground">Lean Mass</p>
                  <p className="font-mono font-bold">{fmt(bfResult.leanMass, 1)} kg</p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="water" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Body Weight (kg)</Label>
              <Input type="number" value={waterWeight} onChange={e => setWaterWeight(e.target.value)} step="0.5" />
            </div>
            <div className="space-y-1.5">
              <Label>Activity Level</Label>
              <Select value={waterActivity} onValueChange={setWaterActivity}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="light">Light activity</SelectItem>
                  <SelectItem value="moderate">Moderate activity</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="veryActive">Very active / athlete</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full" onClick={calcWater}>Calculate</Button>
          {waterResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Daily Water Goal</p>
                <p className="font-mono text-3xl font-bold text-primary">{fmt(waterResult.litres, 1)} L</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">In 250 ml cups</p>
                <p className="font-mono text-3xl font-bold text-foreground">{Math.round(waterResult.cups)}</p>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">Add 500–750 ml per hour of intense exercise. Hot South African weather increases requirements significantly.</p>
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
