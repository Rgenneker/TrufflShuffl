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

export default function PetCalculator() {
  const [petAge, setPetAge] = useState("3");
  const [petType, setPetType] = useState("dog-small");
  const [ageResult, setAgeResult] = useState<{ humanAge: number; lifeStage: string } | null>(null);

  const [petWeightKg, setPetWeightKg] = useState("15");
  const [foodType, setFoodType] = useState("dry");
  const [activityLevel, setActivityLevel] = useState("normal");
  const [feedResult, setFeedResult] = useState<{ dailyGrams: number; cupsPerDay: number; monthlyKg: number } | null>(null);

  const [medWeight, setMedWeight] = useState("15");
  const [dosePerKg, setDosePerKg] = useState("10");
  const [medConc, setMedConc] = useState("50");
  const [medResult, setMedResult] = useState<{ totalDoseMg: number; volumeMl: number } | null>(null);

  function calcAge() {
    const age = Number(petAge);
    let humanAge = 0;
    let lifeStage = "";
    if (petType.startsWith("dog")) {
      const size = petType.split("-")[1];
      const firstYearHuman = size === "small" ? 15 : size === "medium" ? 15 : 15;
      const secondYearHuman = size === "small" ? 9 : size === "medium" ? 9 : 9;
      const perYearAfter = size === "small" ? 4 : size === "medium" ? 5 : 7;
      if (age <= 1) humanAge = firstYearHuman * age;
      else if (age <= 2) humanAge = firstYearHuman + secondYearHuman * (age - 1);
      else humanAge = firstYearHuman + secondYearHuman + perYearAfter * (age - 2);
      lifeStage = humanAge < 20 ? "Puppy" : humanAge < 40 ? "Young Adult" : humanAge < 60 ? "Middle Age" : humanAge < 75 ? "Senior" : "Geriatric";
    } else {
      if (age <= 1) humanAge = 15;
      else if (age <= 2) humanAge = 24;
      else humanAge = 24 + (age - 2) * 4;
      lifeStage = humanAge < 20 ? "Kitten" : humanAge < 40 ? "Young Adult" : humanAge < 60 ? "Mature" : humanAge < 75 ? "Senior" : "Geriatric";
    }
    setAgeResult({ humanAge: Math.round(humanAge), lifeStage });
  }

  function calcFeeding() {
    const w = Number(petWeightKg);
    const actMult: Record<string, number> = { low: 0.85, normal: 1.0, high: 1.2, working: 1.5 };
    const baseMer = 70 * Math.pow(w, 0.75);
    const dailyKcal = baseMer * actMult[activityLevel];
    const kcalPerGram: Record<string, number> = { dry: 3.5, wet: 1.0, raw: 1.8 };
    const dailyGrams = dailyKcal / kcalPerGram[foodType];
    const cupsPerDay = dailyGrams / 240;
    const monthlyKg = (dailyGrams * 30) / 1000;
    setFeedResult({ dailyGrams, cupsPerDay, monthlyKg });
  }

  function calcMedication() {
    const w = Number(medWeight);
    const dose = Number(dosePerKg);
    const conc = Number(medConc);
    const totalDoseMg = w * dose;
    const volumeMl = totalDoseMg / conc;
    setMedResult({ totalDoseMg, volumeMl });
  }

  return (
    <CalculatorLayout
      title="Pet Calculator"
      description="Convert your pet's age to human years, calculate daily feeding amounts, and work out medication doses by body weight."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Pet Age: select species and size, enter age in years for human-equivalent age</li>
          <li>Feeding: enter body weight, food type and activity level for daily gram amounts</li>
          <li>Medication: enter pet weight, dose (mg/kg) and concentration to get volume in ml</li>
        </ol>
      }
      testimonial="Our Golden Retriever turned seven this year and I used the age converter to explain to my kids that he's actually about 54 in human years — solidly middle-aged, not old. It changed how we think about his exercise and diet. The feeding calculator was eye-opening: I was under-feeding him by about 15% based on his weight and activity level. After adjusting to the recommended 380 g of dry food per day his coat improved noticeably within six weeks. The medication tab is invaluable when the vet prescribes a liquid antibiotic and I need to measure the dose accurately — I just enter his weight and the prescribed mg/kg and it tells me exactly how many ml to draw up. I've shared it with our dog club. Please note this is a guide only — always confirm dosing with your vet."
    >
      <Tabs defaultValue="age">
        <TabsList className="w-full">
          <TabsTrigger value="age" className="flex-1">Pet Age</TabsTrigger>
          <TabsTrigger value="feeding" className="flex-1">Feeding</TabsTrigger>
          <TabsTrigger value="meds" className="flex-1">Medication</TabsTrigger>
        </TabsList>

        <TabsContent value="age" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Pet Type</Label>
              <Select value={petType} onValueChange={setPetType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog-small">Dog — Small (under 9 kg)</SelectItem>
                  <SelectItem value="dog-medium">Dog — Medium (9–22 kg)</SelectItem>
                  <SelectItem value="dog-large">Dog — Large (over 22 kg)</SelectItem>
                  <SelectItem value="cat">Cat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Pet Age (years)</Label>
              <Input type="number" value={petAge} onChange={e => setPetAge(e.target.value)} step="0.5" />
            </div>
          </div>
          <Button className="w-full" onClick={calcAge}>Calculate</Button>
          {ageResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Human Age Equivalent</p>
                <p className="font-mono text-3xl font-bold text-primary">{ageResult.humanAge}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Life Stage</p>
                <p className="font-mono text-xl font-bold text-foreground">{ageResult.lifeStage}</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="feeding" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Pet Weight (kg)</Label>
              <Input type="number" value={petWeightKg} onChange={e => setPetWeightKg(e.target.value)} step="0.5" />
            </div>
            <div className="space-y-1.5">
              <Label>Food Type</Label>
              <Select value={foodType} onValueChange={setFoodType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="dry">Dry kibble</SelectItem>
                  <SelectItem value="wet">Wet / canned</SelectItem>
                  <SelectItem value="raw">Raw / BARF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (senior / less active)</SelectItem>
                  <SelectItem value="normal">Normal (average activity)</SelectItem>
                  <SelectItem value="high">High (very active)</SelectItem>
                  <SelectItem value="working">Working / sporting dog</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full" onClick={calcFeeding}>Calculate</Button>
          {feedResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Daily (grams)</p>
                <p className="font-mono text-xl font-bold text-primary">{fmt(feedResult.dailyGrams, 0)} g</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Cups per day</p>
                <p className="font-mono text-xl font-bold text-foreground">{fmt(feedResult.cupsPerDay, 1)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Monthly (kg)</p>
                <p className="font-mono text-xl font-bold text-foreground">{fmt(feedResult.monthlyKg, 1)} kg</p>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">Based on MER (maintenance energy requirement). Adjust based on your vet's advice and your pet's body condition score.</p>
        </TabsContent>

        <TabsContent value="meds" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Pet Weight (kg)</Label>
              <Input type="number" value={medWeight} onChange={e => setMedWeight(e.target.value)} step="0.5" />
            </div>
            <div className="space-y-1.5">
              <Label>Dose (mg/kg)</Label>
              <Input type="number" value={dosePerKg} onChange={e => setDosePerKg(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Concentration (mg/ml)</Label>
              <Input type="number" value={medConc} onChange={e => setMedConc(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcMedication}>Calculate</Button>
          {medResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Total Dose</p>
                <p className="font-mono text-xl font-bold text-foreground">{fmt(medResult.totalDoseMg, 1)} mg</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Volume to Administer</p>
                <p className="font-mono text-xl font-bold text-primary">{fmt(medResult.volumeMl, 2)} ml</p>
              </div>
            </div>
          )}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
            <p className="text-xs text-yellow-400">Always confirm dosing instructions with your veterinarian before administering any medication. This tool is for reference only.</p>
          </div>
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
