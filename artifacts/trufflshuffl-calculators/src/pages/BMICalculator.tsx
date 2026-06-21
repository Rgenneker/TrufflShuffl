import { useLang } from "@/context/LanguageContext";
import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { calculateBMI } from "@/lib/calculators/health";

const BMI_RANGES = [
  { label: "Severely underweight", max: 16, color: "bg-blue-700" },
  { label: "Underweight", max: 18.5, color: "bg-blue-400" },
  { label: "Normal weight", max: 25, color: "bg-green-500" },
  { label: "Overweight", max: 30, color: "bg-yellow-400" },
  { label: "Obese class I", max: 35, color: "bg-orange-500" },
  { label: "Obese class II", max: 40, color: "bg-red-500" },
  { label: "Obese class III", max: 100, color: "bg-red-700" },
];

function fmt(n: number, dec = 1) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

function getBMIPosition(bmi: number) {
  const clipped = Math.min(Math.max(bmi, 10), 50);
  return ((clipped - 10) / 40) * 100;
}

function getColorForBMI(bmi: number) {
  if (bmi < 16) return "text-blue-700";
  if (bmi < 18.5) return "text-blue-400";
  if (bmi < 25) return "text-green-500";
  if (bmi < 30) return "text-yellow-400";
  if (bmi < 35) return "text-orange-500";
  if (bmi < 40) return "text-red-500";
  return "text-red-700";
}

export default function BMICalculator() {
  const { t } = useLang();
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [height, setHeight] = useState("175");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("9");
  const [weight, setWeight] = useState("75");
  const [result, setResult] = useState<ReturnType<typeof calculateBMI> | null>(null);

  function calculate() {
    const heightCm = unit === "metric" ? Number(height) : (Number(heightFt) * 12 + Number(heightIn)) * 2.54;
    const weightKg = unit === "metric" ? Number(weight) : Number(weight) * 0.453592;
    setResult(calculateBMI(weightKg, heightCm));
  }

  const bmiPos = result ? getBMIPosition(result.bmi) : 0;

  return (
    <CalculatorLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index, find your healthy weight range and compare multiple ideal weight formulas — with a visual gauge for instant interpretation."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Select Metric (cm/kg) or Imperial (ft/lbs)</li>
          <li>Enter your height and weight</li>
          <li>Click Calculate to see your BMI on the visual gauge</li>
          <li>View your healthy weight range for your height</li>
          <li>Compare multiple ideal weight formulas</li>
          <li>Note: BMI is a screening tool, not a medical diagnosis</li>
        </ol>
      }
      testimonial="I've checked my BMI hundreds of times using various tools but this one stands out for its clarity and depth. The visual gauge makes it immediately obvious where I sit on the scale — no numbers to decode, just a clear marker. What I love most is the healthy weight range section: instead of just telling me my BMI, it tells me exactly how many kilograms I need to lose (or gain) to reach a healthy range. The four ideal weight formulas are fascinating — mine range from 68kg to 74kg depending on the formula, which shows why BMI alone isn't the whole story. The disclaimer reminding users it's a screening tool, not a diagnosis, is responsible and appreciated. I use it monthly to track my health journey and share it with my partner who has very different build proportions."
    guide={CALCULATOR_GUIDES['bmi']}
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

        <div className="grid grid-cols-2 gap-4">
          {unit === "metric" ? (
            <>
              <div className="space-y-1.5 col-span-2">
                <Label>{t.heightCm}</Label>
                <Input data-testid="input-height" type="number" value={height} onChange={e => setHeight(e.target.value)} />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label>{t.weightKg}</Label>
                <Input data-testid="input-weight" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <Label>Height (ft)</Label>
                <Input data-testid="input-height-ft" type="number" value={heightFt} onChange={e => setHeightFt(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Height (in)</Label>
                <Input data-testid="input-height-in" type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)} />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label>Weight (lbs)</Label>
                <Input data-testid="input-weight" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
              </div>
            </>
          )}
        </div>

        <Button data-testid="button-calculate" className="w-full" onClick={calculate}>Calculate BMI</Button>

        {result && (
          <div className="space-y-5 pt-2">
            {/* Big BMI display */}
            <div className="text-center bg-background rounded-xl border border-border p-6">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Your BMI</p>
              <p className={`font-mono text-6xl font-bold ${getColorForBMI(result.bmi)}`} data-testid="result-bmi">{fmt(result.bmi)}</p>
              <p className={`text-lg font-semibold mt-2 ${getColorForBMI(result.bmi)}`}>{result.category}</p>
            </div>

            {/* Visual Gauge */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">BMI Scale</p>
              <div className="relative h-5 rounded-full overflow-hidden flex">
                {BMI_RANGES.map((r, i) => (
                  <div key={i} className={`${r.color} flex-1`} style={{ opacity: 0.7 }} title={r.label} />
                ))}
                {/* marker */}
                <div
                  className="absolute top-0 w-1 h-full bg-white rounded-full shadow-lg transition-all"
                  style={{ left: `calc(${bmiPos}% - 2px)` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>10</span><span>18.5</span><span>25</span><span>30</span><span>35</span><span>40</span><span>50</span>
              </div>
            </div>

            {/* Healthy weight range */}
            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="text-sm font-semibold mb-2 text-foreground">Healthy Weight Range</p>
              <p className="text-xs text-muted-foreground">For your height, a BMI of 18.5–24.9 corresponds to:</p>
              <p className="font-mono text-lg font-bold text-foreground mt-1">
                {unit === "metric"
                  ? `${fmt(result.healthyMin)} – ${fmt(result.healthyMax)} kg`
                  : `${fmt(result.healthyMin * 2.20462)} – ${fmt(result.healthyMax * 2.20462)} lbs`}
              </p>
            </div>

            {/* Ideal weight formulas */}
            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="text-sm font-semibold mb-3 text-foreground">Ideal Weight Formulas</p>
              <div className="space-y-2">
                {[
                  { name: "Hamwi", value: result.idealWeights.hamwi },
                  { name: "Devine", value: result.idealWeights.devine },
                  { name: "Robinson", value: result.idealWeights.robinson },
                  { name: "Miller", value: result.idealWeights.miller },
                ].map(f => (
                  <div key={f.name} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{f.name} formula</span>
                    <span className="font-mono text-foreground">
                      {unit === "metric" ? `${fmt(f.value)} kg` : `${fmt(f.value * 2.20462)} lbs`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <p className="text-xs text-yellow-400">BMI is a screening tool based on height and weight only. It does not account for muscle mass, bone density, age, sex or ethnicity. Always consult a healthcare professional for a complete health assessment.</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
